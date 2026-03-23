import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    image: image().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    publishDate: z.coerce.date(),
    status: z.enum(['active', 'completed', 'archived']).default('completed'),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    image: image().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };

