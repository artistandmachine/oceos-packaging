"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStyles } from "@/lib/styles";
import { registry, type Section } from "@/sections/registry";
import { EASE } from "./Reveal";
import { Roll } from "./Button";

/**
 * The nav's last link: "Style", opening a glass list of every style
 * for `section` (sections/registry.ts). Every nav style puts one of
 * these at the end of its links. Text colour is inherited, so it flips
 * with the nav over dark bands.
 */
export default function StyleDropdown({ section = "nav", label }: { section?: Section; label: string }) {
  const { picks, setPick } = useStyles();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="group t-label flex items-center gap-2"
      >
        <Roll>{label}</Roll>
        <svg aria-hidden="true" viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="glass absolute right-0 top-full mt-3 flex min-w-48 flex-col gap-0.5 rounded-2xl p-1.5 text-left"
          >
            {registry[section].map((s) => {
              const active = picks[section] === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setPick(section, s.id);
                      setOpen(false);
                    }}
                    className={`t-label flex w-full items-center justify-between gap-6 rounded-xl px-3 py-2.5 transition-colors ${
                      active ? "bg-current/15" : "hover:bg-current/10"
                    }`}
                  >
                    {s.name}
                    <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full bg-current ${active ? "" : "opacity-0"}`} />
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
