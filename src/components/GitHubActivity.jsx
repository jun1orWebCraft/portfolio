import { useEffect, useMemo, useRef, useState } from "react";
import { Github, Star } from "lucide-react";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";
import { useJson } from "../hooks/useGitHub.js";

const user = profile.githubUser;
const profileUrl = `https://github.com/${user}`;
const levelColor = ["rgba(196,181,253,0.10)", "#5b21b6", "#7c3aed", "#a855f7", "#e9d5ff"];
const CELL = 12, GAP = 3;

function Heatmap({ year }) {
  // Contribution data comes from a free public API because GitHub's own contribution data requires a private token.
  const { status, data } = useJson(`https://github-contributions-api.jogruber.de/v4/${user}?y=${year}`);
  const box = useRef(null);
  const { weeks, months, total } = useMemo(() => {
    if (!data?.contributions) return { weeks: [], months: [], total: 0 };
    const days = data.contributions;
    const pad = new Date(days[0].date + "T00:00:00").getDay();
    const cells = [...Array(pad).fill(null), ...days];
    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    let last = -1;
    const months = weeks.map((w) => {
      const d = w.find(Boolean); const m = new Date(d.date + "T00:00:00").getMonth();
      if (m !== last) { last = m; return new Date(d.date + "T00:00:00").toLocaleString("en", { month: "short" }); }
      return "";
    });
    return { weeks, months, total: days.reduce((n, d) => n + d.count, 0) };
  }, [data]);

  useEffect(() => { if (box.current) box.current.scrollLeft = year === "last" ? box.current.scrollWidth : 0; }, [weeks, year]);

  if (status === "loading") return <p className="text-ink2" role="status">Loading contribution graph...</p>;
  if (status === "error" || !weeks.length) return <p className="text-ink2">The live contribution graph could not load right now. <a className="underline" href={profileUrl} target="_blank" rel="noopener noreferrer">View it on GitHub</a>.</p>;
  return (
    <div>
      <p className="font-display text-lg font-semibold">{total} contributions {year === "last" ? "in the last year" : `in ${year}`}</p>
      <div ref={box} className="glass mt-4 overflow-x-auto rounded-2xl p-4">
        <div role="img" aria-label={`Contribution graph: ${total} contributions ${year === "last" ? "in the last year" : `in ${year}`}`} className="w-max">
          <div className="flex text-xs text-ink2" style={{ gap: GAP, height: 18 }} aria-hidden="true">
            {months.map((m, i) => <span key={i} style={{ width: CELL }} className="overflow-visible whitespace-nowrap">{m}</span>)}
          </div>
          <div className="flex" style={{ gap: GAP }} aria-hidden="true">
            {weeks.map((w, i) => (
              <div key={i} className="flex flex-col" style={{ gap: GAP }}>
                {w.map((d, j) => d
                  ? <span key={j} title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`} style={{ width: CELL, height: CELL, background: levelColor[d.level] }} className="rounded-[3px]" />
                  : <span key={j} style={{ width: CELL, height: CELL }} />)}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-1 text-xs text-ink2" aria-hidden="true">
          Less {levelColor.map((c) => <span key={c} style={{ width: CELL, height: CELL, background: c }} className="rounded-[3px]" />)} More
        </div>
      </div>
    </div>
  );
}

function Repos() {
  const { status, data } = useJson(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=100`);
  if (status === "loading") return <p className="text-ink2" role="status">Loading repositories...</p>;
  if (status === "error") return <p className="text-ink2">Repositories could not load right now. <a className="underline" href={`${profileUrl}?tab=repositories`} target="_blank" rel="noopener noreferrer">View them on GitHub</a>.</p>;
  const repos = data.filter((r) => !r.fork);
  if (!repos.length) return <p className="text-ink2">No public repositories to show yet.</p>;
  return (
    <div>
      <p className="mb-3 text-sm text-ink2">{repos.length} public {repos.length === 1 ? "repository" : "repositories"}. Scroll to see them all.</p>
      <div tabIndex={0} role="region" aria-label="Repository list, scrollable" className="glass max-h-[28rem] overflow-y-auto rounded-2xl p-4">
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((r) => (
        <li key={r.id}>
          <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="glass flex h-full flex-col rounded-2xl p-5 transition-transform hover:-translate-y-1">
            <span className="font-display font-semibold text-lavender">{r.name}<span className="sr-only"> (opens in a new tab)</span></span>
            <span className="mt-2 flex-1 text-sm text-ink2">{r.description || "No description provided."}</span>
            <span className="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink2">
              {r.language && <span className="rounded-full border border-line px-2 py-0.5 text-lavender">{r.language}</span>}
              {r.stargazers_count > 0 && <span className="inline-flex items-center gap-1"><Star size={12} /> {r.stargazers_count}</span>}
              <span>Updated {new Date(r.pushed_at).toLocaleDateString("en", { month: "short", year: "numeric" })}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
      </div>
    </div>
  );
}

export default function GitHubActivity() {
  const [year, setYear] = useState("last");
  const now = new Date().getFullYear();
  const years = ["last"];
  for (let y = now; y >= profile.githubStartYear; y--) years.push(String(y));
  return (
    <Section id="github" title="GitHub Activity" intro="Live from my GitHub account: my contributions and public repositories.">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="min-w-0"><Heatmap year={year} /></div>
        <div role="group" aria-label="Choose year" className="flex flex-row flex-wrap gap-2 lg:flex-col">
          {years.map((y) => (
            <button key={y} type="button" aria-pressed={year === y} onClick={() => setYear(y)}
              className={`btn !min-h-10 !py-2 text-sm ${year === y ? "btn-primary" : "btn-ghost"}`}>{y === "last" ? "Last 12 months" : y}</button>
          ))}
        </div>
      </div>
      <h3 className="mb-5 mt-12 font-display text-xl font-bold">Repositories</h3>
      <Repos />
      <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8"><Github size={18} /> Open full GitHub profile</a>
    </Section>
  );
}
