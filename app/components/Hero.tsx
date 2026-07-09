"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const floatingWords = ["险峻", "神圣", "壮观", "सुन्दर", "शान्त", "अद्भुत"];

const socialLinks = [
  { label: "WeChat", icon: "wechat" },
  { label: "WhatsApp", icon: "whatsapp" },
  { label: "Instagram", icon: "instagram" },
  { label: "Facebook", icon: "facebook" },
];

function SocialIcon({ icon }: { icon: string }) {
  const common = "w-[18px] h-[18px]";
  switch (icon) {
    case "whatsapp":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.7 13.4L3 21l3.7-1.31a8.9 8.9 0 0 0 4.32 1.1h.01a8.94 8.94 0 0 0 6.57-15.47ZM12.06 19.1a7.4 7.4 0 0 1-3.77-1.03l-.27-.16-2.4.84.81-2.35-.18-.27a7.43 7.43 0 1 1 5.81 2.97Zm4.08-5.56c-.22-.11-1.31-.65-1.51-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05a6.1 6.1 0 0 1-1.8-1.1 6.7 6.7 0 0 1-1.25-1.55c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.06-.59.28-.2.22-.78.76-.78 1.85s.8 2.15.91 2.3c.11.15 1.57 2.4 3.8 3.36.53.23.95.37 1.27.47.53.17 1.02.14 1.4.09.43-.06 1.31-.53 1.49-1.05.18-.51.18-.95.13-1.05-.05-.1-.2-.16-.42-.27Z"/>
        </svg>
      );
    case "wechat":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.5 4C5.36 4 2 6.84 2 10.34c0 2 1.1 3.78 2.82 4.96l-.7 2.1 2.45-1.23c.62.17 1.27.27 1.93.3a5.7 5.7 0 0 1-.2-1.47c0-3.4 3.2-6.16 7.15-6.16.24 0 .47.01.7.03C15.42 5.86 12.71 4 9.5 4Zm-2.4 4.3c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm5 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9ZM16.45 9.9c-3.3 0-5.97 2.34-5.97 5.23 0 2.88 2.67 5.22 5.97 5.22.58 0 1.14-.08 1.66-.22l2.1 1.05-.58-1.8C21.07 18.3 22 16.95 22 15.13c0-2.9-2.67-5.23-5.97-5.23v.01Zm-2.1 3.55a.78.78 0 1 1 0-1.55.78.78 0 0 1 0 1.55Zm4.2 0a.78.78 0 1 1 0-1.55.78.78 0 0 1 0 1.55Z"/>
        </svg>
      );
    case "instagram":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.74 3.74 0 0 1-1.38-.9 3.74 3.74 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.18-.46.39-.79.74-1.13.34-.35.67-.56 1.13-.74.35-.14.87-.3 1.83-.34C8.42 2.17 8.8 2.16 12 2.16Zm0 2.16c-3.15 0-3.5.01-4.73.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.74-.35.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83-.06 1.23-.07 1.58-.07 4.73s.01 3.5.07 4.73c.04.96.2 1.48.34 1.83.18.46.39.79.74 1.13.34.35.67.56 1.13.74.35.14.87.3 1.83.34 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.74.35-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.96-.2-1.48-.34-1.83a3.02 3.02 0 0 0-.74-1.13 3.02 3.02 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34-1.23-.06-1.58-.07-4.73-.07Zm0 3.68a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 6.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Zm5.1-6.76a.94.94 0 1 1-1.87 0 .94.94 0 0 1 1.87 0Z"/>
        </svg>
      );
    case "facebook":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 21v-7.5h2.52l.38-2.93h-2.9V8.7c0-.85.23-1.43 1.46-1.43h1.56V4.65c-.27-.04-1.2-.12-2.28-.12-2.25 0-3.79 1.37-3.79 3.89v2.17H7.85v2.93h2.6V21h3.05Z"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "16%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => setWordIndex((i) => (i + 1) % floatingWords.length), 2200);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-mountain-950"
    >
      {/* Photo — normal cover fill, only a small overscan (5%) so the parallax
          translateY never reveals an edge. No extra zoom, no double-scaling. */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1]">
        <Image
          src="/images/amir-hero.jpeg"
          alt="Amir Shakya overlooking the Annapurna range at sunrise"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-[68%_center] sm:object-[58%_center] lg:object-center"
        />
      </motion.div>

      {/* Duotone — ONE gradient doing the job: a solid, opaque teal block on the left
          (where the text lives) that hands off to a fully clear photo on the right.
          No multiply pass, no vertical band, no second/third overlapping layer —
          that stacking is exactly what was muddying the whole frame gray before. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(30deg, #0a1f1f 0%, #0a1f1f 22%, rgba(10,31,31,0.88) 34%, rgba(10,31,31,0.4) 48%, rgba(10,31,31,0) 62%)",
        }}
      />

      {/* Just enough darkening at the very top for the nav to stay legible — thin,
          not a band across the middle. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-mountain-950/50 to-transparent" />

      {/* Decorative dot grid — placed in the seam where the wash fades, echoing the reference's
          placement over open sky/water rather than floating arbitrarily */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="hidden lg:grid absolute top-32 right-[18%] xl:right-[22%] grid-cols-4 gap-2.5 z-10"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-snow-100/45" />
        ))}
      </motion.div>

      {/* Social rail, left edge, vertical divider like the reference */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="hidden md:flex flex-col items-center gap-5 absolute left-7 lg:left-10 bottom-12 z-20"
      >
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href="#"
            aria-label={s.label}
            className="text-snow-200/70 hover:text-gold-400 transition-colors duration-300"
          >
            <SocialIcon icon={s.icon} />
          </a>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:pl-24 pb-16 sm:pb-20 pt-32"
      >
        <div className="flex flex-col items-start text-left max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-7 flex items-center gap-3 px-5 py-2 rounded-full border border-gold-400/35 bg-mountain-950/30 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-body text-gold-400 text-xs tracking-[0.2em] uppercase">
              Nepal Tourism Board Certified · 专业导游
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] text-snow-100 mb-1 drop-shadow-[0_6px_28px_rgba(0,0,0,0.5)]">
              Amir
            </h1>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9]">
              <span className="gold-shimmer">Shakya</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-accent text-xl sm:text-2xl md:text-3xl italic text-snow-200 mb-5 max-w-xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]"
          >
            Your Bridge Between China and the Roof of the World
          </motion.p>

          {/* Animated word */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-10 h-11 flex items-center"
          >
            <span className="font-display text-2xl sm:text-3xl text-gold-300/75 mr-3">Nepal is</span>
            <span
              key={wordIndex}
              className="font-display text-2xl sm:text-3xl font-bold gold-shimmer"
              style={prefersReducedMotion ? undefined : { animation: "fadeUp 0.5s ease forwards" }}
            >
              {floatingWords[wordIndex]}
            </span>
          </motion.div>

          {/* Stats — single divider-rule strip, like the reference's clean info row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap items-center gap-x-9 gap-y-5 mb-11 pl-px"
          >
            {[
              { num: "15+", label: "Years", sub: "经验" },
              { num: "500+", label: "Groups", sub: "团队" },
              { num: "4", label: "Languages", sub: "语言" },
              { num: "7", label: "Provinces", sub: "省份" },
            ].map((stat, i) => (
              <div key={stat.num} className="flex items-center">
                {i > 0 && <span className="w-px h-9 bg-snow-100/20 mr-9" aria-hidden="true" />}
                <div className="flex flex-col items-start">
                  <span className="font-display text-3xl sm:text-4xl font-bold gold-shimmer leading-none">{stat.num}</span>
                  <span className="font-body text-snow-300 text-[11px] tracking-widest uppercase mt-1.5">{stat.label}</span>
                  <span className="font-accent text-gold-300/65 text-[11px] italic">{stat.sub}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#destinations"
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-mountain-950 font-body font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:shadow-gold hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Destinations
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a
              href="#about"
              className="px-8 py-4 rounded-full border border-snow-100/35 text-snow-100 font-body text-sm tracking-wide backdrop-blur-sm hover:bg-snow-100/10 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snow-100"
            >
              Meet Amir
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-7 right-7 sm:right-10 lg:right-24 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-body text-snow-300/70 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold-400/60 to-transparent relative overflow-hidden">
          {!prefersReducedMotion && (
            <div className="absolute top-0 w-full h-4 bg-gold-400" style={{ animation: "snowFall 1.5s ease-in-out infinite" }} />
          )}
        </div>
      </motion.div>
    </section>
  );
}