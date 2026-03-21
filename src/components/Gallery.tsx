"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Image manifest ───────────────────────────────────────────────────────────
const ALL_IMAGES: string[] = [
  "/gallery/1-.JPG",
  "/gallery/2-.JPG",
  "/gallery/3-.JPG",
  "/gallery/4-.JPG",
  "/gallery/5-.JPG",
  "/gallery/6-.JPG",
  "/gallery/7-.JPG",
  "/gallery/8-.JPG",
  "/gallery/9-Soren Mendoza.JPG",
  "/gallery/10-.JPG",
  "/gallery/11-.JPG",
  "/gallery/12-.JPG",
  "/gallery/13-.JPG",
  "/gallery/14-Ronnie Jariyawiriya.JPG",
  "/gallery/15-.JPG",
  "/gallery/16-.JPG",
  "/gallery/17-.JPG",
  "/gallery/18-.JPG",
  "/gallery/19-.JPG",
  "/gallery/20-.JPG",
  "/gallery/21-.JPG",
  "/gallery/22-.JPG",
  "/gallery/23-.JPG",
  "/gallery/24-.JPG",
  "/gallery/25-.JPG",
  "/gallery/26-.JPG",
  "/gallery/27-.JPG",
  "/gallery/28-.JPG",
  "/gallery/29-.JPG",
  "/gallery/30-.JPG",
  "/gallery/31-.JPG",
  "/gallery/32-.JPG",
  "/gallery/33-.JPG",
  "/gallery/34-.JPG",
  "/gallery/35-.JPG",
  "/gallery/36-.JPG",
  "/gallery/37-.JPG",
  "/gallery/38-.JPG",
  "/gallery/39-.JPG",
  "/gallery/40-.JPG",
  "/gallery/41-.JPG",
  "/gallery/42-.JPG",
  "/gallery/43-.JPG",
  "/gallery/44-.JPG",
  "/gallery/45-.JPG",
  "/gallery/46-.JPG",
  "/gallery/47-.JPG",
  "/gallery/48-.JPG",
  "/gallery/49-.JPG",
  "/gallery/50-.JPG",
  "/gallery/51-.JPG",
  "/gallery/52-.JPG",
  "/gallery/53-.JPG",
  "/gallery/54-.JPG",
  "/gallery/55-.JPG",
  "/gallery/56-.JPG",
  "/gallery/57-.JPG",
  "/gallery/58-.JPG",
  "/gallery/59-.JPG",
  "/gallery/60-.JPG",
  "/gallery/61-.JPG",
  "/gallery/62-.JPG",
  "/gallery/63-.JPG",
  "/gallery/64-.JPG",
  "/gallery/65-.JPG",
  "/gallery/66-Ronnie Jariyawiriya.JPG",
  "/gallery/67-Ronnie Jariyawiriya.JPG",
  "/gallery/68-Ronnie Jariyawiriya.JPG",
  "/gallery/69-Ronnie Jariyawiriya.JPG",
  "/gallery/70-Ronnie Jariyawiriya.JPG",
  "/gallery/71-.JPG",
  "/gallery/72-.JPG",
  "/gallery/73-.JPG",
  "/gallery/74-.JPG",
  "/gallery/75-.JPG",
  "/gallery/76-.JPG",
  "/gallery/77-.JPG",
  "/gallery/78-.JPG",
  "/gallery/79-.JPG",
  "/gallery/80-.JPG",
  "/gallery/81-.JPG",
  "/gallery/82-.JPG",
  "/gallery/83-.JPG",
  "/gallery/84-.JPG",
  "/gallery/85-.JPG",
  "/gallery/86-.JPG",
  "/gallery/87-.JPG",
  "/gallery/88-.JPG",
  "/gallery/89-.JPG",
  "/gallery/90-.JPG",
  "/gallery/91-.JPG",
  "/gallery/92-.JPG",
  "/gallery/93-.JPG",
  "/gallery/94-.JPG",
  "/gallery/95-.JPG",
  "/gallery/96-.JPG",
  "/gallery/97-.JPG",
  "/gallery/98-Soren Mendoza, Bill Spector, & Ronnie Jariyawiriya.JPG",
  "/gallery/99-Soren Mendoza, Bill Spector, & Ronnie Jariyawiriya.JPG",
  "/gallery/100-Soren Mendoza, Bill Spector, & Ronnie Jariyawiriya.JPG",
  "/gallery/101-Soren Mendoza, Bill Spector, & Ronnie Jariyawiriya.JPG",
  "/gallery/102-Soren Mendoza & Ronnie Jariyawiriya.JPG",
  "/gallery/103-Soren Mendoza & Ronnie Jariyawiriya.JPG",
  "/gallery/104-Ronnie Jariyawiriya.JPG",
  "/gallery/105-Soren Mendoza.JPG",
  "/gallery/106-.JPG",
  "/gallery/107-.JPG",
  "/gallery/108-.JPG",
  "/gallery/109-.JPG",
  "/gallery/110-.JPG",
  "/gallery/111-.JPG",
];

