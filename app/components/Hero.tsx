"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const floatingWords = ["险峻", "神圣", "壮观", "सुन्दर", "शान्त", "अद्भुत"];

const socialLinks = [
  { label: "WeChat", icon: "wechat" },
  { label: "WhatsApp", icon: "whatsapp" },
  { label: "Instagram", icon: "instagram" },
  { label: "Facebook", icon: "facebook" },
];

const heroThumbs = [
  { path: "607630466_25578546805119759_4616492585880702082_n.jpg", label: "TEMPLE", icon: "🛕", className: "from-gold-400/70 to-mountain-500", real: true },
  { path: "518335262_24150939037880550_6467125705180450735_n.jpg", label: "TRAIL", icon: "⛰️", className: "from-mountain-300 to-mountain-500", real: true },
  { path: "565128548_24936310506010062_2824124563101326087_n.jpg", label: "HIMALAYA", icon: "🏔️", className: "from-mountain-400 to-mountain-600", real: true },
  { path: "hero-5.jpg", label: "CULTURE", icon: "🎎", className: "from-gold-400/50 to-mountain-600", real: false },
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
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.74 3.74 0 0 1-1.38-.9 3.74 3.74 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.18-.46.39-.79.74-1.13.34-.35.67-.56 1.13-.74.35-.14.87-.3 1.83-.34C8.42 2.17 8.8 2.16 12 2.16Zm0 2.16c-3.15 0-3.5.01-4.73.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.74-.35.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83-.06 1.23-.07 1.58-.07 4.73s.01 3.5.07 4.73c.04.96.2 1.48.34 1.83.18.46.39.79.74 1.13.34.35.67.56 1.13.74.35.14.87.3 1.83.34 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.74.35-.34.56-.67.74-1.13.18-.35.3-.87.34-1.83.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.96-.2-1.48-.34-1.83a3.02 3.02 0 0 0-.74-1.13 3.02 3.02 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34-1.23-.06-1.58-.07-4.73-.07Zm0 3.68a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 6.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Zm5.1-6.76a.94.94 0 1 1-1.87 0 .94.94 0 0 1 1.87 0Z"/>
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

const lineReveal = (delay: number) => ({
  initial: { y: "110%" },
  animate: { y: 0 },
  transition: { duration: 0.9, ease, delay },
});

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mainY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const tileY1 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const tileY2 = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);
  const tileY3 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

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
      className="relative min-h-[100svh] overflow-hidden bg-mountain-50"
    >
      {/* Soft background washes */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : bgY }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -top-32 right-[-6%] w-[38rem] h-[38rem] rounded-full bg-gold-300/25 blur-[130px]" />
        <div className="absolute bottom-[-18%] left-[-8%] w-[32rem] h-[32rem] rounded-full bg-mountain-300/25 blur-[130px]" />
      </motion.div>

      {/* Desktop dynamic editorial collage */}
      <div className="absolute inset-0 z-0 hidden lg:block" aria-hidden="true">
        <div className="relative w-full max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-14">
          
          {/* Dynamic Collage Container */}
          <motion.div 
            style={{ y: prefersReducedMotion ? 0 : bgY }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[42vw] max-w-[560px] h-[72vh] max-h-[680px]"
          >
            
            {/* Main Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 1.1, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.5 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[58%] aspect-[4/5] overflow-hidden shadow-[0_30px_60px_-15px_rgba(28,25,23,0.35)] z-10 group"
            >
              <motion.div style={{ y: prefersReducedMotion ? 0 : mainY }} className="relative w-full h-full">
                <Image
                  src="/images/amir-hero.jpeg"
                  alt="Amir Shakya overlooking the Annapurna range at sunrise"
                  fill
                  priority
                  sizes="30vw"
                  quality={90}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </motion.div>

            {/* Right Column Stack */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[38%] h-[88%] flex flex-col gap-4">
              
              {/* Himalaya - Top Tall */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease, delay: 0.7 }}
                className="relative w-full flex-1 overflow-hidden shadow-[0_25px_50px_-12px_rgba(28,25,23,0.3)] group"
              >
                <motion.div style={{ y: prefersReducedMotion ? 0 : tileY1 }} className="relative w-full h-full">
                  <Image
                    src={`/images/${heroThumbs[2].path}`}
                    alt={heroThumbs[2].label}
                    fill
                    sizes="20vw"
                    quality={85}
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mountain-900/70 to-transparent pt-10 px-4 pb-3 pointer-events-none">
                    <span className="font-body text-snow-100 text-[10px] tracking-[0.2em] uppercase">
                      {heroThumbs[2].label}
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Trail - Bottom Short */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease, delay: 0.85 }}
                className="relative w-full h-[35%] overflow-hidden shadow-[0_25px_50px_-12px_rgba(28,25,23,0.3)] group"
              >
                <motion.div style={{ y: prefersReducedMotion ? 0 : tileY2 }} className="relative w-full h-full">
                  <Image
                    src={`/images/${heroThumbs[1].path}`}
                    alt={heroThumbs[1].label}
                    fill
                    sizes="20vw"
                    quality={85}
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mountain-900/70 to-transparent pt-6 px-4 pb-2 pointer-events-none">
                    <span className="font-body text-snow-100 text-[10px] tracking-[0.2em] uppercase">
                      {heroThumbs[1].label}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
              
            </div>

            {/* Floating Temple Image - Overlapping Bottom Left */}
            <motion.div
              initial={{ opacity: 0, y: 50, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1, ease, delay: 1 }}
              className="absolute left-[12%] bottom-[5%] w-[36%] aspect-square overflow-hidden shadow-[0_35px_60px_-15px_rgba(28,25,23,0.4)] z-20 group"
            >
              <motion.div style={{ y: prefersReducedMotion ? 0 : tileY3 }} className="relative w-full h-full">
                <Image
                  src={`/images/${heroThumbs[0].path}`}
                  alt={heroThumbs[0].label}
                  fill
                  sizes="20vw"
                  quality={85}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mountain-900/70 to-transparent pt-8 px-4 pb-3 pointer-events-none">
                  <span className="font-body text-snow-100 text-[10px] tracking-[0.2em] uppercase">
                    {heroThumbs[0].label}
                  </span>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-28 lg:pt-32 pb-10 flex flex-col min-h-[100svh]"
      >
        <div className="flex flex-col items-start text-left max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-7 flex items-center gap-3 px-5 py-2 rounded-full border border-gold-400/40 bg-white/70 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-body text-gold-500 text-xs tracking-[0.2em] uppercase">
              Nepal Tourism Board Certified · 专业导游
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="mb-6">
            <h1 className="font-display font-bold leading-[0.9] text-mountain-900 text-6xl sm:text-7xl lg:text-[clamp(4.5rem,8vw,8rem)]">
              <span className="block overflow-hidden">
                <motion.span {...lineReveal(0.15)} className="block">
                  Amir
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span {...lineReveal(0.3)} className="block italic gold-shimmer">
                  Shakya
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-accent text-xl sm:text-2xl italic text-mountain-700 mb-5 max-w-xl"
          >
            Your Bridge Between China and the Roof of the World
          </motion.p>

          {/* Animated word */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mb-10 h-11 flex items-center"
          >
            <span className="font-display text-2xl sm:text-3xl text-mountain-600 mr-3">Nepal is</span>
            <span
              key={wordIndex}
              className="font-display text-2xl sm:text-3xl font-bold gold-shimmer"
              style={prefersReducedMotion ? undefined : { animation: "fadeUp 0.5s ease forwards" }}
            >
              {floatingWords[wordIndex]}
            </span>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap items-center gap-x-9 gap-y-5 mb-11 pl-px"
          >
            {[
              { num: "15+", label: "Years", sub: "经验" },
              { num: "500+", label: "Groups", sub: "团队" },
              { num: "4", label: "Languages", sub: "语言" },
              { num: "7", label: "Provinces", sub: "省份" },
            ].map((stat, i) => (
              <div key={stat.num} className="flex items-center">
                {i > 0 && <span className="w-px h-9 bg-mountain-300/50 mr-9" aria-hidden="true" />}
                <div className="flex flex-col items-start">
                  <span className="font-display text-3xl sm:text-4xl font-bold gold-shimmer leading-none">{stat.num}</span>
                  <span className="font-body text-mountain-600 text-[11px] tracking-widest uppercase mt-1.5">{stat.label}</span>
                  <span className="font-accent text-gold-400 text-[11px] italic">{stat.sub}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#destinations"
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-snow-100 font-body font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:shadow-gold hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
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
              className="px-8 py-4 rounded-full border border-mountain-900/25 text-mountain-900 font-body text-sm tracking-wide hover:bg-mountain-900/5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mountain-900"
            >
              Meet Amir
            </a>
          </motion.div>
        </div>

        {/* Mobile collage — horizontal scroller, varied tile sizes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="lg:hidden mt-12 -mx-6 px-6 flex items-center gap-3 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="relative w-52 aspect-[3/5] shrink-0 snap-start overflow-hidden">
            <Image
              src="/images/amir-hero.jpeg"
              alt="Amir Shakya overlooking the Annapurna range at sunrise"
              fill
              priority
              sizes="13rem"
              quality={90}
              className="object-cover object-center"
            />
          </div>
          {[
            { tile: heroThumbs[0], w: "w-40", aspect: "aspect-[3/4]" },
            { tile: heroThumbs[1], w: "w-28", aspect: "aspect-square" },
            { tile: heroThumbs[2], w: "w-44", aspect: "aspect-[16/9]" },
            { tile: heroThumbs[3], w: "w-32", aspect: "aspect-[4/5]" },
          ].map(({ tile, w, aspect }) => (
            <div
              key={tile.path}
              title={tile.real ? undefined : `Replace with /public/images/${tile.path}`}
              className={`${w} ${aspect} shrink-0 snap-start overflow-hidden`}
            >
              {tile.real ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={`/images/${tile.path}`}
                    alt={`${tile.label.toLowerCase()} photo from Nepal`}
                    fill
                    sizes="11rem"
                    quality={85}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mountain-900/60 via-mountain-900/10 to-transparent pt-6 px-2.5 pb-1.5 pointer-events-none">
                    <span className="font-body text-snow-100/90 text-[9px] tracking-[0.2em] uppercase">
                      {tile.label}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${tile.className} flex flex-col items-center justify-center`}
                >
                  <span className="text-xl">{tile.icon}</span>
                  <span className="mt-1.5 font-body text-white/80 text-[9px] tracking-[0.2em] uppercase">
                    {tile.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        <div className="flex-1" />

        {/* Socials + scroll indicator */}
        <div className="mt-12 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex items-center gap-5"
          >
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href="#contact"
                aria-label={s.label}
                className="text-mountain-700 hover:text-gold-500 transition-colors duration-300"
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="hidden lg:flex flex-col items-center gap-2"
          >
            <span className="font-body text-[9px] uppercase tracking-[0.3em] text-mountain-400">
              Scroll
            </span>
            <div className="w-px h-10 overflow-hidden">
              {!prefersReducedMotion && (
                <motion.div
                  animate={{ y: [0, 40] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-px h-full bg-gradient-to-b from-gold-400 to-transparent"
                />
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}