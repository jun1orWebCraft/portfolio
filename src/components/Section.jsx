import { motion } from "motion/react";

export default function Section({ id, title, intro, children }) {
  return (
    <section id={id} className="border-t border-line px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-3xl font-bold text-gradient sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 max-w-2xl text-ink2">{intro}</p>}
        </motion.div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
