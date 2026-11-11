import site from "@/lib/site";
import Hero from "./Hero";

const { pan, ...hero } = site.hero;
const shared = { ...hero, wordmark: site.company.wordmark, logos: site.clients.logos, logosLabel: site.clients.wallLabel };

/** The drone ocean loop, climbing up through the clouds. */
export function OceosFlight() {
  return <Hero {...shared} />;
}

/** The same climb over a still drone photo that drifts toward the cursor. */
export function OceosDrift() {
  return <Hero {...shared} pan={pan} />;
}
