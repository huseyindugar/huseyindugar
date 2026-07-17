import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <header className="hero" id="top">
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />

      <svg className="hero-drawing" viewBox="0 0 300 150" aria-hidden="true">
        <line className="draw" style={{ "--len": 230 } as React.CSSProperties} x1="35" y1="128" x2="265" y2="128" />
        <line className="draw thin" style={{ "--len": 6, animationDelay: ".2s" } as React.CSSProperties} x1="35" y1="128" x2="35" y2="134" />
        <line className="draw thin" style={{ "--len": 6, animationDelay: ".3s" } as React.CSSProperties} x1="92.5" y1="128" x2="92.5" y2="134" />
        <line className="draw thin" style={{ "--len": 6, animationDelay: ".4s" } as React.CSSProperties} x1="150" y1="128" x2="150" y2="134" />
        <line className="draw thin" style={{ "--len": 6, animationDelay: ".5s" } as React.CSSProperties} x1="207.5" y1="128" x2="207.5" y2="134" />
        <line className="draw thin" style={{ "--len": 6, animationDelay: ".6s" } as React.CSSProperties} x1="265" y1="128" x2="265" y2="134" />

        <path className="draw" style={{ "--len": 240, animationDelay: ".25s" } as React.CSSProperties} d="M116 128 L116 62 A34 34 0 0 1 184 62 L184 128" />
        <path className="draw thin" style={{ "--len": 222, animationDelay: ".45s" } as React.CSSProperties} d="M121 128 L121 63 A29 29 0 0 1 179 63 L179 128" />

        <line className="draw" style={{ "--len": 26, animationDelay: ".9s" } as React.CSSProperties} x1="150" y1="36" x2="150" y2="62" />
        <path className="draw" style={{ "--len": 35, animationDelay: "1.1s" } as React.CSSProperties} d="M139 66 A11 11 0 0 1 161 66" />
        <line className="draw" style={{ "--len": 22, animationDelay: "1.2s" } as React.CSSProperties} x1="139" y1="66" x2="161" y2="66" />
        <circle className="ember fade-late" cx="150" cy="71" r="2.4" />

        <path className="draw" style={{ "--len": 100, animationDelay: ".7s" } as React.CSSProperties} d="M62 128 L62 103 A15 9 0 0 1 92 103 L92 128" />
        <path className="draw" style={{ "--len": 50, animationDelay: ".95s" } as React.CSSProperties} d="M92 103 C97 88,98 72,96 62" />
        <path className="draw thin" style={{ "--len": 37, animationDelay: "1.15s" } as React.CSSProperties} d="M65 87 C70 73,82 73,95 77" />

        <path className="draw" style={{ "--len": 66, animationDelay: ".8s" } as React.CSSProperties} d="M216 128 L217.5 112 L232.5 112 L234 128 Z" />
        <path className="draw thin" style={{ "--len": 25, animationDelay: "1.05s" } as React.CSSProperties} d="M225 112 C222 100,216 96,212 92" />
        <path className="draw thin" style={{ "--len": 27, animationDelay: "1.15s" } as React.CSSProperties} d="M225 112 C225 98,225 92,225 86" />
        <path className="draw thin" style={{ "--len": 21, animationDelay: "1.25s" } as React.CSSProperties} d="M225 112 C228 102,233 98,236 95" />
        <ellipse className="draw thin" style={{ "--len": 29, animationDelay: "1.5s" } as React.CSSProperties} cx="210" cy="88" rx="3.2" ry="6" transform="rotate(-30 210 88)" />
        <ellipse className="draw thin" style={{ "--len": 29, animationDelay: "1.6s" } as React.CSSProperties} cx="225" cy="81" rx="3.2" ry="6" />
        <ellipse className="draw thin" style={{ "--len": 29, animationDelay: "1.7s" } as React.CSSProperties} cx="238" cy="91" rx="3.2" ry="6" transform="rotate(28 238 91)" />
      </svg>

      <div className="hero-note fade-late">{t("kicker")}</div>

      <h1 className="wordmark">{t("wordmark")}</h1>
      <p className="wordsub">{t("subtitle")}</p>

      <div className="hero-rule" aria-hidden="true">
        <span className="hr-line" />
        <span className="hr-dot" />
        <span className="hr-line" />
      </div>

      <p className="tagline">{t("tagline")}</p>
      <p className="hero-lede">{t("lede")}</p>

      <div className="hero-ctas">
        <Link className="btn btn-solid" href="/#iletisim">
          {t("ctaPrimary")}
        </Link>
        <Link className="btn" href="/#projeler">
          {t("ctaSecondary")}
        </Link>
      </div>
    </header>
  );
}
