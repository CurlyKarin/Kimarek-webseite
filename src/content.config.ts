import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seiten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/seiten' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    kicker: z.string().optional(),
  }),
});

const termine = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/termine' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    portal: z.string().url(),
    wochen: z.array(
      z.object({
        name: z.string(),
        alter: z.string(),
        anreise: z.string(),
        abreise: z.string(),
        vorstellungen: z.array(z.string()),
      }),
    ),
  }),
});

const jahre = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jahre' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    alben: z.array(
      z.object({
        titel: z.string(),
        fotos: z.number(),
      }),
    ),
  }),
});

const aufstellungen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/aufstellungen' }),
  schema: z.object({
    titel: z.string(),
    order: z.number(),
    zeile: z.string(),
    bild: z.string().optional(),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    youtubeId: z.string().regex(/^[a-zA-Z0-9_-]{6,}$/),
    order: z.number(),
  }),
});

export const collections = { seiten, termine, jahre, aufstellungen, videos };
