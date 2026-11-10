import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

function icsText(wert: string) {
  return wert
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\n|\r/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

/** Zeilen nach 75 Bytes falten, wie es der Kalenderstandard erwartet. */
function falten(zeile: string) {
  const bytes = new TextEncoder();
  const teile: string[] = [];
  let rest = zeile;
  let erste = true;
  while (bytes.encode(rest).length > (erste ? 75 : 74)) {
    let ende = Math.min(rest.length, erste ? 75 : 74);
    while (bytes.encode(rest.slice(0, ende)).length > (erste ? 75 : 74)) ende -= 1;
    teile.push(`${erste ? '' : ' '}${rest.slice(0, ende)}`);
    rest = rest.slice(ende);
    erste = false;
  }
  teile.push(`${erste ? '' : ' '}${rest}`);
  return teile.join('\r\n');
}

export const GET: APIRoute = async () => {
  const termine = await getCollection('termine');
  const aktuell = termine.sort((a, b) => b.data.year - a.data.year)[0];
  const jahr = aktuell?.data.year ?? new Date().getUTCFullYear();
  const portal = aktuell?.data.portal ?? 'https://www.unser-ferienprogramm.de/kimarek/index.php';
  const stempel = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const zeilen = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kinderzirkus Kimarek//Anmeldung//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Anmeldung Kinderzirkus Kimarek',
    'BEGIN:VEVENT',
    'UID:anmeldung@kimarek.de',
    `DTSTAMP:${stempel}`,
    `DTSTART:${jahr}0201T080000Z`,
    `DTEND:${jahr}0201T090000Z`,
    'RRULE:FREQ=YEARLY',
    falten(`SUMMARY:${icsText('Anmeldung Kinderzirkus Kimarek')}`),
    falten(
      `DESCRIPTION:${icsText(`Die Anmeldung öffnet jedes Jahr am 1. Februar um 9 Uhr.\nAnmeldeportal: ${portal}`)}`,
    ),
    falten(`URL:${portal}`),
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    falten(`DESCRIPTION:${icsText('Morgen öffnet die Anmeldung für den Kinderzirkus Kimarek.')}`),
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return new Response(`${zeilen.join('\r\n')}\r\n`, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="kimarek-anmeldung.ics"',
    },
  });
};
