import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const glyphs = [
  // floor plan with dimension line + door swing — İç Mimari Proje
  <svg key="plan" viewBox="0 0 84 84">
    <rect x="14" y="12" width="56" height="46" />
    <line x1="42" y1="12" x2="42" y2="58" className="thin" />
    <path className="thin" d="M42 30 A14 14 0 0 1 56 44" />
    <line x1="42" y1="30" x2="42" y2="44" className="bold" />
    <line className="thin" x1="14" y1="66" x2="70" y2="66" />
    <line className="thin" x1="14" y1="63" x2="14" y2="69" />
    <line className="thin" x1="70" y1="63" x2="70" y2="69" />
    <circle className="em" cx="24" cy="22" r="2.2" />
  </svg>,
  // isometric room inside a viewfinder frame — 3D Görselleştirme
  <svg key="cube" viewBox="0 0 84 84">
    <path className="f1" d="M42 10 L68 25 L42 40 L16 25 Z" />
    <path className="f2" d="M16 25 L42 40 L42 70 L16 55 Z" />
    <path className="f4" d="M68 25 L42 40 L42 70 L68 55 Z" />
    <path className="em-stroke" d="M6 6 L6 17 M6 6 L17 6" />
    <path className="em-stroke" d="M78 6 L78 17 M78 6 L67 6" />
    <path className="em-stroke" d="M6 78 L6 67 M6 78 L17 78" />
    <path className="em-stroke" d="M78 78 L78 67 M78 78 L67 78" />
  </svg>,
  // key with a house-shaped bow — Anahtar Teslim Uygulama
  <svg key="key" viewBox="0 0 84 84">
    <path d="M28 20 L42 9 L56 20 L56 36 L28 36 Z" />
    <rect className="f2" x="35" y="25" width="8" height="11" />
    <line className="bold" x1="42" y1="36" x2="42" y2="68" />
    <line className="bold" x1="42" y1="55" x2="53" y2="55" />
    <line className="bold" x1="42" y1="63" x2="50" y2="63" />
    <circle className="em" cx="42" cy="68" r="3" />
  </svg>,
  // paint-swatch fan + brush — Dekorasyon Danışmanlığı
  <svg key="swatch" viewBox="0 0 84 84">
    <rect className="f1" x="13" y="32" width="20" height="20" rx="3" transform="rotate(-14 23 42)" />
    <rect className="f2" x="26" y="27" width="20" height="20" rx="3" transform="rotate(-3 36 37)" />
    <rect className="f3" x="39" y="25" width="20" height="20" rx="3" transform="rotate(8 49 35)" />
    <rect className="f4" x="52" y="29" width="20" height="20" rx="3" transform="rotate(18 62 39)" />
    <line className="bold" x1="58" y1="60" x2="70" y2="72" />
    <circle className="em" cx="70" cy="72" r="3" />
  </svg>,
];

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section id="hizmetler">
      <div className="content-band edge-left">
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
      </div>
    </section>
  );
}
