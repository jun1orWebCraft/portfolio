import { useEffect, useState } from "react";

// Fetches JSON once per browser session (cached) so we stay far below GitHub's anonymous rate limit.
// Status: "loading" | "ok" | "error". The page keeps working if the request fails.
export function useJson(url) {
  const [state, setState] = useState({ status: "loading", data: null });
  useEffect(() => {
    setState({ status: "loading", data: null });
    const key = `gh:${url}`;
    try { const c = sessionStorage.getItem(key); if (c) { setState({ status: "ok", data: JSON.parse(c) }); return; } } catch { /* ignore */ }
    const ctl = new AbortController();
    fetch(url, { signal: ctl.signal, headers: { Accept: "application/json" } })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((data) => {
        try { sessionStorage.setItem(key, JSON.stringify(data)); } catch { /* ignore */ }
        setState({ status: "ok", data });
      })
      .catch((e) => { if (e.name !== "AbortError") setState({ status: "error", data: null }); });
    return () => ctl.abort();
  }, [url]);
  return state;
}
