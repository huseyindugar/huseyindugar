import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const photos = [
  "/projects/villa-tuzla-yatak-odasi/1.jpg",
  "/projects/restoran-projesi/1.jpg",
  "/projects/konut-projesi-mutfak/1.jpg",
  "/projects/loft-dairesi-yatak-odasi/2.jpg",
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="s-photo" src={photos[i]} alt="" loading="lazy" />
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
