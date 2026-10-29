import { Suspense } from "react";
import type { Metadata } from "next";
import { Bear } from "@/components/bears";
import { PasswordForm } from "@/components/password-form";
import { safeNext } from "@/lib/auth";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The gate",
};

async function Gate({ searchParams }: { searchParams: Promise<{ denied?: string; next?: string }> }) {
  const params = await searchParams;
  const returnTo = safeNext(params.next);
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-1 flex-col justify-center overflow-x-clip px-4 py-8">
      <section className="w-full min-w-0 rounded-[2rem] border border-border bg-card/90 p-5 shadow-sm sm:p-8">
        <Bear waving className="mx-auto w-28 sm:w-32" />
        <p className="mt-2 text-center text-sm font-semibold tracking-wide text-[#a56b2b] uppercase">
          An AI journey
        </p>
        <h1 className="mt-2 text-center text-4xl leading-tight text-balance break-words">{site.title}</h1>
        <p className="mt-2 text-center text-sm text-[#a56b2b]">Made for {site.learnerName}</p>
        <p className="mt-3 text-center leading-7 text-foreground/80">Type the word.</p>
        <div className="mt-6">
          <PasswordForm
            kind="gate"
            label="Come in"
            denied={params.denied === "1"}
            returnTo={returnTo}
          />
        </div>
      </section>
    </main>
  );
}

export default function EnterPage({ searchParams }: PageProps<"/enter">) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-1 flex-col justify-center overflow-x-clip px-4 py-8">
          <p className="text-center font-heading text-2xl">Opening the gate…</p>
        </main>
      }
    >
      <Gate searchParams={searchParams} />
    </Suspense>
  );
}
