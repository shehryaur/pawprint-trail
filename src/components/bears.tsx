import { cn } from "cn";

export function Bear({
  className,
  waving = false,
}: {
  className?: string;
  waving?: boolean;
}) {
  return (
    <svg viewBox="0 0 140 150" className={cn("overflow-visible", className)} aria-hidden>
      <ellipse cx="70" cy="142" rx="34" ry="8" fill="#e7c48a" opacity="0.45" />
      <circle cx="34" cy="36" r="16" fill="#b8743d" />
      <circle cx="106" cy="36" r="16" fill="#b8743d" />
      <circle cx="34" cy="36" r="8" fill="#f6c7be" />
      <circle cx="106" cy="36" r="8" fill="#f6c7be" />
      <ellipse cx="70" cy="72" rx="46" ry="42" fill="#c98449" />
      <ellipse cx="70" cy="82" rx="28" ry="22" fill="#f8dcc0" />
      <circle cx="54" cy="70" r="5" fill="#3d2618" />
      <circle cx="86" cy="70" r="5" fill="#3d2618" />
      <circle cx="55.6" cy="68.2" r="1.6" fill="#fff8ee" />
      <circle cx="87.6" cy="68.2" r="1.6" fill="#fff8ee" />
      <ellipse cx="44" cy="82" rx="7" ry="4" fill="#f3a7b8" opacity="0.9" />
      <ellipse cx="96" cy="82" rx="7" ry="4" fill="#f3a7b8" opacity="0.9" />
      <ellipse cx="70" cy="84" rx="6" ry="4.2" fill="#5c3a28" />
      <path
        d="M60 92 Q70 100 80 92"
        fill="none"
        stroke="#5c3a28"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <ellipse cx="70" cy="128" rx="32" ry="18" fill="#c98449" />
      <ellipse cx="70" cy="132" rx="18" ry="11" fill="#f8dcc0" />
      {waving ? (
        <g className="origin-[104px_108px] motion-safe:animate-[wave_1.4s_ease-in-out_infinite]">
          <ellipse cx="112" cy="108" rx="12" ry="10" fill="#c98449" transform="rotate(-28 112 108)" />
          <circle cx="122" cy="100" r="8" fill="#f8dcc0" />
        </g>
      ) : (
        <>
          <ellipse cx="40" cy="124" rx="12" ry="9" fill="#b8743d" />
          <ellipse cx="100" cy="124" rx="12" ry="9" fill="#b8743d" />
        </>
      )}
    </svg>
  );
}

export function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 80" className={className} aria-hidden>
      <ellipse cx="54" cy="50" rx="36" ry="20" fill="#fffaf4" />
      <ellipse cx="92" cy="40" rx="40" ry="26" fill="#fffaf4" />
      <ellipse cx="132" cy="50" rx="32" ry="18" fill="#fffaf4" />
    </svg>
  );
}
