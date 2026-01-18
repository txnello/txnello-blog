import { glob } from "astro/loaders";
import { z, reference, defineCollection } from "astro:content";

const articles = defineCollection({
    loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./src/content/articles" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        slug: z.string(),
        snippet: z.string(),
        category: z.string(),
        pubDate: z.coerce.date(),
        isDraft: z.boolean().default(false),
        updatedDate: z.coerce.date().optional(),
        relatedArticles: z.array(z.string()).optional(),
    }),
});

export const collections = { articles };