"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { resolveImageUrl } from "@/sanity/lib/image";
import type { SanityProject } from "@/sanity/lib/queries";

const placeholderGlyphs: Record<string, React.ReactNode> = {
  living: (
    <svg viewBox="0 0 120 150" aria-hidden="true">
      <path d="M40 120 L40 55 A20 20 0 0 1 80 55 L80 120" />
      <line x1="20" y1="120" x2="100" y2="120" />
      <line x1="60" y1="38" x2="60" y2="55" />
      <path d="M52 59 A8 8 0 0 1 68 59" />
      <line x1="52" y1="59" x2="68" y2="59" />
      <circle className="em" cx="60" cy="63" r="1.8" />
    </svg>
  ),
  bedroom: (
    <svg viewBox="0 0 120 150" aria-hidden="true">
      <rect x="24" y="70" width="72" height="40" />
      <line x1="24" y1="86" x2="96" y2="86" />
      <line x1="16" y1="120" x2="104" y2="120" />
      <circle className="em" cx="60" cy="60" r="1.8" />
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 120 150" aria-hidden="true">
      <line x1="20" y1="118" x2="100" y2="118" />
      <rect x="76" y="84" width="18" height="34" />
      <line x1="76" y1="95" x2="94" y2="95" />
      <rect x="30" y="96" width="30" height="22" />
      <circle className="em" cx="85" cy="89" r="1.8" />
    </svg>
  ),
  office: (
    <svg viewBox="0 0 120 150" aria-hidden="true">
      <line x1="20" y1="118" x2="100" y2="118" />
      <path d="M34 118 L34 96 C34 90,58 90,62 96 C68 94,70 108,67 118" />
      <line x1="62" y1="96" x2="62" y2="118" />
      <rect x="76" y="84" width="18" height="34" />
      <circle className="em" cx="85" cy="89" r="1.8" />
    </svg>
  ),
  furniture: (
    <svg viewBox="0 0 120 150" aria-hidden="true">
      <path d="M48 118 L50 100 L70 100 L72 118 Z" />
      <path d="M60 100 C56 86,50 82,46 78" />
      <path d="M60 100 C60 84,60 78,60 72" />
      <path d="M60 100 C64 88,69 84,72 81" />
      <ellipse cx="44" cy="74" rx="4" ry="7" transform="rotate(-30 44 74)" />
      <ellipse cx="60" cy="66" rx="4" ry="7" />
      <ellipse cx="74" cy="77" rx="4" ry="7" transform="rotate(28 74 77)" />
      <circle className="em" cx="60" cy="66" r="1.6" />
    </svg>
  ),
};

export default function GalleryGrid({ projects }: { projects: SanityProject[] }) {
  const t = useTranslations("gallery");
  const locale = useLocale() as "tr" | "en";
  const categories = t.raw("categories") as Record<string, string>;
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  const catKeys = ["living", "bedroom", "kitchen", "office", "furniture"];

  return (
    <>
      <div className="filter-row">
        <button
          className="filter-btn"
          aria-pressed={active === "all"}
          onClick={() => setActive("all")}
        >
          {categories.all}
        </button>
        {catKeys.map((key) => (
          <button
            key={key}
            className="filter-btn"
            aria-pressed={active === key}
            onClick={() => setActive(key)}
          >
            {categories[key]}
          </button>
        ))}
      </div>

      {projects.length === 0 ? (
        <div className="works">
          {catKeys.slice(0, 3).map((key) => (
            <div className="work" key={key}>
              {placeholderGlyphs[key]}
              <div className="w-tag">
                <span className="w-name">{categories[key]}</span>
                <span className="w-cat">{t("emptyState")}</span>
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
                  placeholderGlyphs[project.category]
                )}
                <span className="w-hover">{t("viewProject")}</span>
                <div className="w-tag">
                  <span className="w-name">{title}</span>
                  <span className="w-cat">{categories[project.category]}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
