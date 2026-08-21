"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, LayoutGroup } from "framer-motion";
import { destinations } from "@/app/data/portfolio";

const difficultyColor: Record<string, string> = {
  Easy: "text-green-400 border-green-500/30 bg-green-500/10",
  "Moderate–Hard": "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
  Challenging: "text-red-400 border-red-500/30 bg-red-500/10",
};

// Deterministic "scattered on the table" tilt — same photo always lands
// the same way, so it doesn't jump around on re-render.
const TILTS = [-3, 2, -2, 3, -1.5, 1.5, -2.5, 2.5];
const getTilt = (id: number) => TILTS[id % TILTS.length];
const isWide = (id: number) => id % 4 === 0;

const galleryEmoji = ["🏔️", "🛕", "⛰️", "🐘", "☸️", "🚣", "🌅", "🥾", "🗺️", "🕯️"];
const heroEmoji = (id: number) =>
  ["🏔️", "🛕", "⛰️", "🐘", "☸️", "🚣"][id % 6];
const getFilmStrip = (dest: { id: number }) =>
  [0, 1, 2, 3].map((n) => ({
    id: n,
    emoji: galleryEmoji[(dest.id + n) % galleryEmoji.length],
    tilt: (n % 2 === 0 ? -1 : 1) * (4 + n * 2),
  }));

