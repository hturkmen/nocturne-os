"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  LockKeyhole,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import { site } from "@/content/site";
type Page = "start" | "work" | "about" | "contact";
export default function SafariApp() {
  const [history, setHistory] = useState<Page[]>(["start"]);
  const [position, setPosition] = useState(0);
  const page = history[position];
  function navigate(p: Page) {
    setHistory([...history.slice(0, position + 1), p]);
    setPosition(position + 1);
  }
  return (
    <div className="safari-app">
      <div className="browser-toolbar">
        <button
          aria-label="Back"
          disabled={position === 0}
          onClick={() => setPosition(position - 1)}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label="Forward"
          disabled={position === history.length - 1}
          onClick={() => setPosition(position + 1)}
        >
          <ChevronRight size={18} />
        </button>
        <span>
          <LockKeyhole size={11} /> nocturne.space / {page}
        </span>
        <a href={`mailto:${site.email}`} aria-label={`Email ${site.owner}`}>
          <ArrowUpRight size={17} />
        </a>
      </div>
      <nav className="browser-nav">
        <button className="browser-brand" onClick={() => navigate("start")}>
          n.
        </button>
        <div>
          {(["work", "about", "contact"] as Page[]).map((p) => (
            <button
              key={p}
              className={page === p ? "active" : ""}
              onClick={() => navigate(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <span>
          OPEN TO POSSIBILITY <i />
        </span>
      </nav>
      <div className="browser-page">
        {page === "start" ? (
          <>
            <div className="browser-hero">
              <small>DESIGNER. DEVELOPER. NIGHT PERSON.</small>
              <h2>
                Turning a feeling
                <br />
                into <em>something real.</em>
              </h2>
              <p>{site.bio}</p>
              <button className="pill-button" onClick={() => navigate("work")}>
                Explore selected work <ArrowUpRight size={15} />
              </button>
              <span className="hero-index">01 — AN INTRODUCTION</span>
            </div>
            <div className="browser-feature">
              <Image
                src="/media/live.jpg"
                alt="Light cutting through a live music venue"
                fill
                sizes="800px"
              />
              <span>
                Made of moments.
                <br />
                Built with intention.
              </span>
            </div>
          </>
        ) : page === "work" ? (
          <>
            <small className="page-eyebrow">A FEW RECENT THINGS</small>
            <h2 className="page-title">
              Selected work<span>2024—26</span>
            </h2>
            {site.projects.map((p, i) => (
              <a
                className="project-row"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                key={p.name}
              >
                <div className="project-image">
                  <Image src={p.image} alt={p.name} fill sizes="300px" />
                </div>
                <div>
                  <small>
                    0{i + 1} / {p.year}
                  </small>
                  <h3>
                    {p.name} <ArrowUpRight size={20} />
                  </h3>
                  <span>{p.type}</span>
                  <p>{p.description}</p>
                  <small>EXPLORE INSPIRATION ↗</small>
                </div>
              </a>
            ))}
          </>
        ) : page === "about" ? (
          <div className="about-page">
            <small>A PERSON BEHIND THE PIXELS</small>
            <h2>
              I’m {site.owner}.<br />
              Curiosity is the thread.
            </h2>
            <p>{site.bio}</p>
            <p>
              I work with people who care about how things feel, as much as how
              they work. My practice moves between visual identities,
              interactive websites, and experiments that don’t quite fit in a
              category.
            </p>
            <div className="about-details">
              <span>
                BASED IN<b>{site.location}</b>
              </span>
              <span>
                PRACTICE<b>Design & development</b>
              </span>
              <span>
                OFFLINE<b>Collecting records & light</b>
              </span>
            </div>
            <button className="pill-button" onClick={() => navigate("contact")}>
              Let’s make something <ArrowUpRight size={16} />
            </button>
          </div>
        ) : (
          <div className="contact-page">
            <Mail size={32} />
            <small>GOOD CONVERSATIONS START SOMEWHERE</small>
            <h2>
              Have a feeling
              <br />
              we’d work well?
            </h2>
            <a className="contact-email" href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight />
            </a>
            <p>
              Project, collaboration, or just a hello.
              <br />
              My inbox is a good place to start.
            </p>
            <div>
              {site.socials.map((s) => (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={s.label}
                >
                  {s.label}
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
            <small>
              Example contact details · replace in site configuration
            </small>
          </div>
        )}
        <footer className="browser-footer">
          <span>{site.name}®</span>
          <span>INDEPENDENT BY DESIGN.</span>
          <span>© 2026</span>
        </footer>
      </div>
    </div>
  );
}
