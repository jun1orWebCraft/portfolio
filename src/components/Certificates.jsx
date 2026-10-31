import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Award } from "lucide-react";
import Section from "./Section.jsx";
import Lightbox from "./Lightbox.jsx";
import { certificateGroups } from "../data/research.js";
import { asset } from "../lib/asset.js";

export default function Certificates() {
  const [view, setView] = useState(null); // { items, index }
  return (
    <Section id="certificates" title="Certificates" intro="Recognition for academics, research and leadership. Select a certificate to view it full size.">
      <div className="space-y-12">
        {certificateGroups.map((g) => {
          const shots = g.items.map((c) => ({ type: "image", src: c.image, title: c.title, caption: [c.issuer, c.date].filter(Boolean).join(", ") }));
          return (
            <div key={g.id}>
              <h3 className="font-display text-xl font-bold">{g.title}</h3>
              {g.items.length === 0 ? (
                <p className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-line p-5 text-ink2"><Award size={20} className="shrink-0 text-accent" /> Certificates for this section will be added soon.</p>
              ) : (
                <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {g.items.map((c, i) => (
                    <li key={c.id} className="glass overflow-hidden rounded-2xl transition-transform hover:-translate-y-1">
                      <button type="button" onClick={() => setView({ items: shots, index: i })} aria-label={`View ${c.title}`} className="block w-full text-left">
                        <img src={asset(c.image)} alt={`${c.title} certificate`} loading="lazy" className="aspect-[4/3] w-full object-cover object-top" />
                        <span className="block p-4"><span className="block font-display font-semibold">{c.title}</span><span className="text-sm text-ink2">{c.description}</span></span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      <AnimatePresence>{view && <Lightbox items={view.items} index={view.index} onClose={() => setView(null)} onIndex={(i) => setView({ ...view, index: i })} />}</AnimatePresence>
    </Section>
  );
}
