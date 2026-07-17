"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SideArt from "./SideArt";

export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq">
      <div className="content-band edge-left">
        <div className="wrap">
          <Reveal className="kesit-head tight">
            <h2 className="kesit-title">{t("title")}</h2>
          </Reveal>
          <Reveal>
            <div className="faq-list">
              {items.map((item, i) => (
                <div className="faq-item" data-open={openIndex === i} key={item.q}>
                  <button
                    className="faq-q"
                    aria-expanded={openIndex === i}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="plus" aria-hidden="true">+</span>
                  </button>
                  <div className="faq-a">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <SideArt variant="lamps" />
      </div>
    </section>
  );
}
