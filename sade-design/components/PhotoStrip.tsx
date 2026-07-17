import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function PhotoStrip() {
  const t = useTranslations("photoStrip");

  return (
    <div className="photo-strip">
      <Reveal className="photo-strip-in">
        <div className="ps-large">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/projects/villa-tuzla-salon/1.jpg" alt="" loading="lazy" />
          <span className="ps-caption">{t("caption")}</span>
        </div>
        <div className="ps-small-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/projects/loft-dairesi-salon/1.jpg" alt="" loading="lazy" />
        </div>
        <div className="ps-small-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/projects/konut-projesi-salon/1.jpg" alt="" loading="lazy" />
        </div>
      </Reveal>
    </div>
  );
}
