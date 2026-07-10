import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="site-footer">
      <div className="foot-in">
        <div className="foot-brand">
          <span className="foot-mark">SADE</span>
          <span className="foot-tagline">{t("tagline")}</span>
        </div>
        <span className="foot-note">
          © {new Date().getFullYear()} {t("rights")}
        </span>
        <div className="foot-links">
          <Link href="/gizlilik-politikasi">{t("privacyLink")}</Link>
        </div>
      </div>
    </footer>
  );
}
