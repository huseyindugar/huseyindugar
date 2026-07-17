import { notFound } from "next/navigation";

// Any path under a valid locale that doesn't match a real page falls through
// to here, so it renders the branded [locale]/not-found.tsx instead of the
// framework's default global 404.
export default function CatchAllNotFound() {
  notFound();
}
