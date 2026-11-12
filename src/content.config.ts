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
    // Letzter Ferientag, YYYY-MM-DD. Danach darf der Countdown neu beginnen.
    saisonEnde: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
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

// Ein Abschnitt ist ein Block: nur Text, Text dann Foto, oder Foto dann Text.
// Mit Foto ist der Textkasten so hoch wie das Bild. Das CMS pflegt später genau diese Liste.
const abschnitt = z
  .object({
    order: z.number(),
    bild: z.string().optional(),
    alt: z.string().optional(),
    zuerst: z.enum(['text', 'bild']).default('text'),
  })
  .refine((eintrag) => !eintrag.bild || Boolean(eintrag.alt?.trim()), {
    message: 'Zum Foto gehört ein Alt-Text.',
    path: ['alt'],
  });

const geschichte = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/geschichte' }),
  schema: abschnitt,
});

const ablauf = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ablauf' }),
  schema: abschnitt,
});

const vorstand = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vorstand' }),
  schema: abschnitt,
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    youtubeId: z.string().regex(/^[a-zA-Z0-9_-]{6,}$/),
    order: z.number(),
  }),
});

export const collections = { seiten, termine, jahre, geschichte, ablauf, vorstand, videos };
