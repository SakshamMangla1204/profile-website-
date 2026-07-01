"use client";

import { useEffect, useState } from "react";

import type { NavigationItem } from "@/data/navigation";

function getSectionId(item: NavigationItem) {
  return item.href.replace("#", "");
}

export function useActiveSection(items: readonly NavigationItem[]) {
  const [activeSection, setActiveSection] = useState(() => getSectionId(items[0]));

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(getSectionId(item)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (typeof window === "undefined") {
      return;
    }

    const hash = window.location.hash.replace("#", "");
    if (hash && items.some((item) => getSectionId(item) === hash)) {
      setActiveSection(hash);
    }

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.55, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleHashChange = () => {
      const nextHash = window.location.hash.replace("#", "");
      if (nextHash) {
        setActiveSection(nextHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [items]);

  return { activeSection, setActiveSection };
}
