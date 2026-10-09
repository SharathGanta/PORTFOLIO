"""
Hero Video Pipeline for Portfolio.
Turns raw intro video into a seamless looping hero clip and static portrait/OG assets.
Uses ffmpeg and numpy.
"""

import os
import sys
import shutil
import subprocess
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import scipy.io.wavfile as wav

def get_ffmpeg_exe():
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        raise RuntimeError("ffmpeg not found on PATH or via imageio_ffmpeg.")

def build_hero_assets(input_video_path=None):
    root = Path(__file__).resolve().parent.parent
    
    if not input_video_path:
        # Auto-detect input video
        candidates = [
            root / "Man_introducing_himself_20261009112735.mp4",
            root / "intro.mp4",
            root / "intro.mov",
        ]
        for c in candidates:
            if c.exists():
                input_video_path = c
                break
    
    if not input_video_path or not Path(input_video_path).exists():
        raise FileNotFoundError(f"Intro video not found. Checked: {input_video_path}")
    
    ffmpeg_exe = get_ffmpeg_exe()
    print(f"[1/6] Using ffmpeg binary: {ffmpeg_exe}")
    print(f"[2/6] Processing source video: {input_video_path}")

    hero_dir = root / "public" / "hero"
    hero_dir.mkdir(parents=True, exist_ok=True)
    temp_dir = root / "scripts" / "_temp"
    temp_dir.mkdir(parents=True, exist_ok=True)

    temp_raw_audio = temp_dir / "raw_audio.wav"
    temp_looped_audio = temp_dir / "looped_audio.wav"
    temp_video_loop = temp_dir / "temp_video_loop.mp4"

    # Step A: Extract original audio at 48kHz stereo
    print("      -> Extracting audio for numpy sample-accurate cross-fade...")
    subprocess.run([
        ffmpeg_exe, "-y", "-ss", "0", "-t", "10.0",
        "-i", str(input_video_path),
        "-vn", "-ac", "2", "-ar", "48000",
        str(temp_raw_audio)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Step B: Sample-accurate audio cross-fade in numpy
    rate, audio_data = wav.read(str(temp_raw_audio))
    # audio_data shape: (N, 2)
    # Target: 9.5s seamless loop from 10.0s clip (0.5s xfade)
    # Loop starts at 0.5s, ends at 10.0s, with last 0.5s cross-faded into first 0.5s
    sample_rate = rate
    fade_len = int(0.5 * sample_rate) # 24000 samples
    loop_len = int(9.5 * sample_rate) # 456000 samples
    start_idx = int(0.5 * sample_rate) # 24000 samples
    
    # Slice main audio from 0.5s to 10.0s
    audio_main = audio_data[start_idx : start_idx + loop_len].astype(np.float32).copy()
    audio_head = audio_data[0 : fade_len].astype(np.float32)

    # Crossfade the last 0.5s of audio_main with audio_head
    # weights: 0 to 1
    w = np.linspace(0.0, 1.0, fade_len, endpoint=False).reshape(-1, 1)
    # Equal-power or linear cross-fade
    fade_tail = (1.0 - w) * audio_main[-fade_len:] + w * audio_head
    audio_main[-fade_len:] = fade_tail

    # Clip to prevent int16 overflow
    audio_looped = np.clip(audio_main, -32768, 32767).astype(np.int16)
    wav.write(str(temp_looped_audio), sample_rate, audio_looped)
    print("      -> Seamless audio loop created successfully.")

    # Step C: Seamless video cross-fade with ffmpeg xfade
    # Crop 576:720:352:0 -> scale to 768:960 -> colorlevels for pure white
    # xfade: main is 0.5s to 10.0s (9.5s total), head is 0.0s to 0.5s
    # offset=9.0s, duration=0.5s
    print("      -> Applying crop=576:720:352:0, scale=768:960, whitening, and 0.5s xfade...")
    filter_complex = (
        "[0:v]trim=start=0:end=10.0,setpts=PTS-STARTPTS,"
        "crop=576:720:352:0,scale=768:960,fps=24,"
        "colorlevels=rimax=0.98:gimax=0.98:bimax=0.98[vbase];"
        "[vbase]split=2[vmain_src][vhead_src];"
        "[vmain_src]trim=start=0.5:end=10.0,setpts=PTS-STARTPTS,fps=24[vmain];"
        "[vhead_src]trim=start=0.0:end=0.5,setpts=PTS-STARTPTS,fps=24[vhead];"
        "[vmain][vhead]xfade=transition=fade:duration=0.5:offset=9.0[vloop]"
    )

    # Encode intermediate video
    subprocess.run([
        ffmpeg_exe, "-y",
        "-i", str(input_video_path),
        "-filter_complex", filter_complex,
        "-map", "[vloop]",
        "-c:v", "libx264", "-preset", "fast", "-crf", "18",
        str(temp_video_loop)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Step D: Export hero.mp4 with AAC audio
    out_mp4 = hero_dir / "hero.mp4"
    print(f"[3/6] Exporting H.264 mp4: {out_mp4}")
    subprocess.run([
        ffmpeg_exe, "-y",
        "-i", str(temp_video_loop),
        "-i", str(temp_looped_audio),
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-preset", "slow",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        "-shortest",
        str(out_mp4)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Step E: Export hero.webm with VP9 and Opus audio
    out_webm = hero_dir / "hero.webm"
    print(f"[4/6] Exporting VP9 webm: {out_webm}")
    subprocess.run([
        ffmpeg_exe, "-y",
        "-i", str(temp_video_loop),
        "-i", str(temp_looped_audio),
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        "-shortest",
        str(out_webm)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Step F: Generate portrait-bust.webp (480x600)
    print("[5/6] Generating portrait-bust.webp (480x600)...")
    temp_frame = temp_dir / "still_frame.png"
    subprocess.run([
        ffmpeg_exe, "-y",
        "-ss", "2.0",
        "-i", str(temp_video_loop),
        "-frames:v", "1",
        str(temp_frame)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    img = Image.open(str(temp_frame))
    w, h = img.size
    # 480x600 crop head-to-shirt
    crop_w = 540
    crop_h = int(crop_w / 0.8) # 675
    x1 = (w - crop_w) // 2
    y1 = 30
    bust = img.crop((x1, y1, x1 + crop_w, y1 + crop_h)).resize((480, 600), Image.Resampling.LANCZOS)
    bust_path = root / "public" / "portrait-bust.webp"
    bust.save(str(bust_path), "WEBP", quality=92)
    print(f"      -> Saved {bust_path}")

    # Step G: Generate og.jpg (1200x630)
    print("[6/6] Generating og.jpg (1200x630)...")
    og_img = Image.new("RGB", (1200, 630), color="#f4f2ee")
    draw = ImageDraw.Draw(og_img)

    # Draw border line
    draw.rectangle([24, 24, 1176, 606], outline="#e2ded7", width=2)
    draw.rectangle([28, 28, 1172, 602], outline="#ece8e1", width=1)

    # Character image on the right
    # Scale bust to 420x525
    og_bust = bust.resize((420, 525), Image.Resampling.LANCZOS)
    # Mask out background slightly with multiply or blend
    og_img.paste(og_bust, (730, 60))

    # Add typographic details
    # Tag line
    draw.text((80, 110), "PORTFOLIO // DIGITAL TRANSFORMATION & AI", fill="#77756f")
    draw.text((80, 150), "SHARATH KUMAR GANTA", fill="#0d0d0d")
    draw.text((80, 225), "Digital Transformation\n& AI Architect", fill="#0d0d0d")
    
    draw.line([(80, 360), (680, 360)], fill="#d5d0c8", width=1)
    
    draw.text((80, 385), "• 13+ Years of Experience in RPA & Generative AI", fill="#3a3a3a")
    draw.text((80, 420), "• 80+ Automation Solutions Delivered", fill="#3a3a3a")
    draw.text((80, 455), "• Enterprise Architect & Autonomous AI Agent Systems", fill="#3a3a3a")
    draw.text((80, 490), "• Hyderabad, India", fill="#77756f")

    og_path = root / "public" / "og.jpg"
    og_img.save(str(og_path), "JPEG", quality=90)
    print(f"      -> Saved {og_path}")

    # Cleanup temp
    shutil.rmtree(temp_dir, ignore_errors=True)
    print("\n[OK] Hero assets build complete!\n")

if __name__ == "__main__":
    build_hero_assets()
