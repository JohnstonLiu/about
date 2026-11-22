import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publicationDate: z.date(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/index.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      descriptionLinks: z
        .array(
          z.object({
            text: z.string(),
            href: z.string(),
          }),
        )
        .default([]),
      date: z.date(),
      endDate: z.date().optional(),
      ongoing: z.boolean().default(false),
      technologies: z.array(z.string()).default([]),
      image: image().optional(),
      href: z.string(),
    }),
});

export const collections = { blog, projects };
