import { SITE } from "@/siteConfig.ts";

type FormatOptions = {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  timeZone?: string;
};

export function formatDate(
  date: Date,
  options: FormatOptions = {},
  locale: string = SITE.locale,
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const hasCustomOptions = Object.keys(options).length > 0;
  const formatOptions = hasCustomOptions ? options : defaultOptions;

  return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}
