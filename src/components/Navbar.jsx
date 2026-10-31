import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "../data/profile.js";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Highlight the link of the section currently in view.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach(({ id }) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const link = (l, cls) => (
    <a
      key={l.id}
      href={`#${l.id}`}
      onClick={() => setOpen(false)}
      aria-current={active === l.id ? "page" : undefined}
      className={`${cls} transition-colors ${active === l.id ? "text-highlight" : "text-ink2 hover:text-ink"}`}
    >
      {l.label}
    </a>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled || open ? "glass" : ""}`}>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#home" className="font-display text-lg font-bold text-gradient">{profile.brand}</a>
        <div className="hidden items-center gap-5 text-sm font-medium xl:flex">
          {navLinks.map((l) => link(l, "py-2"))}
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="btn btn-ghost !min-h-10 !w-10 !p-0"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden xl:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-5">
              {navLinks.map((l) => link(l, "rounded-lg px-3 py-3 text-base font-medium"))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
