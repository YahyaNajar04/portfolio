import { defineCollection} from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const metric = z.object({
      label: z.string(),
      value: z.string(),
      source: z.string().min(10, 'Say where this number actually came from.'),
});

const link = z.object({
      label: z.string(),
      url: z.string().url('Please provide a valid URL.'),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(200),
    year: z.number().int().min(2018).max(2100),

    status: z.enum(['shipped', 'in-development', 'archived', 'research']),
    role: z.string(),
    tier: z.enum(['case-study', 'secondary']),

    stack: z.array(z.string()).default([]),
    metrics: z.array(metric).default([]),
    links: z.array(link).default([]),

    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

const experience = defineCollection({
  loader: file('src/content/experience.json'),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    start: z.string(),          // "Oct 2023"
    end: z.string(),            // "Feb 2024" or "Present"
    order: z.number(),          // lower = more recent
    points: z.array(z.string()).max(3),
    stack: z.array(z.string()).default([]),
  }),
});

export const collections = {
      projects,
      experience,
}