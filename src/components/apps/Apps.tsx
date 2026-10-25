"use client";
import dynamic from "next/dynamic";
import type { AppId } from "@/content/site";
const loading = () => (
  <div className="app-loading" role="status">
    Opening your space…
  </div>
);
const Photos = dynamic(() => import("./PhotosApp"), { loading });
const Safari = dynamic(() => import("./SafariApp"), { loading });
const Notes = dynamic(() => import("./NotesApp"), { loading });
const Guestbook = dynamic(() => import("./GuestbookApp"), { loading });
const Ticket = dynamic(() => import("./TicketApp"), { loading });
export default function Apps({
  id,
  open,
}: {
  id: AppId;
  open: (id: AppId) => void;
}) {
  switch (id) {
    case "photos":
      return <Photos />;
    case "safari":
      return <Safari />;
    case "notes":
      return <Notes open={open} />;
    case "guestbook":
      return <Guestbook open={open} />;
    case "ticket":
      return <Ticket />;
  }
}
