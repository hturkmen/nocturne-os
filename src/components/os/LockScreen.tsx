"use client";
import { motion } from "motion/react";
import { ArrowUp, LockKeyhole, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { site } from "@/content/site";
export default function LockScreen({
  now,
  unlock,
}: {
  now: Date | null;
  unlock: () => void;
}) {
  const start = useRef(0);
  return (
    <motion.div
      className="lock-screen"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={(e) => {
        start.current = e.clientY;
      }}
      onPointerUp={(e) => {
        if (start.current - e.clientY > 65) {
          // Let the browser finish touchend before removing its gesture target.
          window.setTimeout(unlock, e.pointerType === "touch" ? 40 : 0);
        }
      }}
    >
      <div className="lock-brand">
        <span className="brand-mark">n.</span>
        <span>
          {site.name}
          <small>A PERSONAL OPERATING SYSTEM</small>
        </span>
      </div>
      <div className="lock-clock">
        <LockKeyhole size={19} />
        <p>
          {now?.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          }) ?? "Welcome to your evening"}
        </p>
        <h1>
          {now?.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }) ?? "--:--"}
        </h1>
        <span>Make yourself at home.</span>
      </div>
      <button className="lock-notification" onClick={unlock}>
        <span className="notification-symbol">
          <ArrowUpRight />
        </span>
        <span>
          <small>
            NOCTURNE <em>now</em>
          </small>
          <strong>A different kind of personal space.</strong>
          <p>Work, collected moments, and a few open tabs.</p>
        </span>
      </button>
      <button
        className="unlock-button"
        onClick={unlock}
        aria-label="Unlock desktop"
      >
        <ArrowUp size={19} />
        <span>Swipe up to explore</span>
        <small>or click anywhere here</small>
      </button>
      <div className="lock-bottom">
        <span>DESIGN. CODE. AFTER DARK.</span>
        <span>EST. 2025</span>
      </div>
    </motion.div>
  );
}
