import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github, X } from "lucide-react";
import Section from "./Section.jsx";
import { projects } from "../data/projects.js";
import { asset } from "../lib/asset.js";

function Thumb({ p, className }) {
  return p.thumbnail ? <img src={asset(p.thumbnail)} alt={`${p.title} preview`} loading="lazy" className={className} />
    : <div className={`${className} grid place-items-center bg-bg2 font-display text-2xl text-lavender`}>{p.title}</div>;
}

function Details({ p, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const opener = document.activeElement;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector("button")?.focus();
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; opener?.focus?.(); };
  }, [onClose]);
  const link = "btn btn-ghost !min-h-10 text-sm";
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onClick={onClose}>
      <motion.div ref={ref} role="dialog" aria-modal="true" aria-label={p.title} initial={{ y: 24, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 12, opacity: 0 }}
        className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-bg2 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-bold">{p.title}</h3>
          <button type="button" onClick={onClose} aria-label="Close details" className="btn btn-ghost !min-h-10 !w-10 shrink-0 !p-0"><X size={18} /></button>
        </div>
        {p.video ? <video src={asset(p.video)} poster={asset(p.thumbnail)} controls playsInline preload="metadata" className="mx-auto mt-4 max-h-[60vh] w-auto max-w-full rounded-xl bg-black" />
          : p.thumbnail && <img src={asset(p.thumbnail)} alt={`${p.title} preview`} className="mt-4 w-full rounded-xl" />}
        <p className="mt-4 leading-relaxed text-ink2">{p.description}</p>
        {p.technologies.length > 0 && <p className="mt-4"><strong>Technologies: </strong><span className="text-ink2">{p.technologies.join(", ")}</span></p>}
        {p.role && <p className="mt-2"><strong>My role: </strong><span className="text-ink2">{p.role}</span></p>}
        <div className="mt-5 flex flex-wrap gap-2">
          {p.repoUrl && <a className={link} href={p.repoUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /> Repository</a>}
          {p.demoUrl && <a className={link} href={p.demoUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /> Live demo</a>}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [sel, setSel] = useState(null);
  return (
    <Section id="projects" title="Software Projects" intro="Applications I have built. Open a project to watch its preview.">
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.id} className={`glass overflow-hidden rounded-3xl transition-transform hover:-translate-y-1 ${p.featured ? "md:col-span-2" : ""}`}>
            <div className={p.featured ? "md:grid md:grid-cols-[1fr_1.2fr]" : ""}>
              <Thumb p={p} className="aspect-video w-full object-cover object-top" />
              <div className="p-6">
                {p.featured && <p className="mb-2 font-display text-sm text-accent">Featured capstone</p>}
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-ink2">{p.description}</p>
                {p.technologies.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">{p.technologies.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-lavender">{t}</li>)}</ul>}
                <button type="button" onClick={() => setSel(p)} className="btn btn-primary mt-5">View Details</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <AnimatePresence>{sel && <Details p={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </Section>
  );
}
