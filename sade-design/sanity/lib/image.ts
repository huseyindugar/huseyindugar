import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";
import type { ImageRef } from "./queries";

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export function urlForImage(source: SanityImageSource) {
  return builder ? builder.image(source) : null;
}

/**
 * Resolves either a Sanity image reference or a plain public/ path (used by
 * the static seed content in content/projects.ts) to a usable <img src>.
 */
export function resolveImageUrl(
  image: ImageRef,
  width?: number,
  height?: number
): string | null {
  if (!image) return null;
  if (typeof image === "string") return image;
  let b = urlForImage(image);
  if (!b) return null;
  if (width) b = b.width(width);
  if (height) b = b.height(height);
  return b.url();
}
