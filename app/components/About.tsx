"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { guide } from "@/app/data/portfolio";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { delay, duration: 0.7 },
  });

  return (
    <section id="about" ref={ref} className="relative py-32 bg-[#070d07] overflow-hidden">
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-mountain-600/30 to-transparent" />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-mountain-600/5 blur-[80px]" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-gold-500/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...item(0)} className="flex items-center gap-4 mb-16">
          <div className="w-12 h-px bg-gold-500" />
          <span className="font-body text-gold-400 text-xs tracking-[0.3em] uppercase">About the Guide · 关于向导</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Photo grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 relative h-72 rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-mountain-700 to-mountain-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-3">🏔️</div>
                    <p className="font-accent text-snow-200/60 italic text-sm">Your guide photo here</p>
                    <p className="font-body text-snow-200/40 text-xs mt-1">Replace: /public/images/guide-main.jpg</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-mountain-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-display text-snow-100 text-lg font-semibold">{guide.name}</span>
                  <p className="font-body text-gold-400 text-xs">{guide.title}</p>
                </div>
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-mountain-600/60 to-mountain-800 flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="text-4xl mb-2">🛕</div>
                    <p className="font-body text-snow-200/40 text-xs">Temple photo</p>
                  </div>
                </div>
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-600/20 to-mountain-800 flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="text-4xl mb-2">🧭</div>
                    <p className="font-body text-snow-200/40 text-xs">Action photo</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 border border-gold-500/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-lg">🏅</div>
                <div>
                  <p className="font-body text-snow-100 text-xs font-semibold">NTB Certified</p>
                  <p className="font-body text-gold-400 text-[10px]">Since 2008</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div className="space-y-8">
            <motion.div {...item(0.1)}>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-snow-100 leading-tight mb-2">
                Your Gateway to
              </h2>
              <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight gold-shimmer">
                Nepal&apos;s Soul
              </h2>
            </motion.div>

            <motion.p {...item(0.2)} className="font-body text-snow-200/70 leading-relaxed text-base">
              {guide.bio}
            </motion.p>
            <motion.p {...item(0.25)} className="font-body text-snow-200/70 leading-relaxed text-base">
              {guide.bio2}
            </motion.p>

            <motion.div {...item(0.3)}>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-gold-400 mb-3">Languages · 语言</p>
              <div className="flex flex-wrap gap-2">
                {guide.languages.map((lang) => (
                  <span key={lang} className="px-4 py-1.5 rounded-full border border-mountain-600/50 bg-mountain-800/30 font-body text-snow-200 text-xs">
                    {lang}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div {...item(0.35)}>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-gold-400 mb-3">Certifications · 资质</p>
              <div className="space-y-2">
                {guide.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-gold-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-body text-snow-200/80 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...item(0.4)} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { num: `${guide.yearsExperience}+`, label: "Years" },
                { num: `${guide.groupsGuided}+`, label: "Groups" },
                { num: `${guide.peaksVisited}`, label: "Peaks" },
                { num: `${guide.districtsKnown}`, label: "Districts" },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-xl p-4 text-center border border-white/5">
                  <div className="font-display text-2xl font-bold gold-shimmer">{s.num}</div>
                  <div className="font-body text-snow-200/50 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
