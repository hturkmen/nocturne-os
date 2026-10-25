"use client";
import { motion, useDragControls } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Minus, Maximize2, X } from "lucide-react";
import { site, type AppId } from "@/content/site";
export default function AppWindow({
  id,
  active,
  z,
  onFocus,
  onClose,
  onMinimize,
  children,
}: {
  id: AppId;
  active: boolean;
  z: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children: React.ReactNode;
}) {
  const controls = useDragControls();
  const ref = useRef<HTMLElement>(null);
  const [full, setFull] = useState(false);
  useEffect(() => {
    if (active) ref.current?.focus();
  }, [active]);
  return (
    <motion.section
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-label={site.apps.find((a) => a.id === id)?.label}
      onPointerDown={onFocus}
      className={`app-window ${active ? "focused" : ""} ${full ? "maximized" : ""}`}
      style={{ zIndex: z }}
      initial={{ opacity: 0, scale: 0.94, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 15 }}
      transition={{ type: "spring", stiffness: 350, damping: 32 }}
      drag={!full}
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragConstraints={{ left: -100, right: 100, top: -20, bottom: 100 }}
    >
      <header
        className="window-header"
        onPointerDown={(e) => {
          if (window.innerWidth > 700) controls.start(e);
        }}
        onDoubleClick={() => setFull(!full)}
      >
        <div className="traffic">
          <button aria-label="Close application" onClick={onClose}>
            <X size={10} />
          </button>
          <button aria-label="Minimize application" onClick={onMinimize}>
            <Minus size={10} />
          </button>
          <button aria-label="Toggle full size" onClick={() => setFull(!full)}>
            <Maximize2 size={9} />
          </button>
        </div>
        <span>{site.apps.find((a) => a.id === id)?.label}</span>
        <span className="window-edition">NOCTURNE OS</span>
      </header>
      <div className="window-body">{children}</div>
    </motion.section>
  );
}
