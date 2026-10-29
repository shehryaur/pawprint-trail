import { connection } from "next/server";
import { TrailHeader } from "@/components/trail-header";
import { ProgressProvider } from "@/components/progress-store";
import { progressConfigured } from "@/lib/progress-db";
import { site } from "@/lib/site";

export default async function StudyLayout({ children }: LayoutProps<"/">) {
  await connection();
  return (
    <ProgressProvider remote={progressConfigured()}>
      <TrailHeader title={site.title} />
      <main className="mx-auto w-full min-w-0 max-w-3xl flex-1 overflow-x-clip px-4 pt-5 pb-[max(5rem,env(safe-area-inset-bottom))] sm:pt-6 sm:pb-24">{children}</main>
    </ProgressProvider>
  );
}
