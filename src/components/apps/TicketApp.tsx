"use client";
import { useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Ticket, Check } from "lucide-react";
import Image from "next/image";
import { site } from "@/content/site";
export default function TicketApp() {
  const [saved, setSaved] = useState(false);
  function download() {
    const t = site.ticket;
    const file = new Blob(
      [
        `NOCTURNE — ${t.title}\n${t.subtitle}\n${t.date} · ${t.time}\n${t.venue}, ${t.city}\n\nDESIGN CONCEPT — NOT A VALID ADMISSION TICKET. No booking or payment has been made.`,
      ],
      { type: "text/plain" },
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "after-hours-concept.txt";
    a.click();
    URL.revokeObjectURL(a.href);
    setSaved(true);
  }
  return (
    <div className="ticket-app">
      <div className="ticket-intro">
        <span>
          <Ticket size={17} /> NOCTURNE PRESENTS
        </span>
        <span>EVENT IDENTITY / DIGITAL CONCEPT</span>
      </div>
      <div className="event-ticket">
        <div className="ticket-art">
          <Image
            src="/media/live.jpg"
            alt="Blue stage lights in a dark listening room"
            fill
            sizes="700px"
          />
          <div className="ticket-art-overlay" />
          <span className="ticket-volume">
            {site.ticket.edition}
            <span>EST. 2025</span>
          </span>
          <h2>
            {site.ticket.title.split(" ")[0]}
            <br />
            <em>{site.ticket.title.split(" ").slice(1).join(" ")}</em>
            <span>®</span>
          </h2>
          <p>{site.ticket.subtitle}</p>
          <span className="ticket-star">✳</span>
        </div>
        <div className="ticket-stub">
          <div>
            <small>WHEN</small>
            <strong>{site.ticket.date}</strong>
            <span>{site.ticket.time}</span>
          </div>
          <div>
            <small>WHERE</small>
            <strong>{site.ticket.venue}</strong>
            <span>{site.ticket.city}</span>
          </div>
          <div className="barcode" aria-hidden="true" />
          <small className="ticket-code">NCT—004—2026</small>
        </div>
      </div>
      <div className="ticket-description">
        <div>
          <small>THE IDEA</small>
          <p>
            No rush. No algorithm.
            <br />
            Just a room, a good system, and a shared frequency.
          </p>
        </div>
        <button className="pill-button" onClick={download}>
          {saved ? "Saved to your device" : "Keep the concept"}{" "}
          {saved ? <Check size={16} /> : <ArrowDownToLine size={16} />}
        </button>
      </div>
      <p className="ticket-disclaimer" role="status">
        {saved ? "Concept file downloaded. " : ""}Showcase concept only. This is
        not an admission ticket. No booking or payment.
      </p>
      <a
        href={`mailto:${site.email}?subject=After%20Hours%20collaboration`}
        className="text-link"
      >
        Interested in the project? Let’s talk <ArrowUpRight size={15} />
      </a>
    </div>
  );
}
