"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, NotebookPen, Send, Check, Folder } from "lucide-react";
import { site, type AppId } from "@/content/site";
export default function NotesApp({ open }: { open: (id: AppId) => void }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [mode, setMode] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          message,
          website: new FormData(e.currentTarget).get("website"),
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Could not save your note. Please try again.",
        );
      if (result.mode === "local") {
        const existing = JSON.parse(
          localStorage.getItem("nocturne-notes") || "[]",
        );
        localStorage.setItem(
          "nocturne-notes",
          JSON.stringify([
            {
              id: crypto.randomUUID(),
              name: name || "Anonymous",
              message,
              created_at: new Date().toISOString(),
            },
            ...existing,
          ]),
        );
      }
      setMode(result.mode);
      setStatus("success");
      setMessage("");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Could not save your note.",
      );
      setStatus("error");
    }
  }
  return (
    <div className="notes-app">
      <aside>
        <NotebookPen size={24} />
        <h3>Notes</h3>
        <span>YOUR LITTLE PAPER TRAIL</span>
        <button className="selected">
          <Folder size={16} /> A note to {site.owner.split(" ")[0]}
        </button>
        <button onClick={() => open("guestbook")}>
          <Folder size={16} /> Guestbook <ArrowUpRight size={13} />
        </button>
        <div>
          Some things are
          <br />
          better written down.
        </div>
      </aside>
      <div className="note-paper">
        <div className="note-date">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          <span>PERSONAL NOTE</span>
        </div>
        {status === "success" ? (
          <div className="note-success" role="status">
            <Check />
            <h2>
              A little piece of you,
              <br />
              left behind.
            </h2>
            <p>
              {mode === "local"
                ? "Saved on this browser only. This demo note is private and will not appear in the public guestbook."
                : "Your note was saved for review. It will appear publicly only after approval."}
            </p>
            <button className="note-submit" onClick={() => setStatus("idle")}>
              Write another note <NotebookPen size={16} />
            </button>
            <button className="text-link" onClick={() => open("guestbook")}>
              Read the guestbook <ArrowUpRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <h2>Hey, you made it.</h2>
            <p>
              Thanks for spending a little time in my corner of the internet.
              Tell me what brought you here, what caught your eye, or just say
              hello.
            </p>
            <form onSubmit={submit}>
              <label htmlFor="note-name">
                YOUR NAME <span>optional</span>
              </label>
              <input
                id="note-name"
                maxLength={40}
                placeholder="A name to remember you by"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="note-message">LEAVE A LITTLE SOMETHING</label>
              <textarea
                id="note-message"
                required
                minLength={5}
                maxLength={500}
                placeholder="I was here, and…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="note-count">{message.length} / 500</div>
              <div className="honeypot" aria-hidden="true">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              {status === "error" && (
                <p className="form-error" role="alert">
                  {feedback}
                </p>
              )}
              <button className="note-submit" disabled={status === "sending"}>
                {status === "sending" ? "Saving your note…" : "Leave your note"}{" "}
                <Send size={15} />
              </button>
              <p className="note-disclaimer">
                No account. No noise. Public notes are reviewed first.
                <br />
                Without a database, notes are saved privately in this browser.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
