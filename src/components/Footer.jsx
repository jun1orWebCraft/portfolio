import { ArrowUp, Facebook, Github, Linkedin } from "lucide-react";
import { profile } from "../data/profile.js";

export default function Footer() {
  const socials = [
    ["GitHub", profile.socials.github, Github],
    ["LinkedIn", profile.socials.linkedin, Linkedin],
    ["Facebook", profile.socials.facebook, Facebook],
  ].filter(([, url]) => url);

  return (
    <footer className="border-t border-line px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-bold text-gradient">{profile.brand}</p>
          <p className="text-sm text-ink2">&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-2">
          {socials.map(([name, url, Icon]) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} (opens in a new tab)`} className="btn btn-ghost !min-h-11 !w-11 !p-0">
              <Icon size={18} />
            </a>
          ))}
          <a href="#home" aria-label="Back to top" className="btn btn-primary !min-h-11 !w-11 !p-0"><ArrowUp size={18} /></a>
        </div>
      </div>
    </footer>
  );
}