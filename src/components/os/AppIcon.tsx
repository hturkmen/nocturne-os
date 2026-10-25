import {
  Compass,
  NotebookPen,
  Ticket,
  MessagesSquare,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import type { AppId } from "@/content/site";
export default function AppIcon({ id }: { id: AppId | "mail" | "link" }) {
  return (
    <span className={`app-icon icon-${id}`} aria-hidden="true">
      {id === "photos" ? (
        <span className="flower">
          {Array.from({ length: 8 }, (_, i) => (
            <i
              key={i}
              style={{
                transform: `rotate(${i * 45}deg)`,
                background: `hsl(${i * 45} 85% 60%)`,
              }}
            />
          ))}
        </span>
      ) : id === "safari" ? (
        <Compass />
      ) : id === "notes" ? (
        <NotebookPen />
      ) : id === "guestbook" ? (
        <MessagesSquare />
      ) : id === "ticket" ? (
        <Ticket />
      ) : id === "mail" ? (
        <Mail />
      ) : (
        <ArrowUpRight />
      )}
    </span>
  );
}
