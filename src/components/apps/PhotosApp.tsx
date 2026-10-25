"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Grid2X2,
  Image as ImageIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
export default function PhotosApp() {
  const [index, setIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const start = useRef(0);
  const photo = index === null ? null : site.gallery[index];
  const change = (d: number) =>
    setIndex((i) =>
      i === null ? null : (i + d + site.gallery.length) % site.gallery.length,
    );
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (index === null) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        change(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        change(-1);
      }
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        setIndex(null);
      }
    }
    window.addEventListener("keydown", key, true);
    return () => window.removeEventListener("keydown", key, true);
  }, [index]);
  return (
    <div className="photos-app">
      <div className="app-toolbar">
        <span>
          <ImageIcon size={17} /> Library
        </span>
        <span className="segmented">
          {["All", "Live", "Still"].map((f) => (
            <button
              key={f}
              className={f === filter ? "selected" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </span>
      </div>
      <div className="gallery-heading">
        <div>
          <small>COLLECTED MOMENTS</small>
          <h2>Life, in frames.</h2>
        </div>
        <span>
          {
            site.gallery.filter(
              (p) => filter === "All" || p.category === filter,
            ).length
          }{" "}
          photographs
        </span>
      </div>
      <div className="photo-grid">
        {site.gallery.map(
          (p, i) =>
            (filter === "All" || p.category === filter) && (
              <button
                key={p.title}
                onClick={() => setIndex(i)}
                aria-label={`View ${p.title}`}
              >
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  sizes="(max-width:700px) 50vw, 400px"
                />
                <span>
                  <strong>{p.title}</strong>
                  <small>
                    {p.category} / {p.year}
                  </small>
                </span>
              </button>
            ),
        )}
      </div>
      <footer className="gallery-footer">
        <Grid2X2 size={13} /> A visual journal. Always collecting.
      </footer>
      <AnimatePresence>
        {photo && (
          <motion.div
            role="dialog"
            aria-label="Photo viewer"
            className="photo-viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPointerDown={(e) => {
              start.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (Math.abs(e.clientX - start.current) > 60)
                change(e.clientX < start.current ? 1 : -1);
            }}
          >
            <header>
              <span>
                {(index ?? 0) + 1} / {site.gallery.length}
              </span>
              <button
                aria-label="Close photo"
                onClick={() => setIndex(null)}
                autoFocus
              >
                <X />
              </button>
            </header>
            <div className="viewer-image">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <footer>
              <button aria-label="Previous photo" onClick={() => change(-1)}>
                <ArrowLeft />
              </button>
              <div>
                <h3>{photo.title}</h3>
                <p>{photo.description}</p>
              </div>
              <button aria-label="Next photo" onClick={() => change(1)}>
                <ArrowRight />
              </button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
