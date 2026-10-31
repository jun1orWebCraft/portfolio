import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { asset } from "../lib/asset.js";

// Viewer for images AND videos. items: [{type, src, thumbnail, title, caption}]
export default function Lightbox({ items, index, onClose, onIndex }) {
  const item = items[index];
  const box = useRef(null);
  const multi = items.length > 1;

  useEffect(() => {
    const opener = document.activeElement;
    document.body.style.overflow = "hidden";
    box.current?.querySelector("button")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (multi && e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
      if (multi && e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "Tab") { // keep focus inside the dialog
        const f = [...box.current.querySelectorAll("button, a[href], video")];
        const i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; opener?.focus?.(); };
  }, [index, items.length, multi, onClose, onIndex]);

  const nav = "btn btn-ghost !min-h-11 !w-11 !p-0 absolute top-1/2 -translate-y-1/2";
  return (
    <motion.div ref={box} role="dialog" aria-modal="true" aria-label={item.title}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4" onClick={onClose}>
      <button type="button" onClick={onClose} aria-label="Close viewer" className="btn btn-ghost absolute right-4 top-4 !min-h-11 !w-11 !p-0"><X size={20} /></button>
      {multi && <button type="button" aria-label="Previous" className={`${nav} left-3`} onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + items.length) % items.length); }}><ChevronLeft /></button>}
      {multi && <button type="button" aria-label="Next" className={`${nav} right-3`} onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % items.length); }}><ChevronRight /></button>}
      <figure className="max-h-full max-w-4xl text-center" onClick={(e) => e.stopPropagation()}>
        {item.type === "video" ? (
          <video key={item.src} src={asset(item.src)} poster={asset(item.thumbnail)} controls autoPlay playsInline preload="metadata" className="max-h-[75vh] w-full rounded-xl bg-black" />
        ) : (
          <img key={item.src} src={asset(item.src)} alt={item.title} className="mx-auto max-h-[75vh] rounded-xl object-contain" />
        )}
        <figcaption className="mt-3 text-sm text-white/85">
          <strong className="font-display text-base text-white">{item.title}</strong>
          {item.caption && <span className="mt-1 block">{item.caption}</span>}
        </figcaption>
      </figure>
    </motion.div>
  );
}