const INITIAL_COUNT = 20;
const LOAD_MORE_COUNT = 12;

// ─── Animation variants ───────────────────────────────────────────────────────
const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const modalImageVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.22 },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [prevVisibleCount, setPrevVisibleCount] = useState(INITIAL_COUNT);
  const [imageLoading, setImageLoading] = useState(true);

  const visibleImages = ALL_IMAGES.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_IMAGES.length;

  // ── Load more ──────────────────────────────────────────────────────────────
  const handleLoadMore = () => {
    setPrevVisibleCount(visibleCount);
    setVisibleCount((c) => Math.min(c + LOAD_MORE_COUNT, ALL_IMAGES.length));
  };

  // ── Modal navigation ───────────────────────────────────────────────────────
  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((i) => (i! > 0 ? i! - 1 : visibleImages.length - 1));
  }, [selectedIndex, visibleImages.length]);

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((i) => (i! < visibleImages.length - 1 ? i! + 1 : 0));
  }, [selectedIndex, visibleImages.length]);

  const closeModal = useCallback(() => setSelectedIndex(null), []);

  // ── Keyboard interactions ──────────────────────────────────────────────────
  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, showPrev, showNext, closeModal]);

  // ── Lock body scroll when modal open ──────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex !== null) setImageLoading(true);
  }, [selectedIndex]);

  return (
    <section id="gallery" className="py-32 md:py-40 px-4 sm:px-6 bg-[#080808] relative">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.04)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-inter)]">
            Our Moments
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-light text-white/90">
            Gallery
          </h2>
          {/* Gold divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </motion.div>

        {/* ── Grid ── */}
        {/*
          Mobile fix: use explicit padding-bottom trick for aspect-square so iOS/Android
          browsers correctly size the fill container. Each cell is position:relative with
          a fixed 100% padding-bottom enforcing the 1:1 ratio.
        */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {visibleImages.map((src, idx) => {
            const isNew = idx >= prevVisibleCount;
            return (
              <motion.div
                key={src}
                variants={isNew ? gridItemVariants : undefined}
                initial={isNew ? "hidden" : false}
                animate={isNew ? "visible" : false}
                className="group relative cursor-pointer rounded-xl overflow-hidden bg-[#111]"
                style={{ paddingBottom: "100%", height: 0, position: "relative" }}
                onClick={() => setSelectedIndex(idx)}
              >
                {/* Inner wrapper to host next/image fill */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <Image
                    src={src}
                    alt={`Gallery image ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) calc(50vw - 10px), (max-width: 1024px) calc(33vw - 12px), calc(25vw - 14px)"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading={idx < INITIAL_COUNT ? "eager" : "lazy"}
                  />
                  {/* Hover shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Gold border flash on hover */}
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-[#D4AF37]/0 group-hover:ring-[#D4AF37]/35 transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Load More Button ── */}
        {hasMore && (
          <motion.div
            className="flex justify-center mt-14"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={handleLoadMore}
              className="group relative px-12 py-4 text-sm tracking-widest uppercase font-medium font-[family-name:var(--font-inter)] text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-300 overflow-hidden"
            >
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              Load More
              <span className="ml-2 text-white/30 text-xs">
                ({Math.min(LOAD_MORE_COUNT, ALL_IMAGES.length - visibleCount)} more)
              </span>
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Fullscreen Modal ── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
          >
            <div
              className="relative flex items-center justify-center w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.6)_100%)]" />

              {/* Close button */}
              <button
                onClick={closeModal}
                aria-label="Close gallery"
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center text-white/40 hover:text-[#D4AF37] transition-colors duration-200 bg-black/40 rounded-full border border-white/10 hover:border-[#D4AF37]/40"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Counter */}
              <div className="absolute top-4 left-4 z-20 text-white/25 text-xs tracking-[0.25em] uppercase font-[family-name:var(--font-inter)]">
                {selectedIndex + 1} / {visibleImages.length}
              </div>

              {/* Prev Arrow */}
              <button
                onClick={showPrev}
                aria-label="Previous image"
                className="absolute left-3 sm:left-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Image + Skeleton */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  variants={modalImageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative flex items-center justify-center"
                  style={{ maxWidth: "90vw", maxHeight: "85vh", width: "90vw", height: "85vh" }}
                >
                  {/* Skeleton shimmer — visible until image fires onLoad */}
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="relative overflow-hidden rounded-lg bg-white/[0.03]"
                        style={{ width: "70%", height: "70%" }}
                      >
                        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#D4AF37]/20 rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#D4AF37]/20 rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#D4AF37]/20 rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#D4AF37]/20 rounded-br-lg" />
                      </div>
                    </div>
                  )}

                  <Image
                    src={visibleImages[selectedIndex]}
                    alt={`Gallery image ${selectedIndex + 1}`}
                    fill
                    sizes="90vw"
                    className={`object-contain transition-opacity duration-500 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                    priority
                    onLoad={() => setTimeout(() => setImageLoading(false), 150)}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next Arrow */}
              <button
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-3 sm:right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
