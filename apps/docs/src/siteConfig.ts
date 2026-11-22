import type { SiteConfiguration, SocialLinks } from "@/types.ts";

export const SITE: SiteConfiguration = {
  title: "johnston's docs",
  description: "Technical docs by Johnston Liu",
  href: "https://johnstonliu.me",
  author: "Johnston Liu",
  locale: "en-US",
};

export const SOCIAL_LINKS: SocialLinks = {
  personal: {
    label: "johnstonliu.me",
    href: "https://johnstonliu.me",
  },
  email: {
    label: "email",
    href: "mailto:johnstonliu2004@gmail.com",
  },
  github: {
    label: "github",
    href: "https://github.com/johnstonliu",
  },
  linkedin: {
    label: "linkedin",
    href: "https://linkedin.com/in/johnston-liu",
  },
};
