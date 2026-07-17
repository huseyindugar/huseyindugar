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
          <h2 className="kesit-title">{t("title")}</h2>
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
              <a className="btn btn-wa" href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
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
                    <rect x="2" y="2" width="26" height="26" rx="4" fill="#0A66C2" />
                    {/* official LinkedIn "in" glyph (Font Awesome linkedin-in path, 448x512) */}
                    <g transform="translate(7.55, 6.5) scale(0.0332)">
                      <path
                        fill="#fff"
                        d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 148.9z"
                      />
                    </g>
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
