# Zugang zur Website

Eine Person pflegt die Website im Browser. Dafür braucht sie zwei getrennte Zugänge: ein GitHub-Konto für die Redaktion und einen Zugang zum Bilderspeicher bei Cloudflare. Die Redaktion schreibt Texte. Fotos liegen im Bilderspeicher, im Repository steht nur der Pfad.

Die Schritte bleiben dieselben, wenn der Verein das Repository in der eigenen GitHub-Organisation hat. Es ändern sich dann die Adressen in der Tabelle unten, und die Anmeldung in der Redaktion läuft über den Button „Mit GitHub anmelden“.

## Derzeit

| | |
| --- | --- |
| Repository | `CurlyKarin/Kimarek-webseite` |
| Redaktion | https://curlykarin.github.io/Kimarek-webseite/admin/ |
| Vorschau der Website | https://curlykarin.github.io/Kimarek-webseite/ |
| Öffentliche Website | noch die bisherige Seite unter www.kimarek.de |
| Bilderspeicher | Cloudflare, Bucket `kimarek-bilder` |
| Anmeldung in der Redaktion | mit Token |

Das Repository und der Bilderspeicher liegen bis zur Übernahme bei einer Person, nicht beim Verein. Eine Einladung gilt für die Zeit der Mitarbeit und wird danach wieder entzogen. In der Organisation des Vereins bleibt die Mitgliedschaft, solange die Person Inhalte pflegen soll.

## GitHub-Konto

Ohne GitHub-Konto legt die Person zuerst ein kostenloses Konto an:

1. https://github.com/signup öffnen.
2. Ein Konto mit einer E-Mail anlegen, die sie selbst liest, und die E-Mail bestätigen.
3. Den Benutzernamen an die Person schicken, die das Repository verwaltet.

Ein Konto allein darf das öffentliche Repository ansehen. Speichern geht erst nach der Einladung.

## Einladung zum Repository

Wer das Repository verwaltet, lädt die Person mit Schreibrecht ein.

Liegt das Repository bei einer einzelnen Person: im Repository unter Einstellungen, Mitarbeiter, Person hinzufügen. Rolle **Schreiben**. Damit lassen sich Inhalte ändern. Einstellungen, Mitglieder und das Löschen des Repositorys bleiben bei der verwaltenden Person.

Liegt das Repository in der Organisation des Vereins: die Person wird Mitglied der Organisation und bekommt Schreibrecht auf dem Repository der Website.

Die Person nimmt die Einladung in der E-Mail an.

## Bilderspeicher

Cloudflare lädt eine E-Mail ein, keinen GitHub-Namen. Die Anmeldung bei GitHub und die beim Bilderspeicher bleiben zwei Konten.

Wer das Cloudflare-Konto verwaltet, öffnet dort Mitglieder, dann Mitglieder einladen:

1. Die E-Mail des Cloudflare-Kontos eintragen. Hat die Person noch keins, die primäre E-Mail ihres GitHub-Kontos nehmen. Die steht auf GitHub unter Einstellungen, E-Mails, als Primary. Eine Adresse auf `users.noreply.github.com` eignet sich nicht. Ist sie dort primär, stellt die Person vorher eine normale E-Mail als primär ein.
2. Eine Berechtigung für das ganze Konto anlegen, nicht für eine einzelne Domain. Rolle **Cloudflare R2 Admin**. Das betrifft den Bilderspeicher. Die Rolle Super-Administrator bleibt bei der verwaltenden Person.
3. Einladung senden.

Hat die Person schon ein Cloudflare-Konto, muss die eingeladene Adresse die dieses Kontos sein. Sie nimmt die Einladung dort an und wählt im Dashboard oben dieses Konto aus. Ihr eigenes Konto bleibt getrennt. Den Bucket sieht sie nur, solange das Konto der Website ausgewählt ist.

Hat sie noch keins, öffnet sie die Einladung und legt das Konto mit derselben E-Mail an. Passt die Adresse zur primären E-Mail bei GitHub, kann sie „Mit GitHub anmelden“ wählen.

## In der Redaktion anmelden

