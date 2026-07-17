import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";

export default async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <section id="iletisim" className="deep">
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
                    <defs>
                      <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="15%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="65%" stopColor="#d6249f" />
                        <stop offset="100%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <rect x="2" y="2" width="26" height="26" rx="7" fill="url(#igGrad)" />
                    <rect x="9" y="9" width="12" height="12" rx="4" fill="none" stroke="#fff" strokeWidth="1.6" />
                    <circle cx="15" cy="15" r="3.4" fill="none" stroke="#fff" strokeWidth="1.6" />
                    <circle cx="21.2" cy="8.8" r="1.1" fill="#fff" />
                  </svg>
                  <span>{site.instagram.handle}</span>
                </a>
                <a className="soc" href={site.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 30 30">
                    <rect x="2" y="2" width="26" height="26" rx="6" fill="#0A66C2" />
                    <circle cx="9.7" cy="10.4" r="2" fill="#fff" />
                    <rect x="8.1" y="13.4" width="3.2" height="9.4" fill="#fff" />
                    <path d="M14.4 13.4h3.1v1.7c.6-1.1 2-1.9 3.7-1.9 3.5 0 4.5 2 4.5 5.2v6.4h-3.2v-5.8c0-1.6-.6-2.8-2.2-2.8-1.2 0-1.9.8-2.3 1.6-.1.3-.2.7-.2 1.1v5.9h-3.2V13.4Z" fill="#fff" />
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
