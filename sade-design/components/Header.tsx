"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { site } from "@/lib/site";

const sections = [
  ["services", "hizmetler"],
  ["gallery", "projeler"],
  ["process", "surec"],
  ["about", "hakkimizda"],
  ["faq", "faq"],
  ["contact", "iletisim"],
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav">
      <div className="nav-in">
        <Link className="nav-mark" href="/">
          SADE
        </Link>

        <div className="nav-links">
          {sections.map(([key, anchor]) => (
            <Link key={key} href={`/#${anchor}`} onClick={() => setOpen(false)}>
              {t(key)}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <a className="nav-phone" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>
          <LanguageSwitcher />
          <button
            className="nav-toggle"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="2" y1="6" x2="20" y2="6" stroke="currentColor" />
              <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" />
              <line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-links-mobile">
          {sections.map(([key, anchor]) => (
            <Link key={key} href={`/#${anchor}`} onClick={() => setOpen(false)}>
              {t(key)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
