import Preloader from "@/components/Preloader";
import ContactDrawer from "@/components/ContactDrawer";
import StylePicker from "@/components/StylePicker";
import Picked from "@/sections";
import { StylesProvider } from "@/lib/styles";
import site from "@/lib/site";

/**
 * One page, built from sections. Each section shows whichever style is
 * picked for it (sections/registry.ts): the nav's last link is a Style
 * dropdown, and the hero has a floating glass picker. Picks live in the
 * address (?nav=…&hero=…) so they can be shared.
 *
 *   Preloader
 *   Nav    (Style dropdown)
 *   Hero   (floating picker)
 *   Next   placeholder until more sections exist
 *
 * All copy: data/site.json.
 */
export default function Home() {
  const { company, preloader, styles, next, contact } = site;

  return (
    <StylesProvider>
      <Preloader products={preloader.products} stages={preloader.stages} wordmark={company.wordmark} />
      <Picked section="nav" />
      <main>
        <Picked section="hero" />
        <section id="next" className="gutter flex min-h-[100svh] flex-col items-center justify-center gap-6 text-center">
          <span className="t-label text-on-surface-variant">{next.label}</span>
          <h2 className="t-h2">{next.title}</h2>
        </section>
      </main>
      <StylePicker section="hero" label={styles.heroLabel} watch="hero" />
      <ContactDrawer {...contact} email={company.email} name={company.name} wordmark={company.wordmark} />
    </StylesProvider>
  );
}
