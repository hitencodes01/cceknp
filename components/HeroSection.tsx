"use client"
import Link from "next/link";
import Threads from "./Threads";
import Image from "next/image";

const SLIDES = [
  {
    img: "/logo.jpeg",
    fit: "contain" as const,       // logo — show full image, no crop
    bg: "#360707",                  // dark bg behind contained logo
    tag: "ISO 9001:2015 Certified",
    heading: ["Centre for", "Computer", "Education"],
    accentIdx: 1,
    sub: "Empowering the next generation of digital thinkers — from foundational skills to advanced computing.",
  },
];

export default function HeroSection() {
  return (
    <>
      <style>{`
        :root {
          --accent: #38bbeb;
          --bg: #000;
          --text: #fff;
        }

        .hero-root {
          position: relative;
          width: 100%;
          min-height: 100svh;
          background: var(--bg);
          overflow: hidden;
          display: flex;
          align-items: stretch;
        }

        /* ── Desktop: two-column ── */
        .hero-left {
          width: 50%;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .hero-right {
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(40px,6vw,90px) clamp(28px,5vw,72px);
          position: relative;
          z-index: 2;
        }

        /* Image */
        .hero-img {
          width: 100%;
          height: 100%;
          display: block;
          transition: opacity 0.42s ease, transform 0.42s ease;
        }
        .hero-img.out { opacity: 0; transform: scale(1.04); }
        .hero-img.in  { opacity: 1; transform: scale(1); }
        .hero-img-contain {
          object-fit: contain;
          object-position: center;
          padding: clamp(20px, 4vw, 48px);
        }
        .hero-img-cover {
          object-fit: cover;
          object-position: center;
        }

        /* Image overlay gradient */
        .hero-left::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right,
            transparent 55%, rgba(0,0,0,0.7) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* Accent vertical bar between columns */
        .hero-divider {
          position: absolute;
          top: 12%; bottom: 12%;
          left: 50%;
          width: 1.5px;
          background: linear-gradient(to bottom,
            transparent, var(--accent), transparent);
          z-index: 5;
          opacity: 0.5;
        }

        /* ── Text content ── */
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--accent);
          font-size: clamp(10px,1.4vw,12px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 300;
          margin-bottom: 14px;
        }
        .hero-tag-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          animation: dotPulse 2.4s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.3; transform:scale(0.6); }
        }

        .hero-rule {
          width: 48px; height: 2px;
          background: var(--accent);
          margin-bottom: 20px;
          border-radius: 2px;
        }

        .hero-h1 {
          font-size: clamp(2.4rem,4.5vw,4rem);
          font-weight: 900;
          line-height: 1.07;
          color: var(--text);
          margin: 0 0 20px;
          letter-spacing: -0.02em;
        }
        .hero-h1 .accent { color: var(--accent); }

        .hero-sub {
          font-size: clamp(15px,1.4vw,15px);
          color: rgba(255,255,255,1);
          font-weight: 300;
          line-height: 1.75;
          max-width: 380px;
          margin: 0 0 36px;
        }

        /* Text slide transitions */
        .text-wrap {
          transition: opacity 0.38s ease, transform 0.38s ease;
        }
        .text-wrap.out { opacity: 0; transform: translateY(14px); }
        .text-wrap.in  { opacity: 1; transform: translateY(0); }

        /* Buttons */
        .hero-btns {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 20px;
        }
        .btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: #000;
          font-weight: 700;
          font-size: clamp(13px,1.3vw,13px);
          padding: 12px 24px;
          border-radius: 5px;
          text-decoration: none;
          overflow: hidden;
          transition: color 0.3s;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          transform: translateX(-102%);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }
        .btn-primary:hover::before { transform: translateX(0); }
        .btn-primary:hover { color: var(--accent); }
        .btn-primary > * { position: relative; z-index: 1; }
        .btn-primary svg { transition: transform 0.25s cubic-bezier(0.22,1,0.36,1); }
        .btn-primary:hover svg { transform: translateX(4px); }

        .btn-ghost {
          position: relative;
          color: rgba(255,255,255,0.55);
          font-size: clamp(12px,1.3vw,13px);
          font-weight: 400;
          text-decoration: none;
          padding-bottom: 3px;
          transition: color 0.22s;
          white-space: nowrap;
        }
        .btn-ghost::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: var(--accent);
          transition: width 0.32s cubic-bezier(0.22,1,0.36,1);
        }
        .btn-ghost:hover { color: var(--accent); }
        .btn-ghost:hover::after { width: 100%; }

        /* Dots */
        .hero-dots {
          display: flex;
          gap: 8px;
          margin-top: 36px;
        }
        .hero-dot {
          width: 28px; height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.18);
          cursor: pointer;
          transition: background 0.25s, width 0.25s;
          border: none;
          padding: 0;
        }
        .hero-dot.active {
          background: var(--accent);
          width: 44px;
        }

        /* Progress bar */
        .hero-progress {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          background: var(--accent);
          opacity: 0.6;
          z-index: 10;
          animation: progress 4s linear;
          transform-origin: left;
        }
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .hero-root {
            flex-direction: column;
            min-height: 100svh;
          }
          .hero-left {
            width: 100%;
            height: 52vw;
            min-height: 220px;
            max-height: 320px;
          }
          .hero-left::after {
            background: linear-gradient(to bottom,
              transparent 50%, rgba(0,0,0,0.75) 100%);
          }
          .hero-right {
            width: 100%;
            padding: 28px 22px 48px;
          }
          .hero-divider { display: none; }
          .hero-h1 { font-size: clamp(2rem,8vw,2.8rem); }
          .hero-sub { max-width: 100%; color : "white"; }
        }
          /* ── Logo entrance animation ── */
@keyframes logoReveal {
  0%   { clip-path: inset(48% 8% 48% 8% round 8px); opacity: 0; transform: scale(0.92); }
  60%  { clip-path: inset(0% 0% 0% 0% round 8px);   opacity: 1; transform: scale(1.04); }
  100% { clip-path: inset(0% 0% 0% 0% round 0px);   opacity: 1; transform: scale(1); }
}

@keyframes logoGlow {
  0%, 100% { filter: drop-shadow(0 0 0px transparent); }
  50%       { filter: drop-shadow(0 0 18px rgba(56,187,235,0.45)); }
}

@keyframes logoShimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
  
      `}</style>

      <div className="hero-root">

        {/* Thread — full background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Threads
            color={[0.22, 0.73, 0.92]}
            amplitude={1.5}
            distance={0.3}
            enableMouseInteraction={false}
          />
        </div>

        {/* Vertical divider */}
        <div className="hero-divider" style={{ position: "relative", zIndex: 10 }} />

        {/* LEFT — image */}
        <div className="hero-left" style={{ position: "relative", zIndex: 10 }}>
          <Image
            src="/logo.jpeg"
            alt=""
            aria-hidden="true"
            sizes="50vw"
            fill
            priority
            loading="eager"
            className="hero-img bg-transparent hero-img-contain"
            style={{
              animation:
                "logoReveal 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s both, logoGlow 3s ease-in-out 1.2s infinite",
            }}
          />
        </div>

        {/* RIGHT — text */}
        <div className="hero-right" style={{ position: "relative", zIndex: 10 }}>
          <div className="text-wrap">

            <div className="hero-tag">
              <span className="hero-tag-dot" />
              ISO 9001:2015 Certified
            </div>

            <div className="hero-rule" />

            <h1 className="hero-h1">
              Centre for <br />
              <span className="accent">Computer</span> <br />
              Education
            </h1>

            <p className="text-white hero-sub">
              Empowering the next generation of digital thinkers — from foundational skills to advanced computing.
            </p>

            <div className="hero-btns">
              <Link href="/courses" className="btn-primary">
                <span>View Courses</span>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/about" className="btn-ghost">About Us</Link>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
