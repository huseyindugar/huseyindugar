import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import GalleryGrid from "./GalleryGrid";
import { getProjects } from "@/sanity/lib/queries";

export default async function Gallery() {
  const t = await getTranslations("gallery");
  const projects = await getProjects();

  return (
    <section id="projeler">
      <div className="head-band edge-right">
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
      </div>
      <div className="wrap">
        <Reveal>
          <GalleryGrid projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}
