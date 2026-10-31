// Resolves "/images/x.jpg" against the deploy base, so it works at a domain root or a GitHub Pages subpath.
export const asset = (p) => (!p ? "" : /^https?:/.test(p) ? p : import.meta.env.BASE_URL + p.replace(/^\//, ""));
