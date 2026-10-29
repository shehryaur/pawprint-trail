declare global {
  interface Window {
    __ht_gate?: string;
    __ht_finale?: string;
    __htFetchPatched?: boolean;
  }
}

export function rememberPass(kind: "gate" | "finale", token: string) {
  if (kind === "finale") window.__ht_finale = token;
  else window.__ht_gate = token;
}

export function forgetDen() {
  window.__ht_finale = "";
}
