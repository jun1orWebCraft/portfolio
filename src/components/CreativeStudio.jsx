import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";
import Section from "./Section.jsx";
import Lightbox from "./Lightbox.jsx";
import { mediaItems } from "../data/media.js";
import { asset } from "../lib/asset.js";

const filters = [
  { id: "all", label: "All Media" }, { id: "video", label: "Video Editing" }, { id: "photo", label: "Photo Editing" },
  { id: "graphic", label: "Graphic Design" }, { id: "event", label: "Event Multimedia" },
];

export default function CreativeStudio() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const items = mediaItems.filter((m) => filter === "all" || m.category === filter)
    .map((m) => ({ ...m, caption: [m.description, m.software.length ? `Software: ${m.software.join(", ")}` : ""].filter(Boolean).join(" ") }));

  return (
    <Section id="studio" title="Creative Studio" intro="Edited videos, ads and graphic designs. Select any piece to view it full size.">
      <div role="group" aria-label="Filter media" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}
            className={`btn !min-h-10 !py-2 text-sm ${filter === f.id ? "btn-primary" : "btn-ghost"}`}>{f.label}</button>
        ))}
      </div>
      <motion.div key={filter} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8">
        {items.length === 0 ? <p className="text-ink2">Nothing in this category yet.</p> : (
          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {items.map((m, i) => (
              <li key={m.id} className="mb-4 break-inside-avoid">
                <button type="button" onClick={() => setOpen(i)} aria-label={`${m.type === "video" ? "Play" : "View"} ${m.title}`}
                  className="group glass relative block w-full overflow-hidden rounded-2xl text-left transition-transform hover:-translate-y-1">
                  <img src={asset(m.thumbnail)} alt={m.title} loading="lazy" className="w-full" />
                  {m.type === "video" && <span className="absolute inset-0 grid place-items-center bg-black/25"><span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-lg"><Play size={22} /></span></span>}
                  <span className="block p-4"><span className="block font-display font-semibold">{m.title}</span></span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
      <AnimatePresence>{open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}</AnimatePresence>
    </Section>
  );
}
