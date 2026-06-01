"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences, timeline } from "@/app/data/portfolio";

export default function Experience() {
  const ref = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="relative py-32 bg-[#070d07] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, #5f925f 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mountain-600/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold-500" />
            <span className="font-body text-gold-400 text-xs tracking-[0.3em] uppercase">Expertise · 专业技能</span>
            <div className="w-12 h-px bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-bold text-snow-100 mb-4">
            What I <span className="gold-shimmer">Offer</span>
          </h2>
          <p className="font-body text-snow-200/60 max-w-lg mx-auto">
            Decades of experience refined into a seamless, enriching experience for every traveler.
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: "easeOut" }}
              className="group glass-card rounded-2xl p-6 border border-white/5 hover:border-gold-500/20 transition-all duration-500 hover-lift"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{exp.icon}</div>
              <h3 className="font-display text-lg font-bold text-snow-100 mb-3">{exp.title}</h3>
              <p className="font-body text-snow-200/60 text-sm leading-relaxed">{exp.description}</p>
              <div className="mt-4 w-8 h-0.5 bg-gold-500/50 group-hover:w-16 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0 }}
          animate={timelineInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="text-center mb-16">
            <h3 className="font-display text-4xl font-bold text-snow-100 mb-2">
              Journey <span className="gold-shimmer">Timeline</span>
            </h3>
            <p className="font-accent text-snow-200/50 italic">15 years in the making · 十五年的历程</p>
          </div>

          {/* Timeline items */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-mountain-600/40 to-transparent hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: "easeOut" }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? "" : "md:[direction:rtl]"}`}
                >
                  {/* Content */}
                  <div className={`${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"} [direction:ltr]`}>
                    <div className="glass-card rounded-xl p-5 border border-white/5 inline-block w-full">
                      <span className="font-display text-gold-400 text-2xl font-bold">{item.year}</span>
                      <h4 className="font-body text-snow-100 font-semibold mt-1">{item.event}</h4>
                      <p className="font-body text-snow-200/50 text-sm mt-1">{item.detail}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gold-500 bg-mountain-900 z-10 items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  </div>

                  {/* Empty col for alternating */}
                  <div className="hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
