import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { netzwerkNamen } from './lib/netzwerke';

const seiten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/seiten' }),
  schema: z.object({
    // Nur der Name in der Redaktionsliste. Die Überschrift bleibt title.
    liste: z.string().optional(),
    title: z.string(),
    description: z.string(),
    kicker: z.string().optional(),
    // Ordner im Bilderspeicher, oder der Pfad eines einzelnen Bildes.
    fotosOben: z.string().optional(),
    fotosBezeichnung: z.string().optional(),
    collage: z.string().optional(),
    hintergrund: z.string().optional(),
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
    // false blendet die Kalendererinnerung aus.
    kalendererinnerung: z.boolean().default(true),
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
    // Pfad im Bilder-Speicher. Leer: erstes Foto des ersten Albums.
    cover: z.string().optional(),
    alben: z.array(
      z.object({
        titel: z.string(),
        fotos: z.number(),
      }),
    ),
  }),
});

// Ein Abschnitt gehört zu einer Seite: nur Text, Text dann Foto, oder Foto dann Text.
const abschnitt = z
  .object({
    seite: z.string().min(1),
    order: z.number(),
    bild: z.string().optional(),
    alt: z.string().optional(),
    zuerst: z.enum(['text', 'bild']).default('text'),
  })
  .refine((eintrag) => !eintrag.bild || Boolean(eintrag.alt?.trim()), {
    message: 'Zum Foto gehört ein Alt-Text.',
    path: ['alt'],
  });

const abschnitte = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/abschnitte' }),
  schema: abschnitt,
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    youtubeId: z.string().regex(/^[a-zA-Z0-9_-]{6,}$/),
    order: z.number(),
    seiten: z.array(z.string().min(1)).min(1),
  }),
});

const datum = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional();

function mitKarte<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema
    .refine((eintrag) => !('bild' in eintrag && eintrag.bild) || Boolean(eintrag.alt?.trim()), {
      message: 'Zum Foto gehört ein Alt-Text.',
      path: ['alt'],
    })
    .refine((eintrag) => !('link' in eintrag && eintrag.link) || Boolean(eintrag.linkText?.trim()), {
      message: 'Zum Link gehört ein Linktext.',
      path: ['linkText'],
    });
}

const karte = {
  order: z.number(),
  title: z.string().optional(),
  link: z.string().optional(),
  linkText: z.string().optional(),
  bild: z.string().optional(),
  alt: z.string().optional(),
};

const rundum = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rundum' }),
  schema: mitKarte(z.object(karte)),
});

const foerderung = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/foerderung' }),
  schema: z
    .object({
      order: z.number(),
      title: z.string().optional(),
      link: z.string().optional(),
      linkText: z.string().optional(),
      bild: z.string().optional(),
      alt: z.string().optional(),
      // true: die Grafik selbst führt zur Adresse in link.
      bildLink: z.boolean().default(false),
    })
    .refine((eintrag) => !eintrag.bild || Boolean(eintrag.alt?.trim()), {
      message: 'Zum Foto gehört ein Alt-Text.',
      path: ['alt'],
    })
    .refine((eintrag) => !eintrag.link || eintrag.bildLink || Boolean(eintrag.linkText?.trim()), {
      message: 'Zum Link gehört ein Linktext, oder die Grafik wird zum Link.',
      path: ['linkText'],
    })
    .refine((eintrag) => !eintrag.bildLink || Boolean(eintrag.bild && eintrag.link), {
      message: 'Die verlinkte Grafik braucht ein Bild und eine Adresse.',
      path: ['bildLink'],
    }),
});

const aktuelles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/aktuelles' }),
  schema: mitKarte(
    z.object({
      ...karte,
      von: datum,
      bis: datum,
    }),
  ),
});

const netzwerke = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/netzwerke' }),
  schema: z
    .object({
      order: z.number(),
      title: z.string(),
      netzwerk: z.enum(netzwerkNamen),
      link: z.string().url(),
      bild: z.string().optional(),
      alt: z.string().optional(),
    })
    .refine((eintrag) => !eintrag.bild || eintrag.alt !== undefined, {
      message: 'Zum Foto gehört ein Alt-Text, leer wenn der Name daneben steht.',
      path: ['alt'],
    }),
});

export const collections = {
  seiten,
  termine,
  jahre,
  abschnitte,
  videos,
  aktuelles,
  rundum,
  foerderung,
  netzwerke,
};
