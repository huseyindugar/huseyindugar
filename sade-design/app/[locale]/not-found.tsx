import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="simple-page" style={{ textAlign: "center" }}>
      <div className="label">{t("kicker")}</div>
      <h2>{t("title")}</h2>
      <p>{t("body")}</p>
      <Link className="btn" href="/" style={{ marginTop: "32px", display: "inline-block" }}>
        {t("cta")}
      </Link>
    </section>
  );
}
