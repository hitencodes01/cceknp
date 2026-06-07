"use client";

import Image from "next/image";
import { useState } from "react";

const UPI_ID = "cce.knp-1@okhdfcbank";

export default function DonateSection() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(UPI_ID);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="donate-section">
            {/* Decorative blobs */}
            <div className="blob blob-1" aria-hidden="true" />
            <div className="blob blob-2" aria-hidden="true" />

            <div className="donate-inner">
                {/* Left Content */}
                <div className="donate-content">
                    <div className="logo-badge">
                        <Image
                            src="/logo.jpeg"
                            alt="Centre for Computer Education Logo"
                            width={52}
                            height={52}
                            className="logo-img"
                        />
                        <span className="iso-tag">ISO 9001:2015</span>
                    </div>

                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", }} className="donate-heading">
                        Support Our <span className="highlight">Mission</span>
                    </h2>

                    <p className="donate-sub">
                        Centre for Computer Education is empowering students across India
                        with quality tech education. If our work has made a difference, your
                        donation — big or small — helps us grow and reach more learners.
                    </p>

                    <ul className="impact-list">
                        {[
                            { text: "Upgrade lab computers & software" },
                            { text: "Provide free study material" },
                            { text: "Support underprivileged students" },
                        ].map(({ text }) => (
                            <li key={text} className="impact-item">
                                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", }}>{text}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="upi-row">
                        <span className="upi-label">UPI ID</span>
                        <span className="upi-value">{UPI_ID}</span>
                        <button className="copy-btn" onClick={handleCopy} aria-label="Copy UPI ID">
                            {copied ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                            )}
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>

                {/* Right — QR Card */}
                <div className="qr-card">
                    <div className="qr-header">
                        <div className="qr-pulse" aria-hidden="true" />
                        <span className="qr-title">Scan &amp; Pay</span>
                    </div>

                    <div className="qr-frame">
                        <Image
                            src="/Qr.jpeg"
                            alt="UPI QR Code for Centre for Computer Education — cce.knp-1@okhdfcbank"
                            width={220}
                            height={220}
                            className="qr-img"
                        />
                    </div>

                    <p className="qr-footer">Scan with any UPI app</p>

                    <div className="app-pills">
                        {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                            <span key={app} className="app-pill">{app}</span>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .donate-section {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          border-top: 3px solid #38bbeb;
          border-bottom: 3px solid #38bbeb;
          padding: 72px 24px;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        /* Decorative blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          opacity: 0.08;
          pointer-events: none;
        }
        .blob-1 {
          width: 400px;
          height: 400px;
          background: #38bbeb;
          top: -120px;
          left: -120px;
        }
        .blob-2 {
          width: 320px;
          height: 320px;
          background: #38bbeb;
          bottom: -100px;
          right: -80px;
        }

        .donate-inner {
          position: relative;
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 64px;
          flex-wrap: wrap;
        }

        /* ── Left content ── */
        .donate-content {
          flex: 1;
          min-width: 280px;
        }

        .logo-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .logo-img {
          border-radius: 10px;
          border: 2px solid #e0f7fd;
          object-fit: contain;
        }
        .iso-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0a8fb5;
          background: #e0f7fd;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .donate-heading {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          color: #111827;
          line-height: 1.2;
          margin: 0 0 16px;
        }
        .highlight {
          color: #38bbeb;
        }

        .donate-sub {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.75;
          margin: 0 0 28px;
          max-width: 440px;
        }

        .impact-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .impact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #374151;
          font-weight: 500;
        }
        .impact-icon {
          width: 36px;
          height: 36px;
          background: #e0f7fd;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
        }

        /* UPI row */
        .upi-row {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #f0fbff;
          border: 1.5px solid #b3e8f9;
          border-radius: 12px;
          padding: 10px 16px;
          flex-wrap: wrap;
        }
        .upi-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #0a8fb5;
        }
        .upi-value {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          font-family: 'Courier New', monospace;
        }
        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: #38bbeb;
          background: white;
          border: 1.5px solid #38bbeb;
          border-radius: 8px;
          padding: 5px 12px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .copy-btn:hover {
          background: #38bbeb;
          color: #fff;
        }

        /* ── Right QR card ── */
        .qr-card {
          background: #ffffff;
          border: 1.5px solid #b3e8f9;
          border-radius: 24px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          box-shadow: 0 8px 40px rgba(56, 187, 235, 0.12);
          flex-shrink: 0;
        }

        .qr-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .qr-pulse {
          width: 10px;
          height: 10px;
          background: #38bbeb;
          border-radius: 50%;
          animation: pulse 1.8s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,187,235,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(56,187,235,0); }
        }
        .qr-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #38bbeb;
        }

        .qr-frame {
          border: 3px solid #38bbeb;
          border-radius: 16px;
          padding: 8px;
          background: #fff;
        }
        .qr-img {
          display: block;
          border-radius: 10px;
        }

        .qr-footer {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }

        .app-pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .app-pill {
          font-size: 11px;
          font-weight: 600;
          color: #0a8fb5;
          background: #e0f7fd;
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.02em;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .donate-inner {
            flex-direction: column;
            gap: 40px;
          }
          .qr-card {
            width: 100%;
          }
        }
      `}</style>
        </section>
    );
}