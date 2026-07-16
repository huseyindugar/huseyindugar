"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOn(true);
            io.unobserve(entry.target);
          }
        });
      },
      // threshold 0 fires as soon as any part of the target is visible, which
      // matters for tall targets (e.g. the multi-row project gallery) where a
      // ratio-based threshold like 0.12 may never be satisfied on a narrow
      // viewport since the visible area never reaches 12% of the whole target.
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`rv ${on ? "on" : ""} ${className}`}>
      {children}
    </div>
  );
}
