'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Centralized hero configuration block
export const HERO_CONFIG = {
  VERIFIED_NAME: 'Michael Chandler',
  VERIFIED_TITLE: 'Executive Leadership | Construction Operations',
  EYEBROW_TEXT: 'CONSTRUCTION • OPERATIONS • LEADERSHIP',
  HEADING_LINE_1: 'Strategic leadership.',
  HEADING_LINE_2: 'Disciplined execution.',
  SUPPORTING_COPY:
    'Explore my background in construction operations, project delivery, and team leadership.',
  VIDEO_SRC: './miami-beach.mp4',
  POSTER_SRC:
    'https://mcdesign.bio/__l5e/assets-v1/d001ed49-0dab-46d2-aa4b-41a1506b0e16/miami-beach-sunset-pool.png',
  PRIMARY_CTA: { label: 'Explore Experience', href: '#experience' },
  SECONDARY_CTA: { label: 'View Resume', href: 'https://mcdesign.bio/resume' },
  TERTIARY_CTA: { label: 'Get in Touch', href: '#contact' },
};

// Dynamic client import for ArchitecturalCanvas
const ArchitecturalCanvas = dynamic(() => import('./ArchitecturalCanvas'), {
  ssr: false,
});

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Executive Portfolio Introduction"
      className="relative w-full min-h-[100svh] bg-[#050505] text-white flex flex-col justify-between overflow-hidden z-10 pt-24 pb-12 px-6 md:px-12"
    >
      {/* LAYER 1: Background Media Video & Dark Directional Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {!videoError && !isReducedMotion ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_CONFIG.POSTER_SRC}
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center opacity-35 scale-105 transition-opacity duration-1000"
            aria-hidden="true"
          >
            <source src={HERO_CONFIG.VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${HERO_CONFIG.POSTER_SRC})` }}
            aria-hidden="true"
          />
        )}

        {/* Directional & Architectural Dark Gradient Overlays */}
        <div
          className="absolute inset-0 z-1"
          style={{
            background:
              'linear-gradient(135deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.78) 50%, rgba(5,5,5,0.92) 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-2"
          style={{
            background:
              'radial-gradient(circle at 75% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* LAYER 2: Architectural Constellation Grid Canvas (Sparse Gold Nodes & Vector Connections) */}
      <ArchitecturalCanvas heroRef={heroRef} className="absolute inset-0 z-10" />

      {/* LAYER 3: Subtle Architectural Noise Texture (3.5% Opacity) */}
      <div
        className="absolute inset-0 z-15 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* LAYER 4: Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Primary Editorial Copy & CTAs */}
        <div className="lg:col-span-8 flex flex-col items-start text-left space-y-6">
          {/* Eyebrow & Verified Name Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-medium tracking-[0.2em] uppercase backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              {HERO_CONFIG.EYEBROW_TEXT}
            </span>
            <span className="text-gray-400 text-xs font-mono tracking-widest uppercase">
              | {HERO_CONFIG.VERIFIED_NAME}
            </span>
          </div>

          {/* Main Display Heading with Animated Underline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-normal leading-[1.1] tracking-tight">
            {HERO_CONFIG.HEADING_LINE_1}
            <br />
            <span className="relative inline-block mt-1 pb-2">
              {HERO_CONFIG.HEADING_LINE_2}
              {/* Gold Gradient Underline with scaleX entrance */}
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#f3e5ab] to-transparent origin-left transform transition-transform duration-1000 ease-out"
                style={{
                  transform: isReducedMotion ? 'scaleX(1)' : 'scaleX(1)',
                }}
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl pt-2">
            {HERO_CONFIG.SUPPORTING_COPY}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {/* Primary CTA */}
            <a
              href={HERO_CONFIG.PRIMARY_CTA.href}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-[#D4AF37] text-[#050505] font-medium text-sm tracking-wider uppercase border border-[#D4AF37] transition-all duration-300 hover:bg-transparent hover:text-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <span>{HERO_CONFIG.PRIMARY_CTA.label}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>

            {/* Secondary CTA (Resume) */}
            {HERO_CONFIG.SECONDARY_CTA.href && (
              <a
                href={HERO_CONFIG.SECONDARY_CTA.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-[#D4AF37] font-medium text-sm tracking-wider uppercase border border-[#D4AF37]/40 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <span>{HERO_CONFIG.SECONDARY_CTA.label}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </a>
            )}

            {/* Text Link: Get in Touch */}
            <a
              href={HERO_CONFIG.TERTIARY_CTA.href}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-gray-300 hover:text-[#D4AF37] text-sm font-medium tracking-wider uppercase transition-colors border-b border-transparent hover:border-[#D4AF37]"
            >
              <span>{HERO_CONFIG.TERTIARY_CTA.label}</span>
              <span className="text-xs">→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Architectural Materials & Metrics Specification Card (Desktop visible) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col justify-center">
          <div className="p-8 rounded-sm bg-gradient-to-br from-[#0a0a0a]/90 to-[#121212]/70 backdrop-blur-xl border border-[#D4AF37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            {/* Corner CAD Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]" />

            <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-4 mb-6">
              <span className="text-[#D4AF37] font-mono text-xs tracking-widest uppercase">
                EXECUTIVE SPECIFICATION
              </span>
              <span className="text-gray-500 font-mono text-[10px]">VERIFIED 2026</span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-1">
                  PORTFOLIO DELIVERED
                </p>
                <p className="text-3xl font-serif text-white font-medium">
                  $500M+ <span className="text-[#D4AF37] text-xl font-sans font-light">USD</span>
                </p>
                <p className="text-gray-400 text-xs font-light mt-1">
                  Ultra-luxury residential, private club hospitality & civil infrastructure
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-1">
                  CORE DOMAINS
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2.5 py-1 text-xs bg-[#D4AF37]/10 text-gray-200 border border-[#D4AF37]/20 rounded-xs">
                    Construction Ops
                  </span>
                  <span className="px-2.5 py-1 text-xs bg-[#D4AF37]/10 text-gray-200 border border-[#D4AF37]/20 rounded-xs">
                    Owner Representative
                  </span>
                  <span className="px-2.5 py-1 text-xs bg-[#D4AF37]/10 text-gray-200 border border-[#D4AF37]/20 rounded-xs">
                    Project Delivery
                  </span>
                  <span className="px-2.5 py-1 text-xs bg-[#D4AF37]/10 text-gray-200 border border-[#D4AF37]/20 rounded-xs">
                    P&L Stewardship
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="text-gray-400 text-xs font-mono">STATUS</span>
                <span className="inline-flex items-center gap-2 text-xs text-[#D4AF37]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Available for Operations Leadership
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Footer Indicator */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-gray-500 font-mono border-t border-white/10 pt-6">
        <div className="flex items-center gap-4">
          <span className="text-[#D4AF37]">01 / HERO</span>
          <span className="hidden sm:inline">STRUCTURAL STEEL • GLASS • WALNUT</span>
        </div>
        <a
          href="#experience"
          className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors group"
        >
          <span>SCROLL TO EXPLORE</span>
          <svg
            className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
