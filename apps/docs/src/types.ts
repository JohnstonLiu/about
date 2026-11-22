export type SiteConfiguration = {
  title: string;
  description: string;
  url: string;
  author: string;
  locale: string;
};

export type SocialLinks = {
  [key: string]: SocialLink;
};

export type SocialLink = {
  label: string;
  href: string;
};
