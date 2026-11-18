import betreuer from '../data/betreuer.json';
import gruppenfotos from '../data/gruppenfotos.json';
import jugend from '../data/jugend.json';
import kinder from '../data/kinder.json';
import zelt from '../data/zelt.json';
import { bild, bilderBasis } from './bilder';
import { pfad } from './pfad';

const bildDatei = /\.(jpe?g|png|webp|gif)$/i;

/** Bekannte Dateinamen, solange der Bilderspeicher keine Ordnerliste herausgibt. */
const bekannt: Record<string, string[]> = {
  'betreuer/wechsel': betreuer.wechsel,
  betreuer: betreuer.collage,
  'zelt/web': zelt.collage,
  kinder: kinder.collage,
  jugend: jugend.collage,
  'gruppenfotos/kinderwoche': gruppenfotos.kinderwoche,
  'gruppenfotos/jugendwoche': gruppenfotos.jugendwoche,
};

let listeGeht: boolean | null = null;

function sauber(angabe: string) {
  return angabe.trim().replace(/^\/+|\/+$/g, '');
}

async function speicherListet() {
  if (listeGeht !== null) return listeGeht;
  try {
    const antwort = await fetch(`${bilderBasis}/?list-type=2&prefix=zelt/web/&max-keys=1`);
    const text = await antwort.text();
    listeGeht = antwort.ok && text.includes('<Key>');
  } catch {
    listeGeht = false;
  }
  return listeGeht;
}

async function dateienAusSpeicher(ordner: string) {
  if (!(await speicherListet())) return null;
  const prefix = `${ordner}/`;
  const url = `${bilderBasis}/?list-type=2&prefix=${encodeURIComponent(prefix)}`;
  const antwort = await fetch(url);
  if (!antwort.ok) return null;
  const text = await antwort.text();
  const namen: string[] = [];
  for (const fund of text.matchAll(/<Key>([^<]+)<\/Key>/g)) {
    const key = fund[1].replaceAll('&amp;', '&');
    if (!key.startsWith(prefix) || key.endsWith('/')) continue;
    const name = key.slice(prefix.length);
    if (!name.includes('/') && bildDatei.test(name)) namen.push(name);
  }
  return namen.sort((a, b) => a.localeCompare(b, 'de', { numeric: true }));
}

/** Bilder eines Ordners. Ein Pfad zu einer einzelnen Datei bleibt ein Bild. */
export async function bilderImOrdner(angabe?: string) {
  const clean = angabe ? sauber(angabe) : '';
  if (!clean) return [];
  if (bildDatei.test(clean)) return [bild(clean)];
  const ausSpeicher = await dateienAusSpeicher(clean);
  const namen = ausSpeicher && ausSpeicher.length > 0 ? ausSpeicher : (bekannt[clean] ?? []);
  return namen.map((name) => bild(`${clean}/${name}`));
}

export function hintergrundAdresse(angabe?: string) {
  const clean = angabe ? sauber(angabe) : '';
  if (!clean) return undefined;
  if (angabe?.trim().startsWith('/')) return pfad(angabe.trim());
  return bild(clean);
}
