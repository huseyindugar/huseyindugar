import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const glyphs = [
  // rolled plan
  <svg key="plan" viewBox="0 0 60 54">
    <path d="M8 44 L8 14 A6 6 0 0 1 20 14 L20 44" />
    <path d="M20 18 L50 18 L50 44 L14 44" />
    <line x1="26" y1="26" x2="44" y2="26" />
    <line x1="26" y1="32" x2="40" y2="32" />
    <circle className="em" cx="47" cy="41" r="1.8" />
  </svg>,
  // 3d cube
  <svg key="cube" viewBox="0 0 60 54">
    <path d="M30 8 L50 18 L50 38 L30 48 L10 38 L10 18 Z" />
    <path d="M10 18 L30 28 L50 18" />
    <line x1="30" y1="28" x2="30" y2="48" />
    <circle className="em" cx="30" cy="8" r="1.8" />
  </svg>,
  // key
  <svg key="key" viewBox="0 0 60 54">
    <circle cx="20" cy="27" r="9" />
    <circle cx="20" cy="27" r="3.5" />
    <line x1="29" y1="27" x2="50" y2="27" />
    <line x1="43" y1="27" x2="43" y2="34" />
    <line x1="50" y1="27" x2="50" y2="32" />
    <circle className="em" cx="20" cy="27" r="1.4" />
  </svg>,
  // swatch
  <svg key="swatch" viewBox="0 0 60 54">
    <rect x="10" y="12" width="14" height="14" />
    <rect x="17" y="19" width="14" height="14" />
    <rect x="24" y="26" width="14" height="14" />
    <line x1="46" y1="12" x2="46" y2="44" />
    <line x1="42" y1="44" x2="50" y2="44" />
    <circle className="em" cx="46" cy="12" r="1.8" />
  </svg>,
];

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section id="hizmetler">
      <div className="wrap">
        <Reveal className="kesit-head">
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
        <div className="svc-grid">
          {items.map((item, i) => (
            <Reveal key={item.title} className="svc">
              <div className="s-glyph">{glyphs[i]}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
