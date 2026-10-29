import { Suspense } from "react";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { DenSwitch } from "@/components/den-switch";
import { LockDenButton } from "@/components/lock-den";
import { PasswordForm } from "@/components/password-form";
import { cookieMatches, FINALE_COOKIE, FINALE_HEADER } from "@/lib/auth";
import { learnerLabel, site } from "@/lib/site";

export const metadata = {
  title: "The locked den",
};

const soloConcepts = [
  { title: "API", body: "A doorway one program uses to ask another program for something." },
  { title: "REST", body: "A common style of API that uses web addresses and a small set of actions." },
  { title: "JSON", body: "A simple text shape for data, built from names and values. APIs speak it a lot." },
  { title: "HTTP", body: "The set of rules a browser or app uses to ask for a page or a piece of data." },
  { title: "Endpoint", body: "One specific address on an API, like one door in a long hallway." },
  { title: "Request and response", body: "You send a request. The other side sends a response. That pair is a conversation." },
  { title: "Status codes", body: "A short number on the response. 200 means okay. 404 means not found." },
  { title: "Client and server", body: "The client asks. The server answers. Your phone is often the client." },
  { title: "Stateless", body: "Each request stands alone. The server does not have to remember the last one." },
  { title: "Stateful", body: "The server remembers the conversation, like a cart that stays full between clicks." },
  { title: "Headers", body: "Little notes attached to a request, such as who is asking or what kind of data is inside." },
  { title: "API key", body: "A secret pass that tells an API which app is calling. Treat it like a password." },
  { title: "SDK", body: "A ready-made toolbox so you can use an API without building every request by hand." },
  { title: "Webhook", body: "The reverse of asking. Another service taps you when something happens." },
  { title: "MCP", body: "A shared way for an AI app to use tools, like a plug shape that many tools can fit." },
];

function LockedDoor({ denied }: { denied: boolean }) {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-[#a56b2b]">Last page</p>
        <h1 className="mt-2 text-3xl leading-tight text-balance break-words sm:text-5xl">The den is still locked</h1>
        <p className="mt-3 text-lg leading-8 text-foreground/80">
          This door opens when you have finished, and your friend gives you the word. Until then, it
          can wait. The lessons will still be here.
        </p>
      </header>
      <div className="mx-auto w-full max-w-xs overflow-x-clip" aria-hidden>
        <div className="relative mx-auto h-64 w-44 rounded-t-[5rem] rounded-b-2xl border-4 border-[#8a5a32] bg-gradient-to-b from-[#e7b56a] to-[#c4843e] shadow-inner">
          <div className="absolute top-16 left-1/2 h-24 w-28 -translate-x-1/2 rounded-t-full border-4 border-[#8a5a32]/70" />
          <div className="absolute top-40 right-5 size-5 rounded-full bg-[#f8e2b0] shadow" />
          <div className="absolute right-2 bottom-5 w-16">
            <div className="rounded-full bg-[#c98449] px-2 py-2 text-center text-xs font-bold whitespace-nowrap text-[#fff8ee]">
              not yet
            </div>
          </div>
        </div>
      </div>
      <section className="rounded-[2rem] border border-border bg-card/90 p-5 shadow-sm">
        <h2 className="text-2xl">The word for the den</h2>
        <div className="mt-4">
          <PasswordForm
            kind="finale"
            label="Try the door"
            hint="This is not the password from the gate. It is a new word, given at the end."
            denied={denied}
          />
        </div>
      </section>
      <p>
        <Link href="/" className="inline-flex min-h-12 items-center font-semibold text-[#a56b2b] underline-offset-4 hover:underline">
          Return to the trail
        </Link>
      </p>
    </div>
  );
}

function PawMark() {
  return (
    <svg viewBox="0 0 36 36" className="size-7 shrink-0 sm:size-8" aria-hidden fill="#8a5a32">
      <ellipse cx="18" cy="23" rx="8" ry="6.5" />
      <circle cx="9" cy="14" r="3" />
      <circle cx="15" cy="10" r="3.2" />
      <circle cx="21" cy="10" r="3.2" />
      <circle cx="27" cy="14" r="3" />
    </svg>
  );
}

function OpenDen() {
  const name = learnerLabel();
  return (
    <div className="space-y-10">
      <p className="text-center text-sm font-semibold text-[#a56b2b]">The door opened</p>
      <div className="overflow-clip px-2 py-6 sm:px-3">
        <div className="relative mx-auto w-full max-w-xl">
          <div
            aria-hidden
            className="absolute inset-x-3 top-3 bottom-1 rotate-[0.8deg] rounded-[2px] bg-[#f0e4c8] shadow-sm motion-reduce:rotate-0"
          />
          <article
            aria-label={`A letter for ${name}`}
            className="relative -rotate-[0.45deg] rounded-[2px] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf6ea_46%,#f3e6cc_100%)] px-2.5 py-2.5 text-[#4e3424] shadow-[0_14px_28px_-16px_rgba(92,58,24,0.48)] motion-reduce:rotate-0 sm:px-3.5 sm:py-3.5"
          >
            <div className="border border-[#e0c48a] px-4 py-7 sm:px-12 sm:py-12">
              <header>
                <h1 className="font-heading text-3xl leading-tight break-words sm:text-4xl">For {name}</h1>
                <p className="mt-2 text-base text-[#8a5a32]">The day you finished the trail</p>
              </header>
              <p className="mt-8 font-heading text-2xl leading-relaxed text-pretty break-words sm:text-3xl">
                {site.friendNote}
              </p>
              <p className="mt-6 font-heading text-lg leading-8 break-words sm:text-xl">{site.finaleFun}</p>
              <div className="mt-10 flex items-center justify-end gap-2 text-[#8a5a32]">
                <p className="font-heading text-2xl sm:text-3xl">{site.friendSign}</p>
                <PawMark />
              </div>
            </div>
          </article>
        </div>
      </div>
      <section>
        <h2 className="text-2xl text-foreground/85 sm:text-3xl">When you are ready</h2>
        <p className="mt-2 max-w-2xl text-base leading-7 text-foreground/75 sm:text-lg sm:leading-8">
          {site.finaleNext}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {soloConcepts.map((concept) => (
            <article key={concept.title} className="min-w-0 rounded-2xl border border-border/80 bg-card/70 px-4 py-3">
              <h3 className="text-xl break-words">{concept.title}</h3>
              <p className="mt-1.5 text-base leading-7 break-words text-foreground/75">{concept.body}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="relative z-20 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link href="/" className="inline-flex min-h-12 items-center justify-center text-base font-semibold text-[#a56b2b] underline-offset-4 hover:underline sm:justify-start">
          Back to the trail
        </Link>
        <LockDenButton />
      </div>
    </div>
  );
}

async function FinaleBody({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>;
}) {
  const [headerStore, jar, params] = await Promise.all([headers(), cookies(), searchParams]);
  const open = cookieMatches(
    "finale",
    headerStore.get(FINALE_HEADER) ?? jar.get(FINALE_COOKIE)?.value,
  );
  return (
    <DenSwitch
      open={open}
      openView={<OpenDen />}
      lockedView={<LockedDoor denied={!open && params.denied === "1"} />}
    />
  );
}

export default function FinalePage({ searchParams }: PageProps<"/finale">) {
  return (
    <Suspense
      fallback={
        <div className="rounded-[2rem] border border-border bg-card/80 p-8">
          <p className="font-heading text-2xl">Listening at the door…</p>
        </div>
      }
    >
      <FinaleBody searchParams={searchParams} />
    </Suspense>
  );
}
