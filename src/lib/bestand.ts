const bildDatei = /\.(jpe?g|png|webp|gif)$/i;

type Listung = {
  success?: boolean;
  result?: { key?: string }[];
  result_info?: { cursor?: string; is_truncated?: boolean };
};

let vorgang: Promise<string[] | null> | undefined;

function zugang() {
  const account = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const token = process.env.CLOUDFLARE_API_TOKEN?.trim();
  const bucket = process.env.CLOUDFLARE_R2_BUCKET?.trim() || 'kimarek-bilder';
  if (!account || !token) return undefined;
  return { account, token, bucket };
}

/** Alle Objektschlüssel. Null, wenn der Bau kein Leserecht hat. */
function schluessel(): Promise<string[] | null> {
  vorgang ??= lesen();
  return vorgang;
}

async function lesen() {
  const login = zugang();
  if (!login) return null;
  const namen: string[] = [];
  let cursor = '';
  for (;;) {
    const url = new URL(
      `https://api.cloudflare.com/client/v4/accounts/${login.account}/r2/buckets/${login.bucket}/objects`,
    );
    url.searchParams.set('per_page', '1000');
    if (cursor) url.searchParams.set('cursor', cursor);
    let antwort: Response;
    try {
      antwort = await fetch(url, {
        headers: { Authorization: `Bearer ${login.token}` },
      });
    } catch {
      return null;
    }
    if (!antwort.ok) return null;
    const daten = (await antwort.json()) as Listung;
    if (!daten.success || !Array.isArray(daten.result)) return null;
    for (const objekt of daten.result) {
      if (objekt.key) namen.push(objekt.key);
    }
    if (!daten.result_info?.is_truncated || !daten.result_info.cursor) return namen;
    cursor = daten.result_info.cursor;
  }
}

/** Dateinamen direkt in diesem Ordner. Null, wenn der Bau den Speicher nicht liest. */
export async function dateienAusBestand(ordner: string) {
  const alle = await schluessel();
  if (!alle) return null;
  const prefix = `${ordner}/`;
  return alle
    .filter((key) => {
      if (!key.startsWith(prefix)) return false;
      const name = key.slice(prefix.length);
      return name.length > 0 && !name.includes('/') && bildDatei.test(name);
    })
    .map((key) => key.slice(prefix.length))
    .sort((a, b) => a.localeCompare(b, 'de', { numeric: true }));
}
