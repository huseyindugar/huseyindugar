"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq">
      <div className="wrap">
        <Reveal className="kesit-head tight">
          <div className="label">{t("kicker")}</div>
          <h2 className="kesit-title">{t("title")}</h2>
          <div className="datum" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
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
    </section>
  );
}
