"use client";

import { useStyles } from "@/lib/styles";
import type { Section } from "./registry";
import OceosNav from "./nav/oceos";
import { OceosDrift, OceosFlight } from "./hero/oceos";

/** Style id -> component. Ids and names live in ./registry.ts. */
const components: { [S in Section]: Record<string, () => React.ReactNode> } = {
  nav: { oceos: OceosNav },
  hero: { "oceos-flight": OceosFlight, "oceos-drift": OceosDrift },
};

/** Renders whichever style is picked for `section`. Keyed by id so a
 * switch mounts the new style fresh instead of carrying state over. */
export default function Picked({ section }: { section: Section }) {
  const { picks } = useStyles();
  const id = picks[section];
  const Style = components[section][id];
  return <Style key={id} />;
}