Die Redaktion ist die Adresse aus der Tabelle, im Browser. Es wird nichts heruntergeladen.

Solange die Anmeldung in der Tabelle „mit Token“ heißt, legt die Person einen Token an:

1. https://github.com/settings/personal-access-tokens öffnen und einen fine-grained Token erzeugen.
2. Nur das Repository der Website auswählen.
3. Berechtigung **Contents: Lesen und Schreiben**. Für eine kurze Mitarbeit ein kurzes Ablaufdatum wählen.
4. Den Token einmal in einen Passwortspeicher kopieren. GitHub zeigt ihn danach nicht wieder. Er wird nicht weitergeschickt.
5. In der Redaktion die Anmeldung mit Token wählen und ihn einfügen. Er bleibt in diesem Browser.

Steht die Anmeldehilfe des Vereins, entfällt der Token. Die Person wählt „Mit GitHub anmelden“ und bestätigt das Konto, das zum Repository eingeladen wurde.

## Etwas ändern

1. In der Redaktion den Eintrag öffnen, den Text ändern und speichern.
2. Die Änderung wird ein Commit auf dem Zweig `main`.
3. GitHub baut die Seite neu. Nach wenigen Minuten steht sie auf der Vorschau-Adresse. Auf dem Handy hilft oft ein Neuladen.

Bis die Domain umgezogen ist, bleibt www.kimarek.de die bisherige Seite. Danach erscheint dieselbe Speicherung auf www.kimarek.de.

Wer zusätzlich eine Kopie des Repositorys auf dem eigenen Rechner hat, holt den Commit mit einem Pull, sonst fehlt er dort.

## Ein Foto hinzufügen

Fotos von Kindern, Galerie, Team und Vorstand kommen nicht ins Repository und nicht in `public/media`. Dort liegen nur die kleinen Dateien der Website, etwa das Logo. Die Originale und die Einwilligungen bleiben beim Verein. In den Bilderspeicher kommt eine vorbereitete Datei: JPG oder WebP, webgroß, neutraler Dateiname, ohne Aufnahmeort und andere Kameradaten.

1. Im Cloudflare-Dashboard den Bucket aus der Tabelle öffnen und die Datei in den Ordner der Seite legen. Ein Foto neben einem Text gehört nach `{seite}/abschnitte/`, zum Beispiel `vorstand/abschnitte/demo.jpg`.
2. In der Redaktion beim Abschnitt unter **Bild** diesen Pfad eintragen und unter **Alt** einen kurzen Satz, was darauf zu sehen ist. Ohne Alt-Text schlägt der nächste Bau der Seite fehl.
3. Speichern und die Vorschau neu laden.

Titelfotos, Collagen und Galerie-Alben sind Ordner. Die Redaktion trägt den Ordner einmal ein, nicht einzelne Dateinamen. Weitere Fotos kommen in diesen Ordner im Bilderspeicher. Der nächste Bau der Seite liest den Ordner und zeigt die Bilder. Ein Speichern in der Redaktion stößt den Bau an.

Bei der Galerie heißt der Ordner `galerie/2027/woche-1`, `galerie/2027/woche-2` oder `galerie/2027/jugendwoche`, mit dem jeweiligen Jahr.

## Einmalig am Repository

Der Bau braucht ein Leserecht auf dem Bucket. Dafür liegen `CLOUDFLARE_ACCOUNT_ID` und `CLOUDFLARE_API_TOKEN` bei den Geheimnissen der Veröffentlichung. Der Token darf den Speicher nur lesen. Er steht nicht in der Redaktion und nicht im Ordner der Website. Die öffentliche Adresse des Speichers gibt keine Ordnerliste heraus, der Bau liest die Ordner mit diesem Recht.

## Was so nicht geht

- Neue Seiten anlegen oder Seiten löschen. Die festen Seiten lassen sich ändern.
- Den Menüpunkt ändern. Der Titel in der Redaktion ist die Überschrift auf der Seite. Das Menü ist eine eigene Liste.
- Fotos über einen Upload in der Redaktion in den Bilderspeicher legen. Die Redaktion speichert den Pfad.
