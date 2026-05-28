"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navigation.module.scss";

const sections = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof sections)[number]["id"];

function sectionHref(id: SectionId, onHome: boolean) {
  return onHome ? `#${id}` : `/#${id}`;
}

export default function Navigation() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [activeId, setActiveId] = useState<SectionId>("about");
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    if (!onHome) return;

    const sectionIds = sections.map((s) => s.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    if (!elements.length) return;

    let rafId = 0;

    const update = () => {
      setElevated(window.scrollY > 48);

      const anchor = window.innerHeight * 0.35;
      let current: SectionId = "about";

      for (const el of elements) {
        if (el.getBoundingClientRect().top <= anchor) {
          current = el.id as SectionId;
        }
      }

      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

  return (
    <header
      className={`${styles.header} ${elevated ? styles.headerElevated : ""}`}
    >
      <nav className={styles.nav} aria-label="Page sections">
        <Link
          href={onHome ? "#about" : "/#about"}
          className={styles.mark}
        >
          Scott McNicol
        </Link>
        <ul className={styles.links}>
          {sections.map(({ id, label }) => {
            const isActive = onHome && activeId === id;
            return (
              <li key={id}>
                <a
                  href={sectionHref(id, onHome)}
                  className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
