import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import { getSiteSettings } from "@/sanity/lib/queries";
import { resolveImageUrl } from "@/sanity/lib/image";

const defaultPhotos = [
  "/projects/villa-tuzla-salon/1.jpg",
  "/projects/loft-dairesi-salon/1.jpg",
  "/projects/konut-projesi-salon/1.jpg",
];

export default async function PhotoStrip() {
  const t = await getTranslations("photoStrip");
  const settings = await getSiteSettings();

  const cmsPhotos = (settings?.photoStripImages ?? [])
    .map((img, i) =>
      resolveImageUrl(img, i === 0 ? 1600 : 900, i === 0 ? 1200 : 600)
    )
    .filter((url): url is string => Boolean(url));

  const photos = [0, 1, 2].map((i) => cmsPhotos[i] ?? defaultPhotos[i]);

  return (
    <div className="photo-strip">
      <Reveal className="photo-strip-in">
        <div className="ps-large">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[0]} alt="" loading="lazy" />
          <span className="ps-caption">{t("caption")}</span>
        </div>
        <div className="ps-small-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[1]} alt="" loading="lazy" />
        </div>
        <div className="ps-small-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[2]} alt="" loading="lazy" />
        </div>
      </Reveal>
    </div>
  );
}
