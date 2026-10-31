import { motion } from "motion/react";
import Section from "./Section.jsx";
import { skills } from "../data/skills.js";

export default function Skills() {
  return (
    <Section id="skills" title="Skills and Expertise" intro="Tools and abilities I work with.">
      <div className="grid gap-5 lg:grid-cols-3">
        {skills.map((g) => (
          <div key={g.title} className="glass rounded-3xl p-6">
            <h3 className="font-display text-lg font-bold">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s, i) => (
                <motion.li key={s} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -3 }} className="rounded-full border border-line bg-primary/10 px-3 py-1.5 text-sm text-lavender">{s}</motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
