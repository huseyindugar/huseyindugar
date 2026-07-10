"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="lang-switch">
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          aria-current={loc === locale}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
