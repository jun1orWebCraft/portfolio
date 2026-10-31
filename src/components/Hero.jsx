import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown, Github, Linkedin, Facebook, Mail } from "lucide-react";
import { profile } from "../data/profile.js";
import { asset } from "../lib/asset.js";
import { useTyping } from "../hooks/useTyping.js";

const ease = [0.22, 1, 0.36, 1];
// One orchestrated entrance: every hero element shares this timing.
const rise = (i) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay: 0.12 * i },
});

function Avatar() {
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 16 }), sy = useSpring(my, { stiffness: 120, damping: 16 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const initials = profile.name.split(" ").map((w) => w[0]).slice(0, 2).join("");

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <div className="mx-auto aspect-[4/5] w-72 sm:w-96" style={{ perspective: 1000 }} onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div className="relative h-full w-full" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {/* depth layer 1: glow behind everything */}
        <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-[20%] rounded-[2.5rem] bg-gradient-to-br from-primary to-accent opacity-60 blur-2xl" style={{ transform: "translateZ(-50px)" }} />
        {/* depth layer 2: glass card, starts lower so the portrait can rise above it */}
        <div aria-hidden="true" className="glass absolute inset-x-0 bottom-0 top-[14%] rounded-[2.5rem] bg-gradient-to-b from-primary/40 to-bg2" />
        {/* depth layer 3: decorative ring */}
        <div aria-hidden="true" className="absolute left-1/2 top-[8%] aspect-square h-[62%] -translate-x-1/2 rounded-full border border-line" style={{ transform: "translate(-50%, 0) translateZ(30px)" }} />
        {/* depth layer 4: the cutout portrait, closest to the viewer */}
        <div className="absolute inset-0 flex items-end justify-center" style={{ transform: "translateZ(70px)" }}>
          {failed ? (
            <div role="img" aria-label="Profile photo placeholder" className="grid h-3/4 w-3/4 place-items-center rounded-3xl bg-bg2 font-display text-6xl font-bold text-lavender">{initials}</div>
          ) : (
            <img src={asset(profile.photoCutout)} alt={`Portrait of ${profile.name}`} onError={() => setFailed(true)}
              className="h-full w-auto max-w-none" style={{ clipPath: "inset(-20% -10% 0 -10%)", filter: "drop-shadow(0 22px 28px rgba(0,0,0,.45))" }} />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const role = useTyping(profile.roles);
  const { github, linkedin, facebook } = profile.socials;
  const icons = [
    { href: github, label: "GitHub", Icon: Github },
    { href: linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: facebook, label: "Facebook", Icon: Facebook },
  ].filter((s) => s.href);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      {/* Floating decorative shapes */}
      <motion.div aria-hidden="true" className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
        animate={{ y: [0, -24, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden="true" className="absolute right-10 bottom-24 h-14 w-14 rotate-12 rounded-2xl border border-line"
        animate={{ y: [0, 18, 0], rotate: [12, 24, 12] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="order-2 lg:order-1">
          <motion.p {...rise(0)} className="font-display text-lg text-lavender">Hi, I'm {profile.name}</motion.p>
          <motion.h1 {...rise(1)} className="mt-3 font-display text-5xl font-bold leading-[1.05] tracking-tight text-gradient sm:text-7xl">
            {profile.headline}
          </motion.h1>
          <motion.p {...rise(2)} className="mt-4 font-display text-xl text-ink sm:text-2xl">{profile.subheadline}</motion.p>
          <motion.p {...rise(3)} className="mt-4 h-8 font-display text-xl text-accent">
            <span className="sr-only">{profile.roles.join(", ")}</span>
            <span aria-hidden="true">{role}<span className="caret">|</span></span>
          </motion.p>
          <motion.p {...rise(4)} className="mt-4 max-w-xl leading-relaxed text-ink2">{profile.intro}</motion.p>
          <motion.div {...rise(5)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">Explore My Work</a>
            <a href="#contact" className="btn btn-ghost"><Mail size={18} /> Contact Me</a>
            <ul className="ml-1 flex items-center gap-2">
              {icons.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="btn btn-ghost !min-h-11 !w-11 !p-0">
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.div className="order-1 lg:order-2" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease, delay: 0.2 }}>
          <Avatar />
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll to About section" className="absolute bottom-5 left-1/2 -translate-x-1/2 text-ink2 hover:text-ink">
        <motion.span className="block" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={22} />
        </motion.span>
      </a>
    </section>
  );
}
