"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const floatingWords = ["险峻", "神圣", "壮观", "सुन्दर", "शान्त", "अद्भुत"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setWordIndex((i) => (i + 1) % floatingWords.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layered background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-mountain-900 to-mountain-800" />
        
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                width: `${Math.random() * 2 + 0.5}px`,
                height: `${Math.random() * 2 + 0.5}px`,
                opacity: Math.random() * 0.8 + 0.1,
                animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Mountain silhouettes */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice">
          {/* Far mountains - lightest */}
          <path d="M0,400 L0,280 L120,200 L240,160 L360,120 L480,90 L560,110 L640,70 L720,40 L800,65 L880,95 L960,75 L1040,105 L1120,130 L1200,160 L1300,190 L1440,220 L1440,400 Z" fill="#1a3a1a" opacity="0.6"/>
          {/* Mid mountains */}
          <path d="M0,400 L0,320 L100,260 L180,230 L260,200 L340,170 L400,185 L460,155 L520,125 L600,145 L680,115 L760,90 L840,115 L920,140 L1000,160 L1080,180 L1160,200 L1240,220 L1320,250 L1440,270 L1440,400 Z" fill="#0f2210" opacity="0.8"/>
          {/* Snow peaks */}
          <path d="M580,145 L600,110 L620,90 L640,60 L660,35 L680,15 L700,0 L720,15 L740,30 L755,55 L770,75 L785,95 L800,115 L780,125 L760,108 L740,88 L720,70 L700,90 L680,112 L660,128 L640,118 L620,130 Z" fill="#e8f4f0" opacity="0.9"/>
          <path d="M520,125 L540,100 L560,75 L580,55 L565,80 L545,105 L530,120 Z" fill="#ddeee8" opacity="0.7"/>
          {/* Close dark mountains */}
          <path d="M0,400 L0,360 L80,310 L160,290 L240,270 L320,250 L380,260 L440,240 L520,220 L600,235 L680,250 L760,265 L840,275 L920,285 L1000,295 L1080,310 L1160,320 L1240,335 L1320,350 L1440,360 L1440,400 Z" fill="#060e06"/>
          {/* Treeline */}
          <path d="M0,400 L0,380 L40,368 L80,360 L120,355 L160,365 L200,358 L240,350 L280,362 L320,355 L360,360 L400,370 L440,365 L480,372 L520,378 L560,373 L600,380 L640,376 L680,382 L720,380 L760,385 L800,382 L840,388 L880,385 L920,390 L960,386 L1000,392 L1040,388 L1080,393 L1120,390 L1160,395 L1200,392 L1240,396 L1280,393 L1320,397 L1360,395 L1440,398 L1440,400 Z" fill="#030805"/>
        </svg>

        {/* Aurora-like glow */}
        <div className="absolute top-20 left-1/4 w-96 h-40 bg-mountain-400/10 rounded-full blur-[80px] animate-float-slow" />
        <div className="absolute top-32 right-1/4 w-80 h-32 bg-gold-500/8 rounded-full blur-[60px] animate-float" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y: textY, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-8 flex items-center gap-3 px-5 py-2 rounded-full border border-gold-500/30 bg-gold-500/5 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-body text-gold-300 text-xs tracking-[0.2em] uppercase">
              Nepal Tourism Board Certified · 专业导游
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] text-snow-100 mb-2">
              Pemba
            </h1>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9]">
              <span className="gold-shimmer">Sherpa</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-accent text-xl sm:text-2xl md:text-3xl italic text-snow-200/80 mb-4 max-w-2xl"
          >
            Your Bridge Between China and the Roof of the World
          </motion.p>

          {/* Animated word */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-10 h-12 flex items-center justify-center"
          >
            <span className="font-display text-3xl text-gold-400/60 mr-3">Nepal is</span>
            <span
              key={wordIndex}
              className="font-display text-3xl font-bold gold-shimmer"
              style={{ animation: "fadeUp 0.5s ease forwards" }}
            >
              {floatingWords[wordIndex]}
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-12 text-center"
          >
            {[
              { num: "15+", label: "Years", sub: "经验" },
              { num: "500+", label: "Groups", sub: "团队" },
              { num: "4", label: "Languages", sub: "语言" },
              { num: "7", label: "Provinces", sub: "省份" },
            ].map((stat) => (
              <div key={stat.num} className="flex flex-col items-center">
                <span className="font-display text-3xl sm:text-4xl font-bold gold-shimmer">{stat.num}</span>
                <span className="font-body text-snow-200/70 text-xs tracking-widest uppercase mt-0.5">{stat.label}</span>
                <span className="font-accent text-gold-400/50 text-xs italic">{stat.sub}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#destinations"
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-mountain-900 font-body font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:shadow-gold hover:scale-105"
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
              className="px-8 py-4 rounded-full border border-snow-100/20 text-snow-100 font-body text-sm tracking-wide hover:bg-snow-100/5 transition-all duration-300"
            >
              Meet Pemba
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-body text-snow-200/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold-400/50 to-transparent relative overflow-hidden">
            <div className="absolute top-0 w-full h-4 bg-gold-400 animate-[slideDown_1.5s_ease-in-out_infinite]" style={{ animation: "snowFall 1.5s ease-in-out infinite" }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070d07] to-transparent" />
    </section>
  );
}
