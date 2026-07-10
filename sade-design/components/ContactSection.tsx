import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";

export default async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <section id="iletisim" className="deep">
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

        <div className="contact-grid">
          <Reveal>
            <h3 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "22px", marginBottom: "28px" }}>
              {t("directTitle")}
            </h3>

            <div className="c-line">
              <span className="label">{t("phoneLabel")}</span>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
            </div>
            <div className="c-line">
              <span className="label">{t("emailLabel")}</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div className="c-line">
              <a className="btn" href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                {t("whatsapp")}
              </a>
            </div>

            <div className="c-line">
              <span className="label">{t("followLabel")}</span>
              <div className="socials">
                <a className="soc" href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 30 30">
                    <rect x="4" y="4" width="22" height="22" rx="6" />
                    <circle cx="15" cy="15" r="5.4" />
                    <circle className="fl" cx="21.4" cy="8.8" r="1.5" />
                  </svg>
                  <span>{site.instagram.handle}</span>
                </a>
                <a className="soc" href={site.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 30 30">
                    <rect x="4" y="4" width="22" height="22" rx="6" />
                    <text x="15" y="19.5" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="500" fill="#283C35" stroke="none">
                      in
                    </text>
                  </svg>
                  <span>{site.linkedin.handle}</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
