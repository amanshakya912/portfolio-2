"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const journeyStops = [
  {
    label: "Heritage Walk",
    labelZh: "文化古迹之旅",
    note: "A slow walk through centuries-old carvings in Bhaktapur",
    path: "518322225_24173246562316464_6910756241046079992_n.jpg",
    aspect: "aspect-[3/4]",
  },
  {
    label: "The Whole Squad",
    labelZh: "团队合影",
    note: "Group halt by the suspension bridge — everyone accounted for",
    path: "493323364_9770577053009988_1963171956303664925_n.jpg",
    aspect: "aspect-[4/3]",
  },
  {
    label: "Feast & Laughter",
    labelZh: "欢乐晚餐",
    note: "Dal bhat, momos, and more food than anyone could finish",
    path: "493671482_9775221299212230_2020258895593990023_n.jpg",
    aspect: "aspect-square",
  },
  {
    label: "Garden Stop",
    labelZh: "花园小憩",
    note: "A quiet break among the gazebos before the next leg",
    path: "518685327_24173261412314979_1479776588126883616_n.jpg",
    aspect: "aspect-[4/3]",
  },
  {
    label: "On the Trail",
    labelZh: "徒步旅途",
    note: "Hats on, water bottles out, spirits high",
    path: "520173579_24173282432312877_658461226205509718_n.jpg",
    aspect: "aspect-[3/4]",
  },
  {
    label: "Holi Colors",
    labelZh: "洒红节欢乐",
    note: "Festival season — everyone leaves a little more colorful",
    path: "496255092_9896800177054341_8554455163143510022_n.jpg",
    aspect: "aspect-[16/9]",
  },
];

// Layout constants for the ridge line — sized so the tallest polaroid column
// (pin + stem + photo + caption ≈ 615px) never clips at peaks or troughs
const POLAROID_WIDTH = 300;
const STEP = 460; // horizontal distance between stops
const PADDING_X = 220; // leading space before the first stop
const TRACK_HEIGHT = 940;
const CENTER_Y = 470;
const AMPLITUDE = 140; // how high/low each stop sits off the centerline

function buildRidgePath(count: number) {
  const points = Array.from({ length: count }, (_, i) => ({
    x: PADDING_X + i * STEP,
    y: CENTER_Y + (i % 2 === 0 ? -AMPLITUDE : AMPLITUDE),
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const midX = p0.x + (p1.x - p0.x) / 2;
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return { d, points, width: PADDING_X + (count - 1) * STEP + PADDING_X };
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hasScrolled, setHasScrolled] = useState(false);

  // Auto-drift control: paused while hovered, for a moment after any
  // pointer interaction, and whenever the track is off-screen
  const prefersReducedMotion = useReducedMotion();
  const trackInView = useInView(scrollRef, { amount: 0.2 });
  const hoverRef = useRef(false);
  const interactUntilRef = useRef(0);

  // Drag-to-scroll state (desktop mouse support)
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const { d, points, width } = useMemo(() => buildRidgePath(journeyStops.length), []);

  // Update the progress bar via ref — no re-render per scroll event
  const updateProgress = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (!hasScrolled && el.scrollLeft > 20) setHasScrolled(true);
    const max = el.scrollWidth - el.clientWidth;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${max > 0 ? (el.scrollLeft / max) * 100 : 0}%`;
    }
  };

  // Gentle auto-drift along the trail (~25px/s). The page's vertical scroll is
  // never intercepted — users scroll past normally; the trail moves on its own,
  // via drag (mouse), native touch swipe, trackpad-horizontal or shift+wheel.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || prefersReducedMotion) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const max = el.scrollWidth - el.clientWidth;
      if (
        trackInView &&
        !hoverRef.current &&
        now >= interactUntilRef.current &&
        el.scrollLeft < max - 1
      ) {
        el.scrollLeft += dt * 0.025;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion, trackInView]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Touch devices use native touch scrolling — a custom drag would fight it
    if (e.pointerType !== "mouse") return;
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.classList.add("cursor-grabbing");
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el || !isDragging.current) return;
    el.scrollLeft = dragStartScroll.current - (e.clientX - dragStartX.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    scrollRef.current?.classList.remove("cursor-grabbing");
    try {
      scrollRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer capture already released */
    }
  };

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
            One trip, one ridgeline — scroll along the trail through temples, meals, gardens and festivals.
          </p>
        </motion.div>
      </div>

      {/* Horizontal ridge track — full-bleed, drag or scroll to explore */}
      <div className="relative">
        {/* Edge fades so it reads as "more to scroll," not a cut-off image */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#F0EDE6] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#F0EDE6] to-transparent z-20" />

        <div
          ref={scrollRef}
          onScroll={updateProgress}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onMouseEnter={() => {
            hoverRef.current = true;
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
          }}
          onPointerDownCapture={() => {
            interactUntilRef.current = Number.POSITIVE_INFINITY;
          }}
          onPointerUpCapture={() => {
            interactUntilRef.current = Date.now() + 2500;
          }}
          className="overflow-x-auto overflow-y-hidden cursor-grab select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="relative" style={{ width, height: TRACK_HEIGHT }}>
            {/* SVG ridge line */}
            <svg
              className="absolute inset-0"
              width={width}
              height={TRACK_HEIGHT}
              viewBox={`0 0 ${width} ${TRACK_HEIGHT}`}
              fill="none"
            >
              <motion.path
                d={d}
                stroke="#B08D57"
                strokeWidth={2.5}
                strokeDasharray="2 12"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </svg>

            {journeyStops.map((stop, i) => {
              const point = points[i];
              const isPeak = i % 2 === 0; // photo sits above the line

              return (
                <div
                  key={stop.label}
                  className="absolute snap-center"
                  style={{ left: point.x, top: point.y, transform: "translate(-50%, -50%)" }}
                >
                  <div className={`flex flex-col items-center ${isPeak ? "flex-col-reverse" : ""}`}>
                    {/* Trail marker pin */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                      className="w-4 h-4 rounded-full bg-gold-500 ring-4 ring-[#F0EDE6] z-10"
                    />

                    {/* Connector stem */}
                    <div className="w-px h-8 bg-mountain-400/40" />

                    {/* Polaroid */}
                    <motion.div
                      initial={{ opacity: 0, y: isPeak ? 24 : -24 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.04 }}
                      className="bg-white p-3.5 pb-7 rounded-sm shadow-2xl shadow-mountain-900/20"
                      style={{ width: POLAROID_WIDTH }}
                    >
                      <div className={`relative w-full ${stop.aspect} overflow-hidden`}>
                        <Image
                          src={`/moments_captured/${stop.path}`}
                          alt={stop.label}
                          fill
                          sizes={`${POLAROID_WIDTH}px`}
                          quality={90}
                          draggable={false}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="pt-3 text-center">
                        <span className="font-body text-gold-400 text-[11px] tracking-[0.2em] uppercase">
                          Stop {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="font-display text-mountain-900 text-base font-bold leading-tight mt-1">
                          {stop.label}
                        </p>
                        <p className="font-body text-mountain-500 text-xs mt-0.5">{stop.labelZh}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Swipe hint — fades out once the user engages */}
        <motion.div
          animate={{ opacity: hasScrolled ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute bottom-4 right-6 md:right-12 z-20 flex items-center gap-2 text-mountain-500"
        >
          <span className="font-body text-xs tracking-wide">Drag to explore · 拖动探索</span>
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.div>
      </div>

      {/* Progress bar for the trail */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="h-px bg-mountain-300/50 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gold-500"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </section>
  );
}