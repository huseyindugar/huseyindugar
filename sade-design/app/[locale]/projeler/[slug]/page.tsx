import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("gallery");
  const categories = t.raw("categories") as Record<string, string>;
  const loc = locale as "tr" | "en";

  const title = project.title?.[loc] || project.title?.tr;
  const description = project.description?.[loc] || project.description?.tr;
  const coverUrl = project.coverImage
    ? urlForImage(project.coverImage)?.width(1600).height(900).url()
    : null;

  return (
    <section className="simple-page">
      <Link className="back-link" href="/#projeler">
        ← {t("title")}
      </Link>
      <div className="label">{categories[project.category]}</div>
      <h2>{title}</h2>
      {description && <p style={{ marginTop: "24px" }}>{description}</p>}

      <div className="project-hero-img">
        {coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverUrl} alt={title} />
        )}
      </div>

      {project.images && project.images.length > 0 && (
        <div className="project-images">
          {project.images.map((img, i) => {
            const url = img ? urlForImage(img)?.width(900).height(675).url() : null;
            return (
              <div key={i}>
                {url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt={`${title} ${i + 1}`} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
