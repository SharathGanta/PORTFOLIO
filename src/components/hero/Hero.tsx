"use client";

import React, { useRef, useState, useEffect } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export function Hero() {
  const { scrollTo } = useScroll();
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay with sound first
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setIsPlaying(true);
          setAudioBlocked(false);
        })
        .catch(() => {
          // Autoplay with sound was blocked by browser
          video.muted = true;
          video.play().then(() => {
            setIsMuted(true);
            setIsPlaying(true);
            setAudioBlocked(true);
          }).catch(() => {
            setIsPlaying(false);
          });
        });
    }

    // Unlock sound on first user gesture
    const unlockSound = () => {
      if (video && video.muted && audioBlocked) {
        video.muted = false;
        video.play().catch(() => {});
        setIsMuted(false);
        setAudioBlocked(false);
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    // IntersectionObserver: pause when less than 35% visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;
        if (entry.intersectionRatio < 0.35) {
          if (!video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        } else {
          if (video.paused) {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        }
      },
      {
        threshold: [0, 0.35, 1.0],
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
      removeListeners();
    };
  }, [audioBlocked]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      setAudioBlocked(false);
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-between items-center pt-24 pb-12 overflow-hidden select-none"
    >
      {/* Giant Outlined Ghost Word behind the person */}
      <div
        aria-hidden="true"
        className="ghost-word absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0"
      >
        <span className="ghost-text block font-black uppercase tracking-tight">
          {PROFILE.firstName}
        </span>
      </div>

      {/* Center Video Frame */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-full">
        <div className="relative flex items-center justify-center w-auto">
          {/* Multiply blend mode blends pure white background directly into warm paper */}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster="/portrait-bust.webp"
            className="video-stage object-contain [mix-blend-mode:multiply] pointer-events-none"
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Sound Control Button: 46px round solid ink button */}
          <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
            <button
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute intro video" : "Mute intro video"}
              className="relative w-[46px] h-[46px] rounded-full bg-[var(--ink)] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            >
              {audioBlocked && (
                <span className="absolute -inset-1 rounded-full border border-[var(--ink)] opacity-50 animate-ping pointer-events-none" />
              )}
              {isMuted ? (
                /* ▶ Triangle icon */
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="translate-x-[1px]"
                  aria-hidden="true"
                >
                  <path d="M7 4.5v15l13-7.5-13-7.5z" />
                </svg>
              ) : (
                /* ❚❚ Two bars icon */
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Role Heading and CTAs */}
      <div className="relative z-20 w-full max-w-[1320px] px-6 text-center flex flex-col items-center gap-6 mt-4">
        <div className="max-w-2xl">
          <div className="mono-tag justify-center mb-2">00 — ARCHITECT INTRO</div>
          <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Digital Transformation & <span className="font-serif-italic">AI Architect.</span>
          </h1>
        </div>

        {/* CTAs: Explore work, Let's talk, Résumé ↓ */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollTo("#work")}
            className="btn-pill-primary"
          >
            Explore work
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-pill-secondary"
          >
            Let&apos;s talk
          </button>
          <a
            href={PROFILE.resumePath}
            download="Sharath_Kumar_Ganta_Resume.pdf"
            className="btn-pill-secondary"
            aria-label="Download Résumé PDF"
          >
            Résumé ↓
          </a>
        </div>
      </div>

      <style jsx>{`
        .video-stage {
          height: min(58svh, 520px);
          aspect-ratio: 768 / 960;
        }
        @media (min-width: 768px) {
          .video-stage {
            height: min(70svh, 700px);
          }
        }
        .ghost-text {
          font-size: clamp(5rem, 18vw, 15rem);
          line-height: 0.85;
          letter-spacing: -0.06em;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(13, 13, 13, 0.12);
        }
      `}</style>
    </section>
  );
}
