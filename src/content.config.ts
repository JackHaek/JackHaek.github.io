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
    featured: z.boolean().default(false),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  schema: z.object({
    title:     z.string(),
    company:   z.string(),
    dateRange: z.string(),
    badge:     z.string().optional(),
    tags:      z.array(z.string()),
    accent:    z.boolean().default(false),
    order:     z.number(),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/education' }),
  schema: z.object({
    institution: z.string(),
    degree:      z.string(),
    year:        z.string(),
    details:     z.array(z.string()).optional(),
    order:       z.number(),
  }),
});

export const collections = { projects, blog, experience, education };

