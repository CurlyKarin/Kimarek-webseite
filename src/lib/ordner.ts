import betreuer from '../data/betreuer.json';
import gruppenfotos from '../data/gruppenfotos.json';
import jugend from '../data/jugend.json';
import kinder from '../data/kinder.json';
import zelt from '../data/zelt.json';
import { dateienAusBestand } from './bestand';
import { bild } from './bilder';
import { pfad } from './pfad';

const bildDatei = /\.(jpe?g|png|webp|gif)$/i;

/** Reserve, wenn der Bau den Bilderspeicher nicht lesen kann. */
const bekannt: Record<string, string[]> = {
  'betreuer/titelfotos': betreuer.wechsel,
  'betreuer/collage': betreuer.collage,
  'zelt/collage': zelt.collage,
  'kinderwoche/collage': kinder.collage,
  'jugendwoche/collage': jugend.collage,
  'kinderwoche/titelfotos': gruppenfotos.kinderwoche,
  'jugendwoche/titelfotos': gruppenfotos.jugendwoche,
};

function sauber(angabe: string) {
  return angabe.trim().replace(/^\/+|\/+$/g, '');
}

/** Bilder eines Ordners. Ein Pfad zu einer einzelnen Datei bleibt ein Bild. */
export async function bilderImOrdner(angabe?: string) {
  const clean = angabe ? sauber(angabe) : '';
  if (!clean) return [];
  if (bildDatei.test(clean)) return [bild(clean)];
  const ausBestand = await dateienAusBestand(clean);
  const namen = ausBestand ?? bekannt[clean] ?? [];
  return namen.map((name) => bild(`${clean}/${name}`));
}

export function hintergrundAdresse(angabe?: string) {
  const clean = angabe ? sauber(angabe) : '';
  if (!clean) return undefined;
  if (angabe?.trim().startsWith('/')) return pfad(angabe.trim());
  return bild(clean);
}
