import { useState } from "react";
import { Facebook, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";

const fields = [["name", "Full Name", "text"], ["email", "Email Address", "email"], ["subject", "Subject", "text"]];
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Contact() {
  const [v, setV] = useState({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e = {};
    if (!v.name.trim()) e.name = "Enter your full name.";
    if (!v.email.trim()) e.email = "Enter your email address.";
    else if (!emailOk(v.email)) e.email = "Enter a valid email, like name@example.com.";
    if (!v.subject.trim()) e.subject = "Enter a subject.";
    if (!v.message.trim()) e.message = "Enter a message.";
    return e;
  };
  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErr(e); setDone(false);
    if (Object.keys(e).length) { document.getElementById(`f-${Object.keys(e)[0]}`)?.focus(); return; }
    // No backend: open the visitor's email app with the message filled in. Nothing is sent from this page.
    const body = `${v.message}\n\nFrom: ${v.name} (${v.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const input = "mt-1 w-full rounded-xl border border-line bg-bg2 px-4 py-3 text-ink placeholder:text-ink2";

  return (
    <Section id="contact" title="Contact" intro="Send me a message. The form opens your email app with everything filled in.">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-3 text-ink2">
          <li><a className="inline-flex items-center gap-2 hover:text-ink" href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a></li>
          {[["GitHub", profile.socials.github, Github], ["LinkedIn", profile.socials.linkedin, Linkedin], ["Facebook", profile.socials.facebook, Facebook]].filter(([, u]) => u).map(([n, u, I]) => (
            <li key={n}><a className="inline-flex items-center gap-2 hover:text-ink" href={u} target="_blank" rel="noopener noreferrer"><I size={18} /> {n} <span className="sr-only">(opens in a new tab)</span></a></li>
          ))}
          <li className="inline-flex items-center gap-2"><MapPin size={18} /> Ligao City, Albay, Philippines</li>
        </ul>
        <form onSubmit={submit} noValidate className="glass space-y-4 rounded-3xl p-6">
          {fields.map(([k, label, type]) => (
            <div key={k}>
              <label htmlFor={`f-${k}`} className="font-medium">{label}</label>
              <input id={`f-${k}`} type={type} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `e-${k}` : undefined} className={input} />
              {err[k] && <p id={`e-${k}`} role="alert" className="mt-1 text-sm text-red-400">{err[k]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="f-message" className="font-medium">Message</label>
            <textarea id="f-message" rows={5} value={v.message} onChange={set("message")} aria-invalid={!!err.message} aria-describedby={err.message ? "e-message" : undefined} className={input} />
            {err.message && <p id="e-message" role="alert" className="mt-1 text-sm text-red-400">{err.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
          {done && <p role="status" className="text-sm text-lavender">Your email app should open with this message ready. Press send there to deliver it. If nothing opens, email me at {profile.email}.</p>}
        </form>
      </div>
    </Section>
  );
}
