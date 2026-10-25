export const site = {
  name: "NOCTURNE",
  owner: "Alex Morgan",
  role: "Independent designer & creative developer",
  location: "London, UK",
  email: "hello@example.com",
  bio: "I build digital things with a human pulse. Somewhere between design, code, and the energy of a room after dark.",
  wallpaper: "/media/wallpaper.jpg",
  socials: [
    { label: "GitHub", url: "https://github.com" },
    { label: "Instagram", url: "https://instagram.com" },
  ],
  apps: [
    { id: "photos", label: "Photos", sub: "A few collected moments" },
    { id: "safari", label: "Safari", sub: "Work, words & a little about me" },
    { id: "notes", label: "Notes", sub: "Leave something behind" },
    { id: "guestbook", label: "Guestbook", sub: "Good people, kind words" },
    { id: "ticket", label: "After Hours", sub: "An independent event concept" },
  ],
  gallery: [
    {
      src: "/media/live.jpg",
      title: "Electric atmosphere",
      description: "The moment before the room becomes one.",
      category: "Live",
      year: "2025",
    },
    {
      src: "/media/crowd.jpg",
      title: "Lost in the sound",
      description: "A thousand strangers. The same frequency.",
      category: "Live",
      year: "2025",
    },
    {
      src: "/media/stage.jpg",
      title: "Last light",
      description: "An empty stage holds its own kind of anticipation.",
      category: "Live",
      year: "2024",
    },
    {
      src: "/media/wallpaper.jpg",
      title: "Into the quiet",
      description: "A reminder to look up, every once in a while.",
      category: "Still",
      year: "2024",
    },
  ],
  projects: [
    {
      name: "After Hours",
      type: "Identity / Digital experience",
      year: "2025",
      description:
        "An independent listening-room concept. A visual identity for the hours that belong to us.",
      image: "/media/live.jpg",
      url: "https://www.are.na/",
    },
    {
      name: "Collected Light",
      type: "Photography / Art direction",
      year: "2025",
      description:
        "A study of shared spaces, fleeting light, and everything that happens in between.",
      image: "/media/crowd.jpg",
      url: "https://unsplash.com",
    },
    {
      name: "Quiet Objects",
      type: "Interaction / Creative development",
      year: "2024",
      description:
        "Small experiments in making the web feel a little more tactile.",
      image: "/media/stage.jpg",
      url: "https://threejs.org",
    },
  ],
  testimonials: [
    {
      id: "seed-1",
      name: "Jamie R.",
      message:
        "A little corner of the internet that feels like a place. Stayed longer than I planned.",
      created_at: "2026-10-20T12:00:00Z",
    },
    {
      id: "seed-2",
      name: "Sam K.",
      message:
        "The kind of thoughtful details you only notice when someone really cares.",
      created_at: "2026-10-18T12:00:00Z",
    },
  ],
  ticket: {
    title: "AFTER HOURS",
    subtitle: "A listening room for restless minds.",
    date: "FRI, NOV 20",
    time: "21:00 — LATE",
    venue: "THE LISTENING ROOM",
    city: "LONDON",
    edition: "VOL. 004",
  },
} as const;
export type AppId = (typeof site.apps)[number]["id"];
export interface GuestNote {
  id: string;
  name: string;
  message: string;
  created_at: string;
}
