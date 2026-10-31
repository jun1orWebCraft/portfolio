import { ArrowUp, Facebook, Github, Linkedin } from "lucide-react";
import { navLinks, profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-bold text-gradient">{profile.brand}</p>
          <p className="text-sm text-ink2">&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-ink2">
          {navLinks.map((l) => <a key={l.id} href={`#${l.id}`} className="hover:text-ink">{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          {[["GitHub", profile.socials.github, Github], ["LinkedIn", profile.socials.linkedin, Linkedin], ["Facebook", profile.socials.facebook, Facebook]].filter(([, u]) => u).map(([n, u, I]) => (
            <a key={n} href={u} target="_blank" rel="noopener noreferrer" aria-label={`${n} (opens in a new tab)`} className="btn btn-ghost !min-h-11 !w-11 !p-0"><I size={18} /></a>
          ))}
          <a href="#home" aria-label="Back to top" className="btn btn-primary !min-h-11 !w-11 !p-0"><ArrowUp size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
