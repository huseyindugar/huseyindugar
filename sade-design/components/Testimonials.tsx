import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import { getTestimonials } from "@/sanity/lib/queries";
import { site } from "@/lib/site";

export default async function Testimonials() {
  const t = await getTranslations("testimonials");
  const locale = (await getLocale()) as "tr" | "en";
  const testimonials = await getTestimonials();

  return (
    <section id="referanslar" className="deep">
      <div className="wrap">
        <Reveal className="kesit-head tight">
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

        {testimonials.length === 0 ? (
          <p className="empty-note">{t("emptyState")}</p>
        ) : (
          <Reveal>
            <div className="testi-grid">
              {testimonials.map((item) => (
                <div className="testi-card" key={item._id}>
                  {item.rating && (
                    <div className="testi-stars" aria-hidden="true">
                      {"★".repeat(item.rating)}
                      {"☆".repeat(5 - item.rating)}
                    </div>
                  )}
                  <p className="testi-quote">
                    “{item.quote?.[locale] || item.quote?.tr}”
                  </p>
                  <div>
                    <div className="testi-name">{item.name}</div>
                    {item.projectType && (
                      <div className="testi-type">{item.projectType}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <div className="google-cta">
          <a className="btn" href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
            {t("googleCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