export default function Destinations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const index = useMemo(
    () => destinations.findIndex((d) => d.id === selectedId),
    [selectedId]
  );
  const selected = index >= 0 ? destinations[index] : null;

  const goTo = (dir: 1 | -1) => {
    if (index < 0) return;
    const next = (index + dir + destinations.length) % destinations.length;
    setSelectedId(destinations[next].id);
  };

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <section id="destinations" ref={ref} className="relative py-32 bg-[#F0EDE6] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[length:40px_40px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            Nepal&apos;s <span className="gold-shimmer">Wonders</span>
          </h2>
          <p className="font-body text-mountain-600 max-w-xl mx-auto text-lg">
            A field journal from the trail — click a photo to open the page.
          </p>
        </motion.div>

        <LayoutGroup>
          {/* Photo board */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14">
            {destinations.map((dest, i) => {
              if (dest.id === selectedId) return null; // lifted into the modal
              const wide = isWide(dest.id);
              const tilt = getTilt(dest.id);

              return (
                <motion.button
                  key={dest.id}
                  layoutId={`polaroid-${dest.id}`}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
                  style={{ rotate: tilt }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
                  onClick={() => setSelectedId(dest.id)}
                  className={`group relative text-left bg-white p-3 pb-10 rounded-sm shadow-md hover:shadow-2xl transition-shadow duration-300 ${
                    wide ? "col-span-2" : "col-span-1"
                  }`}
                >
                  {/* washi tape */}
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-gold-400/40 rotate-[-2deg] shadow-sm pointer-events-none" />

                  {/* photo */}
                  <div
                    className={`relative overflow-hidden bg-gradient-to-br ${dest.colorClass} img-placeholder ${
                      wide ? "aspect-[16/9]" : "aspect-[4/5]"
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-80 group-hover:scale-110 transition-transform duration-500">
                      {heroEmoji(dest.id)}
                    </div>
                    <div className="absolute inset-0 bg-mountain-900/0 group-hover:bg-mountain-900/10 transition-colors duration-300" />
                  </div>

                  {/* passport stamp */}
                  <div className="absolute top-2 right-2 w-16 h-16 rounded-full border-2 border-dashed border-white/70 bg-mountain-900/30 backdrop-blur-[1px] flex items-center justify-center rotate-[12deg] group-hover:rotate-0 transition-transform duration-500">
                    <div className="text-center leading-none">
                      <p className="text-white text-[9px] font-body tracking-widest uppercase">↑ {dest.altitude}</p>
                      <p className={`text-[8px] font-body mt-0.5 ${difficultyColor[dest.difficulty]?.split(" ")[0] || "text-white"}`}>
                        {dest.difficulty}
                      </p>
                    </div>
                  </div>

                  {/* caption */}
                  <div className="pt-3 px-1">
                    <p className="font-body text-gold-500 text-[10px] tracking-[0.2em] uppercase mb-0.5">{dest.region}</p>
                    <h3 className="font-accent text-xl text-mountain-900 leading-tight">{dest.name}</h3>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Open journal page */}
          <AnimatePresence>
            {selected && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedId(null)}
                  className="fixed inset-0 bg-mountain-900/80 backdrop-blur-sm z-40"
                />

                <motion.div
                  layoutId={`polaroid-${selected.id}`}
                  className="fixed inset-4 md:inset-10 lg:inset-16 z-50 bg-[#F7F4EC] rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* prev/next */}
                  <button
                    onClick={() => goTo(-1)}
                    aria-label="Previous destination"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-mountain-900 flex items-center justify-center shadow-md transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => goTo(1)}
                    aria-label="Next destination"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-mountain-900 flex items-center justify-center shadow-md transition-colors"
                  >
                    ›
                  </button>
                  <button
                    onClick={() => setSelectedId(null)}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-mountain-900/80 hover:bg-mountain-900 text-white flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>

                  {/* Left: big photo */}
                  <div className="lg:col-span-5 relative p-6 lg:p-10 flex items-center justify-center bg-mountain-900/5">
                    <motion.div
                      initial={{ rotate: -2, scale: 0.96, opacity: 0 }}
                      animate={{ rotate: -2, scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="relative w-full max-w-sm bg-white p-3 pb-8 shadow-xl"
                    >
                      <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${selected.colorClass} img-placeholder`}>
                        <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-80">📍</div>
                      </div>
                      <div className="absolute top-3 right-3 w-16 h-16 rounded-full border-2 border-dashed border-mountain-900/30 flex items-center justify-center rotate-[10deg]">
                        <p className="text-mountain-900 text-[9px] font-body tracking-widest uppercase text-center leading-tight">
                          ↑ {selected.altitude}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: journal entry */}
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="lg:col-span-7 overflow-y-auto p-6 lg:p-10"
                  >
                    <p className="font-body text-gold-500 text-xs tracking-[0.25em] uppercase mb-2">
                      {selected.region} · {index + 1} / {destinations.length}
                    </p>
                    <h3 className="font-display text-4xl font-bold text-mountain-900 mb-1">{selected.name}</h3>
                    <p className="font-accent text-lg italic text-mountain-600 mb-5">
                      {selected.chinese} · {selected.nepali}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className={`px-3 py-1 rounded-full border text-xs font-body ${difficultyColor[selected.difficulty] || "text-mountain-700 border-mountain-300"}`}>
                        {selected.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full border border-mountain-300 text-mountain-700 text-xs font-body">
                        {selected.duration}
                      </span>
                      <span className="px-3 py-1 rounded-full border border-mountain-300 text-mountain-700 text-xs font-body">
                        {selected.season}
                      </span>
                    </div>

                    <p className="font-body text-mountain-700 text-sm leading-relaxed mb-8">
                      {selected.description}
                    </p>

                    <div className="mb-8">
                      <p className="font-body text-mountain-900 text-xs tracking-widest uppercase mb-3 border-b border-mountain-200 pb-2">
                        Notes from the trail
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selected.highlights.map((h: string) => (
                          <span key={h} className="px-3 py-1.5 rounded-lg bg-mountain-100 font-body text-mountain-700 text-xs flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 flex-wrap pt-2">
                      {getFilmStrip(selected).map((img) => (
                        <motion.div
                          key={img.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + img.id * 0.08 }}
                          style={{ rotate: img.tilt }}
                          className="bg-white p-1.5 pb-4 shadow-md w-20"
                        >
                          <div className="aspect-square bg-gradient-to-br from-mountain-700 to-mountain-500 img-placeholder flex items-center justify-center text-xl">
                            {img.emoji}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}