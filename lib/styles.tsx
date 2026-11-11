"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { defaults, isStyle, sections, type Picks, type Section, type StyleId } from "@/sections/registry";

type Ctx = {
  picks: Picks;
  setPick: <S extends Section>(section: S, id: StyleId<S>) => void;
};

const StylesContext = createContext<Ctx>({ picks: defaults, setPick: () => {} });

/**
 * Which style each section shows. Kept in the address as ?nav=…&hero=…
 * so a link sent to a client opens their picks. The static page renders
 * the defaults, then switches to whatever the address asks for.
 */
export function StylesProvider({ children }: { children: React.ReactNode }) {
  const [picks, setPicks] = useState<Picks>(defaults);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = { ...defaults };
    for (const s of sections) {
      const id = params.get(s);
      if (isStyle(s, id)) (fromUrl as Record<Section, string>)[s] = id;
    }
    setPicks(fromUrl);
  }, []);

  const setPick = useCallback<Ctx["setPick"]>((section, id) => {
    setPicks((p) => ({ ...p, [section]: id }));
    const url = new URL(window.location.href);
    url.searchParams.set(section, id);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  return <StylesContext.Provider value={{ picks, setPick }}>{children}</StylesContext.Provider>;
}

export function useStyles() {
  return useContext(StylesContext);
}
