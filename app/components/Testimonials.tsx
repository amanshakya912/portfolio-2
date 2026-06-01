"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "@/app/data/portfolio";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" ref={ref} className="relative py-32 bg-[#070d07] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(45,90,45,0.1),transparent_70%)]" />
      
      {/* Marquee strip */}
      <div className="absolute top-12 left-0 right-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(8).fill("NEPAL · 尼泊尔 · नेपाल · HIMALAYA · 喜马拉雅 · हिमालय · ").map((t, i) => (
            <span key={i} className="font-display text-2xl text-snow-100 mr-8">{t}</span>
          ))}
          {Array(8).fill("NEPAL · 尼泊尔 · नेपाल · HIMALAYA · 喜马拉雅 · हिमालय · ").map((t, i) => (
            <span key={`b${i}`} className="font-display text-2xl text-snow-100 mr-8">{t}</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold-500" />
            <span className="font-body text-gold-400 text-xs tracking-[0.3em] uppercase">Testimonials · 客户评价</span>
            <div className="w-12 h-px bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-bold text-snow-100 mb-4">
            Words from <span className="gold-shimmer">Travelers</span>
          </h2>
          <p className="font-body text-snow-200/60 max-w-lg mx-auto">
            500+ groups, countless memories. Here is what some of them say.
          </p>
        </motion.div>

        {/* Featured testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-10 border border-white/8 text-center relative overflow-hidden"
            >
              {/* Quote mark */}
              <div className="absolute top-6 left-8 font-display text-8xl text-gold-500/10 leading-none select-none">"</div>
              
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array(testimonials[active].rating).fill(0).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <blockquote className="font-accent text-xl sm:text-2xl italic text-snow-100/90 leading-relaxed mb-8 relative z-10">
                "{testimonials[active].text}"
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[active].avatarColor} flex items-center justify-center font-display font-bold text-white text-lg`}>
                  {testimonials[active].avatar}
                </div>
                <div className="text-left">
                  <p className="font-body font-semibold text-snow-100">{testimonials[active].name}</p>
                  <p className="font-accent text-gold-400 text-sm italic">{testimonials[active].chinese} · {testimonials[active].city}</p>
                  <p className="font-body text-snow-200/40 text-xs">{testimonials[active].trip}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === active ? "w-8 h-2 bg-gold-400" : "w-2 h-2 bg-mountain-600 hover:bg-mountain-400"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* All testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              onClick={() => setActive(i)}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 hover-lift ${
                i === active
                  ? "border-gold-500/40 bg-gold-500/5"
                  : "border-white/5 glass-card hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center font-display font-bold text-white text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-body text-snow-100 text-sm font-semibold leading-tight">{t.name}</p>
                  <p className="font-body text-snow-200/40 text-xs">{t.city}</p>
                </div>
              </div>
              <p className="font-body text-snow-200/60 text-xs leading-relaxed line-clamp-3">{t.text}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
