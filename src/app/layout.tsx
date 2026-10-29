import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { Meadow } from "@/components/bear-parade";
import { site } from "@/lib/site";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s · ${site.title}`,
  },
  description: site.description,
  robots: { index: false, follow: false },
};

const reloadSignOut = `(function(){try{var nav=performance.getEntriesByType("navigation")[0];if(!nav||nav.type!=="reload")return;if(location.pathname==="/enter")return;document.documentElement.style.visibility="hidden";var next=location.pathname+location.search;fetch("/api/sign-out",{method:"POST"}).finally(function(){location.replace("/enter?next="+encodeURIComponent(next));});}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-dvh overflow-x-clip bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: reloadSignOut }} />
        <Meadow />
        {children}
      </body>
    </html>
  );
}
