import { TrailMap } from "@/components/trail-map";
import { site } from "@/lib/site";

export default function HomePage() {
  return <TrailMap notice={site.trailNotice} />;
}
