import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { FileText, Presentation } from "lucide-react";
import Section from "./Section.jsx";
import Lightbox from "./Lightbox.jsx";
import { research } from "../data/research.js";
import { asset } from "../lib/asset.js";

export default function Research() {
  const [view, setView] = useState(null); // {items, index}
  const r = research[0];
  const photos = r.photos.map((src) => ({ type: "image", src, title: "Research presentation", caption: r.event }));
  const facts = [["Authors", r.authors.join(", ")], ["Event", r.event], ["Venue", r.venue], ["Date", r.date]].filter(([, v]) => v);

  return (
    <Section id="research" title="Research and Academic Achievements" intro="Paper presentations and academic recognition.">
      <article className="glass grid gap-6 overflow-hidden rounded-3xl md:grid-cols-[1.1fr_1fr]">
        <button type="button" onClick={() => setView({ items: photos, index: 0 })} aria-label="View presentation photo full size" className="block">
          <img src={asset(r.photos[0])} alt="Presenting the BatangHanda research on stage" loading="lazy" className="h-full w-full object-cover" />
        </button>
        <div className="p-6">
          <p className="font-display text-sm text-accent">Featured research</p>
          <h3 className="mt-2 font-display text-xl font-bold leading-snug">{r.title}</h3>
          {facts.length > 0 && <dl className="mt-4 space-y-1 text-sm">{facts.map(([k, v]) => <div key={k}><dt className="inline font-semibold">{k}: </dt><dd className="inline text-ink2">{v}</dd></div>)}</dl>}
          {r.abstract && <p className="mt-4 text-ink2">{r.abstract}</p>}
          <div className="mt-5 flex flex-wrap gap-2">
            {r.slidesPdf
              ? <a className="btn btn-primary" href={asset(r.slidesPdf)} target="_blank" rel="noopener noreferrer"><Presentation size={18} /> View Presentation</a>
              : <button type="button" className="btn btn-primary" onClick={() => setView({ items: photos, index: 0 })}><Presentation size={18} /> View Presentation</button>}
            {r.paperUrl && <a className="btn btn-ghost" href={r.paperUrl} target="_blank" rel="noopener noreferrer"><FileText size={18} /> Research paper</a>}
          </div>
        </div>
      </article>

      <AnimatePresence>{view && <Lightbox items={view.items} index={view.index} onClose={() => setView(null)} onIndex={(i) => setView({ ...view, index: i })} />}</AnimatePresence>
    </Section>
  );
}
