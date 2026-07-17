"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { resolveImageUrl } from "@/sanity/lib/image";
import type { SanityProject } from "@/sanity/lib/queries";

const placeholderGlyphs: React.ReactNode[] = [
  <svg key="a" viewBox="0 0 120 150" aria-hidden="true">
    <path d="M40 120 L40 55 A20 20 0 0 1 80 55 L80 120" />
    <line x1="20" y1="120" x2="100" y2="120" />
    <line x1="60" y1="38" x2="60" y2="55" />
    <path d="M52 59 A8 8 0 0 1 68 59" />
    <line x1="52" y1="59" x2="68" y2="59" />
    <circle className="em" cx="60" cy="63" r="1.8" />
  </svg>,
  <svg key="b" viewBox="0 0 120 150" aria-hidden="true">
    <rect x="24" y="70" width="72" height="40" />
    <line x1="24" y1="86" x2="96" y2="86" />
    <line x1="16" y1="120" x2="104" y2="120" />
    <circle className="em" cx="60" cy="60" r="1.8" />
  </svg>,
  <svg key="c" viewBox="0 0 120 150" aria-hidden="true">
    <line x1="20" y1="118" x2="100" y2="118" />
    <rect x="76" y="84" width="18" height="34" />
    <line x1="76" y1="95" x2="94" y2="95" />
    <rect x="30" y="96" width="30" height="22" />
    <circle className="em" cx="85" cy="89" r="1.8" />
  </svg>,
];

export default function GalleryGrid({ projects }: { projects: SanityProject[] }) {
  const t = useTranslations("gallery");
  const locale = useLocale() as "tr" | "en";
  const [active, setActive] = useState<string>("all");

  const catLabel = (cat: SanityProject["category"]) =>
    cat ? cat.title?.[locale] || cat.title?.tr || cat.key : "";

  // Filter buttons are derived from whatever categories actually exist in
  // the data, so new categories added in the CMS show up automatically.
  const categories: { key: string; label: string }[] = [];
  for (const p of projects) {
    if (p.category && !categories.some((c) => c.key === p.category!.key)) {
      categories.push({ key: p.category.key, label: catLabel(p.category) });
    }
  }

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category?.key === active);

  return (
    <>
      <div className="filter-row">
        <button
          className="filter-btn"
          aria-pressed={active === "all"}
          onClick={() => setActive("all")}
        >
          {t("categories.all")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className="filter-btn"
            aria-pressed={active === cat.key}
            onClick={() => setActive(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {projects.length === 0 ? (
        <div className="works">
          {placeholderGlyphs.map((glyph, i) => (
            <div className="work" key={i}>
              {glyph}
              <div className="w-tag">
                <span className="w-name">{t("emptyState")}</span>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="empty-note">{t("emptyState")}</p>
      ) : (
        <div className="works">
          {filtered.map((project) => {
            const img = resolveImageUrl(project.coverImage, 600, 800);
            const title = project.title?.[locale] || project.title?.tr;
            return (
              <Link key={project._id} className="work" href={`/projeler/${project.slug.current}`}>
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt={title} loading="lazy" />
                ) : (
                  placeholderGlyphs[0]
                )}
                <span className="w-hover">{t("viewProject")}</span>
                <div className="w-tag">
                  <span className="w-name">{title}</span>
                  <span className="w-cat">{catLabel(project.category)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
