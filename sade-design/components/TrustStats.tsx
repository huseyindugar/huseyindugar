import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function TrustStats() {
  const t = await getTranslations("trust");
  const locale = (await getLocale()) as "tr" | "en";
  const settings = await getSiteSettings();

  const stats =
    settings?.stats && settings.stats.length > 0
      ? settings.stats.map((s) => ({
          value: s.value,
          label: s.label?.[locale] || s.label?.tr || "",
        }))
      : (t.raw("stats") as { value: string; label: string }[]);

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
            <div className="stats-band">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="stats-bg" src="/projects/villa-tuzla-teras/1.jpg" alt="" loading="lazy" />
              <div className="stats-grid">
                {stats.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <div className="stat-val">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
