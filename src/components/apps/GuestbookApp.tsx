"use client";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  MessagesSquare,
  RefreshCw,
  LockKeyhole,
} from "lucide-react";
import { site, type AppId, type GuestNote } from "@/content/site";
export default function GuestbookApp({ open }: { open: (id: AppId) => void }) {
  const [notes, setNotes] = useState<GuestNote[]>([]);
  const [local, setLocal] = useState<GuestNote[]>([]);
  const [state, setState] = useState("loading");
  const [demo, setDemo] = useState(true);
  async function load() {
    setState("loading");
    try {
      const res = await fetch("/api/notes");
      if (!res.ok) throw Error();
      const data = await res.json();
      setNotes(data.notes);
      setDemo(data.mode === "local");
      setLocal(JSON.parse(localStorage.getItem("nocturne-notes") || "[]"));
      setState("ready");
    } catch {
      setState("error");
    }
  }
  useEffect(() => {
    let active = true;
    fetch("/api/notes")
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((data) => {
        if (active) {
          setNotes(data.notes);
          setDemo(data.mode === "local");
          setLocal(JSON.parse(localStorage.getItem("nocturne-notes") || "[]"));
          setState("ready");
        }
      })
      .catch(() => {
        if (active) setState("error");
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <div className="guestbook-app">
      <div className="guestbook-top">
        <MessagesSquare size={24} />
        <span>THE GUESTBOOK</span>
        <button onClick={() => open("notes")}>
          Leave a note <ArrowUpRight size={16} />
        </button>
      </div>
      <h2>
        Good people.
        <br />
        <em>Kind words.</em>
      </h2>
      <p className="guestbook-intro">
        Little traces of the people who stopped by.
        <br />
        Thanks for being part of this space.
      </p>
      {demo && (
        <div className="demo-label">
          LOCAL DEMONSTRATION · Seeded example messages
        </div>
      )}
      {state === "loading" ? (
        <p role="status">Opening the guestbook…</p>
      ) : state === "error" ? (
        <div role="alert">
          <p>The guestbook couldn’t load.</p>
          <button className="pill-button" onClick={load}>
            Try again <RefreshCw size={15} />
          </button>
        </div>
      ) : (
        <>
          <div className="guestbook-list">
            {notes.length ? (
              notes.map((n, i) => (
                <article key={n.id}>
                  <span className="quote-mark">“</span>
                  <blockquote>{n.message}</blockquote>
                  <footer>
                    <span className="avatar">
                      {n.name.slice(0, 1).toUpperCase()}
                    </span>
                    <strong>{n.name}</strong>
                    <time>
                      {new Date(n.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span className="note-number">0{i + 1}</span>
                  </footer>
                </article>
              ))
            ) : (
              <p>No approved notes yet. Be the first to leave one.</p>
            )}
          </div>
          {local.length > 0 && (
            <section className="local-notes">
              <h3>
                <LockKeyhole size={14} /> Your private demo notes
              </h3>
              <p>Stored on this browser. Never published.</p>
              {local.map((n) => (
                <article key={n.id}>
                  <p>{n.message}</p>
                  <small>— {n.name}</small>
                </article>
              ))}
            </section>
          )}
        </>
      )}
      <footer className="guestbook-bottom">
        HUMAN CONNECTIONS, ONE NOTE AT A TIME.<span>{site.name}</span>
      </footer>
    </div>
  );
}
