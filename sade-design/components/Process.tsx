import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { no: string; title: string; desc: string }[];

  return (
    <section id="surec" className="deep">
      <div className="head-band edge-right">
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
      </div>
      <div className="wrap">
        <Reveal>
          <div className="steps">
            {steps.map((step) => (
              <div className="step" key={step.no}>
                <span className="st-node" />
                <span className="st-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
