import Section from "./Section.jsx";
import { education } from "../data/education.js";

export default function Education() {
  return (
    <Section id="education" title="Education and Experience">
      <ol className="relative ml-3 border-l border-line">
        {education.map((e) => (
          <li key={e.id} className="mb-8 ml-6">
            <span aria-hidden="true" className="absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full bg-accent" />
            <div className="glass rounded-2xl p-5">
              <h3 className="font-display text-lg font-bold">{e.title}</h3>
              <p className="text-ink2">{e.place}</p>
              {e.years && <p className="mt-1 text-sm text-lavender">{e.years}</p>}
              {e.notes.map((n) => <p key={n} className="mt-1 text-sm text-ink2">{n}</p>)}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
