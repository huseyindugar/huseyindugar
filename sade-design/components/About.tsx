import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function About() {
  const t = useTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];
  const facts = t.raw("facts") as { label: string; value: string }[];

  return (
    <section id="hakkimizda" className="deep">
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
        <div className="about-grid">
          <Reveal>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <Reveal className="about-side">
            {facts.map((fact) => (
              <div className="fact" key={fact.label}>
                <div className="f-label">{fact.label}</div>
                <div className="f-val">{fact.value}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
