import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Section from "./Section.jsx";
import Lightbox from "./Lightbox.jsx";
import { leadership } from "../data/leadership.js";
import { asset } from "../lib/asset.js";

export default function Leadership() {
  const [openId, setOpenId] = useState(null);
  const [view, setView] = useState(null);
  const list = [...leadership].reverse(); // newest first
  const shots = view ? view.media.map((src) => ({ type: "image", src, title: `${view.position} (${view.year})` })) : [];

  return (
    <Section id="leadership" title="Student Leadership" intro="My roles in the College of Information Technology Organization (CITO).">
      <ol className="relative ml-3 border-l border-line">
        {list.map((l) => {
          const open = openId === l.id;
          return (
            <li key={l.id} className="mb-8 ml-6">
              <span aria-hidden="true" className="absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_12px_var(--glow)]" />
              <div className="glass rounded-2xl">
                <button type="button" aria-expanded={open} onClick={() => setOpenId(open ? null : l.id)} className="flex w-full items-center justify-between gap-3 p-5 text-left">
                  <span><span className="block font-display text-lg font-bold">{l.position}</span><span className="text-sm text-ink2">{l.year}</span></span>
                  <ChevronDown className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="grid gap-4 px-5 pb-5 sm:grid-cols-[180px_1fr]">
                        {l.media[0] && (
                          <button type="button" onClick={() => setView(l)} aria-label={`View ${l.position} photo full size`}>
                            <img src={asset(l.media[0])} alt={`${l.position} announcement`} loading="lazy" className="w-full rounded-xl" />
                          </button>
                        )}
                        <div className="text-ink2">
                          <p className="text-sm">{l.organization}</p>
                          {l.description && <p className="mt-2 leading-relaxed">{l.description}</p>}
                          {l.achievements.length > 0 && <ul className="mt-2 list-disc pl-5">{l.achievements.map((a) => <li key={a}>{a}</li>)}</ul>}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>
      <AnimatePresence>{view && <Lightbox items={shots} index={0} onClose={() => setView(null)} onIndex={() => {}} />}</AnimatePresence>
    </Section>
  );
}
