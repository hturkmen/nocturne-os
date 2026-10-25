"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig } from "motion/react";
import {
  ArrowUpRight,
  BatteryFull,
  LockKeyhole,
  Wifi,
  Volume2,
  Command,
} from "lucide-react";
import { site, type AppId } from "@/content/site";
import LockScreen from "./LockScreen";
import AppIcon from "./AppIcon";
import AppWindow from "./AppWindow";
import Apps from "../apps/Apps";
type OSState = {
  open: AppId[];
  minimized: AppId[];
};
type Action = {
  type: "open" | "close" | "minimize";
  id: AppId;
};
function reducer(s: OSState, a: Action): OSState {
  if (a.type === "close")
    return {
      open: s.open.filter((x) => x !== a.id),
      minimized: s.minimized.filter((x) => x !== a.id),
    };
  if (a.type === "minimize") return { ...s, minimized: [...s.minimized, a.id] };
  return {
    open: [...s.open.filter((x) => x !== a.id), a.id],
    minimized: s.minimized.filter((x) => x !== a.id),
  };
}
export default function Desktop() {
  const [locked, setLocked] = useState(true);
  const [now, setNow] = useState<Date | null>(null);
  const [state, dispatch] = useReducer(reducer, { open: [], minimized: [] });
  const [help, setHelp] = useState(false);
  const launcher = useRef<HTMLButtonElement | null>(null);
  const visible = state.open.filter((id) => !state.minimized.includes(id));
  const active = visible.at(-1);
  const open = (id: AppId) => dispatch({ type: "open", id });
  const close = (id: AppId) => {
    dispatch({ type: "close", id });
    requestAnimationFrame(() =>
      document
        .querySelector<HTMLButtonElement>(`[data-launcher="${id}"]`)
        ?.focus(),
    );
  };
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (help) setHelp(false);
        else if (active) close(active);
      }
      if (locked && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        setLocked(false);
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [locked, active, help]);
  return (
    <MotionConfig reducedMotion="user">
      <main className="os">
        <Image
          src={site.wallpaper}
          alt="A quiet city street after dark"
          fill
          priority
          sizes="100vw"
          className="wallpaper"
        />
        <div className="wallpaper-shade" />
        <div inert={locked} className={`desktop ${locked ? "is-locked" : ""}`}>
          <header className="status-bar">
            <button
              className="status-brand"
              onClick={() => {
                visible.forEach((id) => dispatch({ type: "minimize", id }));
              }}
              aria-label="Show desktop"
            >
              n.
            </button>
            <strong>
              {active
                ? site.apps.find((a) => a.id === active)?.label
                : "Finder"}
            </strong>
            <button className="status-extra" onClick={() => open("safari")}>
              Explore
            </button>
            <button className="status-extra" onClick={() => setHelp(!help)}>
              Help
            </button>
            <div className="status-right">
              <span className="status-extra">{site.location}</span>
              <Wifi size={15} />
              <BatteryFull size={19} />
              <time>
                {now?.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}{" "}
                <span>
                  {now?.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </time>
              <button aria-label="Lock screen" onClick={() => setLocked(true)}>
                <LockKeyhole size={14} />
              </button>
            </div>
          </header>
          <div className="desktop-heading">
            <span className="eyebrow">
              THE PERSONAL SPACE OF {site.owner.toUpperCase()}
            </span>
            <h1>
              Good things happen
              <br />
              <em>after dark.</em>
            </h1>
            <p>
              A few things I make. A few things I keep.
              <br />A little window into my world.
            </p>
            <button className="text-link" onClick={() => open("safari")}>
              Take a look around <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="desktop-apps">
            {site.apps.map((app) => (
              <button
                key={app.id}
                onClick={() => open(app.id)}
                onPointerUp={(event) => {
                  if (event.pointerType === "touch") open(app.id);
                }}
                className="desktop-app"
                aria-label={`Open ${app.label}`}
              >
                <AppIcon id={app.id} />
                <span>{app.label}</span>
              </button>
            ))}
          </div>
          <button className="desktop-note" onClick={() => open("notes")}>
            <span className="tiny-label">A NOTE BEFORE YOU GO</span>
            <p>
              The internet feels better
              <br />
              when you leave a little
              <br />
              of yourself behind.
            </p>
            <span>
              Leave me a note <ArrowUpRight size={15} />
            </span>
          </button>
          <div className="desktop-meta">
            <span>
              <i /> AVAILABLE FOR SELECT COLLABORATIONS
            </span>
            <span className="desktop-meta-right">
              INDEPENDENT BY DESIGN <span>© 2026</span>
            </span>
          </div>
          <nav className="dock" aria-label="Application dock">
            {site.apps.map((app) => (
              <button
                key={app.id}
                ref={app.id === "safari" ? launcher : undefined}
                data-launcher={app.id}
                aria-label={app.label}
                title={app.label}
                onClick={() => open(app.id)}
                onPointerUp={(event) => {
                  if (event.pointerType === "touch") open(app.id);
                }}
                className={state.open.includes(app.id) ? "running" : ""}
              >
                <AppIcon id={app.id} />
                <span className="dock-tooltip">{app.label}</span>
              </button>
            ))}
            <span className="dock-divider" />
            <a href={`mailto:${site.email}`} aria-label="Email">
              <AppIcon id="mail" />
              <span className="dock-tooltip">Say hello</span>
            </a>
            <button
              aria-label="Keyboard help"
              onClick={() => setHelp(!help)}
              className="dock-help"
            >
              <Command size={25} />
              <span className="dock-tooltip">Quick guide</span>
            </button>
          </nav>
          <AnimatePresence>
            {visible.map((id, i) => (
              <AppWindow
                key={id}
                id={id}
                active={active === id}
                z={20 + i}
                onFocus={() => {
                  if (active !== id) open(id);
                }}
                onClose={() => close(id)}
                onMinimize={() => dispatch({ type: "minimize", id })}
              >
                <Apps id={id} open={open} />
              </AppWindow>
            ))}
          </AnimatePresence>
          {help && (
            <div className="help-panel" role="dialog" aria-label="Quick guide">
              <button aria-label="Close guide" onClick={() => setHelp(false)}>
                ×
              </button>
              <Command />
              <h2>A place to explore.</h2>
              <p>
                Open an app from the dock. Drag its title bar to move it. The
                yellow control tucks it away.
              </p>
              <p>
                <kbd>Esc</kbd> closes the active app. Arrow keys move between
                photos. Use the lock in the menu bar to begin again.
              </p>
              <span>
                <Volume2 size={15} /> No autoplay. Enjoy the quiet.
              </span>
            </div>
          )}
        </div>
        <AnimatePresence>
          {locked && <LockScreen now={now} unlock={() => setLocked(false)} />}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
