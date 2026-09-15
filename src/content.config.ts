import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { site } from './content/site.config';
const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string().min(1),
    authors: z.array(z.object({ name: z.string().min(1), url: z.url().optional(), did: z.string().optional() })).min(1),
    date: z.coerce.date(),
    summary: z.string().min(1),
    draft: z.boolean().default(false),
    atUri: z.string().regex(/^at:\/\/[^/]+\/[^/]+\/[^/]+$/).optional(),
    publication: z.string().default(site.publication),
    lexicon: z.enum(['site.standard.document', 'coop.lexicon.document']).optional(),
  }),
});
export const collections = { writing };
