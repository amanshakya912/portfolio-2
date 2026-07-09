"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { destinations } from "@/app/data/portfolio";

const difficultyColor: Record<string, string> = {
  Easy: "text-green-400 border-green-500/30 bg-green-500/10",
  "Moderate–Hard": "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
  Challenging: "text-red-400 border-red-500/30 bg-red-500/10",
};

export default function Destinations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="destinations" ref={ref} className="relative py-32 bg-[#F0EDE6] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold-500" />
            <span className="font-body text-gold-400 text-xs tracking-[0.3em] uppercase">Destinations · 目的地</span>
            <div className="w-12 h-px bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-bold text-mountain-900 mb-4">
            Nepal's <span className="gold-shimmer">Wonders</span>
          </h2>
          <p className="font-body text-mountain-600 max-w-xl mx-auto text-lg">
            From the highest peaks on Earth to sacred ancient valleys — Nepal holds worlds within worlds.
          </p>
        </motion.div>

        {/* Destinations grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: "easeOut" }}
              onHoverStart={() => setHovered(dest.id)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setSelected(selected === dest.id ? null : dest.id)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden bg-white border border-mountain-300/40 hover:border-gold-400/40 transition-all duration-500 hover-lift shadow-sm"
            >
              {/* Image area */}
              <div className="relative h-56 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${dest.colorClass} img-placeholder`}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="text-5xl">
                      {dest.id === 1 ? "🏔️" : dest.id === 2 ? "🛕" : dest.id === 3 ? "⛰️" : dest.id === 4 ? "🐘" : dest.id === 5 ? "☸️" : "🚣"}
                    </div>
                    <p className="font-body text-snow-200/40 text-xs text-center px-8">
                      Replace with: /public/images/dest-{dest.id}.jpg
                    </p>
                  </div>
                </div>
                {/* Overlay on hover */}
                <motion.div
                  animate={{ opacity: hovered === dest.id ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-mountain-900/70 via-mountain-900/30 to-transparent"
                />
                {/* Altitude badge */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm font-body text-white text-xs">
                    ↑ {dest.altitude}
                  </span>
                  <span className={`px-3 py-1 rounded-full border backdrop-blur-sm font-body text-xs ${difficultyColor[dest.difficulty] || "text-white"}`}>
                    {dest.difficulty}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="bg-white p-6">
                <div className="mb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-mountain-900">{dest.name}</h3>
                      <p className="font-accent text-gold-400 text-sm italic">{dest.chinese}</p>
                    </div>
                    <span className="font-body text-mountain-500 text-xs">{dest.region}</span>
                  </div>
                  <p className="font-body text-xs text-mountain-500 mt-1">{dest.nepali}</p>
                </div>

                <p className="font-body text-mountain-700 text-sm leading-relaxed line-clamp-2 mb-4">
                  {dest.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-body text-mountain-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {dest.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {dest.season}
                  </span>
                </div>

                {/* Expandable highlights */}
                <AnimatePresence>
                  {selected === dest.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-mountain-200 mt-4">
                        <p className="font-body text-gold-400 text-xs tracking-widest uppercase mb-2">Highlights</p>
                        <div className="flex flex-wrap gap-2">
                          {dest.highlights.map((h) => (
                            <span key={h} className="px-2.5 py-1 rounded-lg bg-mountain-100 font-body text-mountain-700 text-xs">{h}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex items-center text-gold-400 text-xs font-body">
                  <span>{selected === dest.id ? "Less info" : "More info"}</span>
                  <motion.svg
                    animate={{ rotate: selected === dest.id ? 180 : 0 }}
                    className="w-3.5 h-3.5 ml-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
