/**
 * Every style, per section. The first one listed is the default.
 *
 * To add a style: build it under sections/<section>/<style>/, add its
 * id and name here, then map the id to its component in
 * sections/index.tsx. The nav dropdown and the hero's floating picker
 * list whatever is here.
 */
export const registry = {
  nav: [{ id: "oceos", name: "OCEOS" }],
  hero: [
    { id: "oceos-flight", name: "OCEOS Flight" },
    { id: "oceos-drift", name: "OCEOS Drift" },
  ],
} as const;

export type Section = keyof typeof registry;
export type StyleId<S extends Section> = (typeof registry)[S][number]["id"];
export type Picks = { [S in Section]: StyleId<S> };

export const sections = Object.keys(registry) as Section[];

export const defaults = Object.fromEntries(sections.map((s) => [s, registry[s][0].id])) as Picks;

export function isStyle<S extends Section>(section: S, id: string | null): id is StyleId<S> {
  return registry[section].some((s) => s.id === id);
}
