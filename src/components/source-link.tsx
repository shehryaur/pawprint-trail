import type { Source } from "@/content/trail";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function SourceLink({ source, primary = false }: { source: Source; primary?: boolean }) {
  return (
    <article className="rounded-[1.6rem] border border-border bg-card/90 p-4">
      <p className="text-xs font-semibold tracking-wide text-[#a56b2b] uppercase">
        {primary ? "The one to open" : "If you want to go further"}
      </p>
      <h3 className="mt-1 text-2xl break-words">{source.title}</h3>
      <a
        href={source.url}
        target="_blank"
        rel="noreferrer"
        className={cn(
          buttonVariants({ variant: primary ? "default" : "outline" }),
          "mt-4 h-12 w-full justify-center rounded-full px-5 text-base sm:w-auto",
        )}
      >
        Open this source
      </a>
    </article>
  );
}
