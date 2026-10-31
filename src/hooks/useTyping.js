import { useEffect, useState } from "react";

// Types and deletes each word in turn. With reduced motion, it just cycles words slowly.
export function useTyping(words, { type = 70, erase = 35, hold = 1400 } = {}) {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [i, setI] = useState(0);
  const [n, setN] = useState(reduced ? words[0].length : 0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i];
    if (reduced) {
      const t = setTimeout(() => { const next = (i + 1) % words.length; setI(next); setN(words[next].length); }, 2500);
      return () => clearTimeout(t);
    }
    let t;
    if (!deleting && n < word.length) t = setTimeout(() => setN(n + 1), type);
    else if (!deleting) t = setTimeout(() => setDeleting(true), hold);
    else if (n > 0) t = setTimeout(() => setN(n - 1), erase);
    else { setDeleting(false); setI((i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [n, deleting, i, words, type, erase, hold, reduced]);

  return words[i].slice(0, n);
}
