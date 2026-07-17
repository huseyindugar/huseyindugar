import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function About() {
  const t = useTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];
  const facts = t.raw("facts") as { label: string; value: string }[];

  return (
    <section id="hakkimizda" className="deep">
      <div className="head-band edge-left">
        <Reveal className="kesit-head tight">
          <div className="label">{t("kicker")}</div>
          <h2 className="kesit-title">{t("title")}</h2>
        </Reveal>
      </div>
      <div className="wrap">
        <div className="about-grid">
          <Reveal>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <Reveal className="about-side">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="about-photo" src="/projects/villa-arnavutkoy-salon/1.jpg" alt="" loading="lazy" />
            <div className="about-facts">
              {facts.map((fact) => (
                <div className="fact" key={fact.label}>
                  <div className="f-label">{fact.label}</div>
                  <div className="f-val">{fact.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
