import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/scroll";
import { RevealObserver } from "@/components/RevealObserver";

const interTight = localFont({
  src: "../fonts/InterTight.woff2",
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InstrumentSerif-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sharath-ganta.dev"),
  title: "Sharath Kumar Ganta — Digital Transformation & AI Architect",
  description:
    "Digital Transformation Architect with 13+ years of experience in RPA, Generative AI, and Agentic AI solutions. Delivered 80+ automation solutions reducing costs by 60–70%.",
  authors: [{ name: "Sharath Kumar Ganta" }],
  openGraph: {
    title: "Sharath Kumar Ganta — Digital Transformation & AI Architect",
    description:
      "13+ years of experience in RPA, Generative AI, and Agentic AI solutions. Delivered 80+ enterprise automations.",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Sharath Kumar Ganta — Digital Transformation & AI Architect",
      },
    ],
  },
  icons: {
    icon: "/portrait-bust.webp",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased min-h-screen bg-[var(--paper)] text-[var(--ink)]">
        <SmoothScrollProvider>
          <RevealObserver />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
