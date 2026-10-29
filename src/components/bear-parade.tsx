export function Meadow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute -left-16 top-8 size-72 animate-drift rounded-full bg-[#ffe3b8]/80 blur-3xl" />
      <div className="absolute right-0 top-0 size-80 animate-drift rounded-full bg-[#ffd5e0]/70 blur-3xl" />
      <div className="absolute bottom-24 left-1/3 size-72 rounded-full bg-[#d9f3df]/80 blur-3xl" />
    </div>
  );
}
