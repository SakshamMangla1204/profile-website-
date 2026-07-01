"use client";

import { useEffect, useState } from "react";

export function useScrollState(offset = 16) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateState = () => {
      setIsScrolled(window.scrollY > offset);
    };

    updateState();
    window.addEventListener("scroll", updateState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateState);
    };
  }, [offset]);

  return isScrolled;
}
