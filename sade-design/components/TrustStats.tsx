import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function TrustStats() {
  const t = useTranslations("trust");
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section id="guven">
      <div className="content-band edge-right">
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
          <Reveal>
            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <div className="stat-val">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
