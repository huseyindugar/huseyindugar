import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <section className="simple-page">
      <h2>{t("title")}</h2>
      <p>{t("intro")}</p>
      {sections.map((s) => (
        <div key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </section>
  );
}
