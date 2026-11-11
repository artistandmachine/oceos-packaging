"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { useStyles } from "@/lib/styles";
import { useBandTheme } from "@/lib/useBandTheme";
import { useLoaded } from "@/lib/loaded";
import { registry, type Section } from "@/sections/registry";

/**
 * A floating glass bar listing every style for `section`. It starts at
 * the bottom middle of the screen, can be dragged anywhere by its grip
 * (and stays put), and only shows while the element with id `watch` (the
 * section itself) is on screen. Its text flips light over dark bands,
 * like the nav.
 */
export default function StylePicker({ section, label, watch }: { section: Section; label: string; watch: string }) {
  const { picks, setPick } = useStyles();
  const loaded = useLoaded();
  const bounds = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const drag = useDragControls();
  const band = useBandTheme(bar, bar);

  // Re-observed on every switch: the new style mounts a new element.
  const [inView, setInView] = useState(true);
  const picked = picks[section];
  useEffect(() => {
    const el = document.getElementById(watch);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [watch, picked]);

  const show = loaded && inView;

  return (
    <div ref={bounds} className="pointer-events-none fixed inset-3 z-30 md:inset-6">
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <motion.div
          ref={bar}
          drag
          dragControls={drag}
          dragListener={false}
          dragMomentum={false}
          dragConstraints={bounds}
          dragElastic={0.06}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.96 }}
          transition={{ duration: 0.4 }}
          aria-hidden={!show}
          data-theme={band === "dark" ? "dark" : undefined}
          className={`glass flex max-w-full items-center gap-1 rounded-full p-1.5 text-on-surface ${show ? "pointer-events-auto" : ""}`}
        >
          <button
            type="button"
            aria-label="Drag to move"
            tabIndex={-1}
            onPointerDown={(e) => drag.start(e)}
            className="flex h-9 w-7 shrink-0 cursor-grab touch-none items-center justify-center opacity-60 active:cursor-grabbing"
          >
            <svg aria-hidden="true" viewBox="0 0 6 10" className="h-3 w-2 fill-current">
              {[0, 4, 8].map((y) => [0, 4].map((x) => <circle key={`${x}${y}`} cx={x + 1} cy={y + 1} r="1" />))}
            </svg>
          </button>
          <span className="t-label shrink-0 pr-2 opacity-60">{label}</span>
          <div role="radiogroup" aria-label={label} className="flex gap-1 overflow-x-auto">
            {registry[section].map((s) => {
              const active = picked === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={show ? undefined : -1}
                  onClick={() => setPick(section, s.id)}
                  className={`t-label shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 transition-colors duration-300 ${
                    active ? "bg-on-surface text-surface" : "hover:bg-current/10"
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
