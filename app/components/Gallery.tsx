"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const gallerySlots = [
  { label: "Everest Trek", path: "gallery-1.jpg", aspect: "tall", icon: "🏔️" },
  { label: "Kathmandu Temples", path: "gallery-2.jpg", aspect: "wide", icon: "🛕" },
  { label: "Local Culture", path: "gallery-3.jpg", aspect: "square", icon: "👥" },
  { label: "Himalaya Views", path: "gallery-4.jpg", aspect: "square", icon: "⛰️" },
  { label: "Wildlife Safari", path: "gallery-5.jpg", aspect: "tall", icon: "🐘" },
  { label: "Phewa Lake", path: "gallery-6.jpg", aspect: "wide", icon: "🚣" },
  { label: "Lumbini Peace", path: "gallery-7.jpg", aspect: "square", icon: "☸️" },
  { label: "Mountain Sunrise", path: "gallery-8.jpg", aspect: "square", icon: "🌅" },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="gallery" ref={ref} className="relative py-32 bg-[#F0EDE6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold-500" />
            <span className="font-body text-gold-400 text-xs tracking-[0.3em] uppercase">Gallery · 图库</span>
            <div className="w-12 h-px bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-bold text-mountain-900 mb-4">
            Moments <span className="gold-shimmer">Captured</span>
          </h2>
          <p className="font-body text-mountain-600 max-w-lg mx-auto">
            Every frame tells a story from Nepal's living tapestry — replace these with your own memories.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {gallerySlots.map((slot, i) => {
            const rowSpan = slot.aspect === "tall" ? "row-span-2" : "row-span-1";
            const colSpan = slot.aspect === "wide" ? "col-span-2" : "col-span-1";
            return (
              <motion.div
                key={slot.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`${rowSpan} ${colSpan} relative rounded-2xl overflow-hidden img-placeholder group cursor-pointer hover-lift`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-mountain-400 to-mountain-600 flex flex-col items-center justify-center gap-2">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{slot.icon}</div>
                  <p className="font-body text-white/70 text-sm font-medium">{slot.label}</p>
                  <p className="font-body text-white/40 text-xs text-center px-4">
                    /public/images/{slot.path}
                  </p>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-mountain-800/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="font-body text-white text-sm font-semibold">{slot.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Image replacement guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 p-6 rounded-2xl border border-mountain-300/50 bg-mountain-100/80"
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl">📁</div>
            <div>
              <h4 className="font-body text-gold-400 font-semibold mb-2">How to Add Your Photos</h4>
              <p className="font-body text-mountain-700 text-sm leading-relaxed">
                Place your images in <code className="bg-mountain-200 px-1.5 py-0.5 rounded text-mountain-800 text-xs">/public/images/</code> folder. 
                For the gallery, name them <code className="bg-mountain-200 px-1.5 py-0.5 rounded text-mountain-800 text-xs">gallery-1.jpg</code> through <code className="bg-mountain-200 px-1.5 py-0.5 rounded text-mountain-800 text-xs">gallery-8.jpg</code>.
                For destinations, use <code className="bg-mountain-200 px-1.5 py-0.5 rounded text-mountain-800 text-xs">dest-1.jpg</code> through <code className="bg-mountain-200 px-1.5 py-0.5 rounded text-mountain-800 text-xs">dest-6.jpg</code>.
                For your profile, use <code className="bg-mountain-200 px-1.5 py-0.5 rounded text-mountain-800 text-xs">guide-main.jpg</code>.
                Recommended size: <strong className="text-mountain-900">1200×800px minimum</strong>, JPG or WebP format.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
