import { motion } from "motion/react";
import { Code2, Clapperboard, FlaskConical, Users } from "lucide-react";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";

const cards = [
  { Icon: Code2, title: "Developer", text: "Builds mobile and web apps with Flutter, Dart, Python, HTML and CSS." },
  { Icon: Clapperboard, title: "Multimedia Creator", text: "Edits videos and designs ads, posters and other graphics." },
  { Icon: FlaskConical, title: "Researcher", text: "Presented the BatangHanda research at the 2nd National Media and Information Literacy Conference." },
  { Icon: Users, title: "Student Leader", text: "Served as CITO Secretary, Vice President and President." },
];

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4 leading-relaxed text-ink2">
          <p>{profile.intro}</p>
          <p>I am studying {profile.program} at {profile.institution}.</p>
          <p>My capstone, BatangHanda, is a mobile learning app that teaches children ages 7-12 about disaster preparedness and climate change.</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {cards.map(({ Icon, title, text }) => (
            <motion.li key={title} whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className="glass rounded-2xl p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/20 text-accent"><Icon size={22} /></span>
              <h3 className="mt-3 font-display text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-ink2">{text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
