import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { SITE } from "@/siteConfig";

export const GET: APIRoute = async () => {
  const blog = await getCollection("blog");
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publicationDate,
      link: `/blog/${post.id}/`,
    })),
  });
};
