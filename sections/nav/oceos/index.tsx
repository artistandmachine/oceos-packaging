import site from "@/lib/site";
import Header from "./Header";

export default function OceosNav() {
  return <Header links={site.nav} company={site.company} styleLabel={site.styles.navLabel} />;
}
