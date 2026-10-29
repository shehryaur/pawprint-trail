import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col justify-center px-4 py-16 pb-40">
      <section className="rounded-[2rem] border border-border bg-card/90 p-8 text-center">
        <p className="text-sm font-semibold text-[#a56b2b]">Off the path</p>
        <h1 className="mt-2 text-4xl">This page is not on the trail</h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          The trail does not go here. Head back before the bears worry.
        </p>
        <Link href="/" className={cn(buttonVariants(), "mt-6 h-12 rounded-full px-5 text-base")}>
          Back to the trail
        </Link>
      </section>
    </main>
  );
}
