# Lahev & Tvar — personalizace lahví San Benedetto

Statický e-shop (čisté HTML/CSS/JS, bez buildu a bez backendu), který jde
rovnou nahrát na **GitHub Pages**. Zákazník si vybere láhev San Benedetto,
nahraje fotku, PDF nebo jiný soubor a hned vidí, jak bude motiv vypadat na
etiketě — motiv jde v náhledu posunout, zvětšit/zmenšit a otočit.

> **Právní upozornění:** San Benedetto je registrovaná ochranná známka a
> fotky použité v `assets/` jsou reálné produktové fotky této značky.
> Pokud nemáte s San Benedetto (nebo držitelem práv k těmto fotkám) dohodu
> o používání jejich jména a fotografií pro prodej personalizovaných lahví,
> doporučujeme si to před spuštěním e-shopu ověřit — nejde o právní radu,
> jen o praktické upozornění. Nic v kódu tomu nebrání, ale komerční použití
> cizí ochranné známky bez souhlasu může být problém.

## Soubory

- `index.html` — struktura stránky
- `styles.css` — vzhled
- `app.js` — vykreslení fotky láhve + motivu na `<canvas>`, nahrávání souboru, košík, objednávka, doprava, Supabase
- `assets/` — produktové fotky lahví
- `supabase/setup.sql` — SQL skript pro založení tabulky objednávek v Supabase (spustíte jednorázově v jejich SQL Editoru)

Žádné další závislosti se neinstalují. Externí věci, které se načítají
z CDN přímo v prohlížeči (ne při vývoji): knihovna **pdf.js**
(`cdnjs.cloudflare.com`, jen když zákazník nahraje PDF) a knihovna
**@supabase/supabase-js** (`cdn.jsdelivr.net`, pro zápis objednávek do
databáze — viz níže).

## Jak to funguje

- Základem každého produktu je skutečná fotka láhve San Benedetto z
  `assets/`. Souřadnice oblasti etikety (kam se motiv vkládá) jsou pro
  každou fotku ručně změřené a uložené v `PRODUCTS` v `app.js`
  (`label: {x, y, w, h}` jako podíl šířky/výšky fotky).
- Nahraný obrázek se ořízne přesně do této oblasti — tím se zároveň úplně
  překryje původní "YOUR LOGO" grafika na fotce, takže žádnou verzi s
  prázdnou etiketou navíc nepotřebujete. Uživatel motiv může tažením
  posunout, posuvníky zvětšit/zmenšit a natočit.
- Při kliknutí na *Přidat do košíku* se aktuální náhled uloží jako obrázek
  (`canvas.toDataURL`) a spolu s objednávkou zůstává v košíku
  (`localStorage`), takže přežije i obnovení stránky.
- Protože jde o čistě statický web, **objednávka se neposílá na server** —
  tlačítko *Odeslat objednávku e-mailem* jen otevře e-mailového klienta
  s předvyplněným textovým souhrnem (produkty, barvy, ks, cena, adresa).
  Skutečné soubory s motivy je potřeba zákazníkovi nechat poslat zvlášť,
  nebo si na to případně doplnit vlastní upload endpoint.

## Nasazení na GitHub Pages

1. Vytvořte nový repozitář na GitHubu (např. `lahev-tvar`).
2. Nahrajte do něj `index.html`, `styles.css`, `app.js`, celou složku
   `assets/` a složku `supabase/` (musí zůstat ve stejné relativní cestě)
   — buď přes web rozhraní ("Add file → Upload files"), nebo přes git:

   ```bash
   git init
   git add index.html styles.css app.js assets supabase
   git commit -m "Prvni verze e-shopu"
   git branch -M main
   git remote add origin https://github.com/VASE-JMENO/lahev-tvar.git
   git push -u origin main
   ```

3. V repozitáři jděte do **Settings → Pages**.
4. U "Build and deployment" vyberte **Deploy from a branch**, větev `main`
   a složku `/ (root)`. Uložte.
5. Po chvíli se stránka objeví na adrese
   `https://VASE-JMENO.github.io/lahev-tvar/`.

## Co si případně doplnit později

- **Skutečné platby** — je potřeba platební brána (Stripe, Comgate, GoPay…),
  což vyžaduje alespoň malý server nebo serverless funkci (GitHub Pages sama
  o sobě žádný kód na pozadí spouštět neumí).
- **Skutečné odesílání souborů** — dnes se soubor zpracuje jen v prohlížeči
  zákazníka pro náhled; pro reálnou výrobu je potřeba nahrávání na úložiště
  (např. přes formulářovou službu typu Formspree, nebo vlastní backend).
- Změna e-mailu v `app.js` (`objednavky@lahev-tvar.cz`) na váš skutečný
  kontaktní e-mail.
- Ceny, texty, kategorie i cenové hladiny podle množství jsou v poli
  `PRODUCTS` na začátku `app.js`. Přidání dalšího produktu = přidat další
  objekt se stejnou strukturou (SKU, kategorie, štítky, `priceTiers`,
  fotka + změřené souřadnice `label`).
- Filtr kategorií nad mřížkou produktů se generuje automaticky ze všech
  hodnot v poli `categories` napříč produkty — nic se nemusí ručně nastavovat.

## Odesílání objednávek (notifikace o nové objednávce)

Objednávky se posílají přes **Formspree** (bezplatná služba, 50 odeslání/měsíc),
která pošle e-mail rovnou ze serveru — na rozdíl od `mailto:` odkazu tedy
zákazník nemusí nic potvrzovat ve své vlastní e-mailové aplikaci.

**Nastavení před spuštěním naostro:**
1. Založte si účet na [formspree.io](https://formspree.io) (stačí bezplatný plán).
2. Vytvořte nový formulář, jako cílovou e-mailovou adresu nastavte
   **zvolanek.info@gmail.com** a potvrďte ji — tam vám budou objednávky chodit.
3. Zkopírujte ID formuláře z adresy tvaru `https://formspree.io/f/xxxxxxxx`.
4. V `app.js` najděte řádek `const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';`
   a `YOUR_FORM_ID` nahraďte svým ID.

Dokud tam zůstane `YOUR_FORM_ID`, web automaticky spadne zpátky na
původní `mailto:` odkaz (otevře e-mailového klienta), aby objednávky
nezmizely do prázdna — ale pro ostrý provoz Formspree nastavte, ať se
objednávky odesílají spolehlivě automaticky.

Bezplatný plán Formspree má limit 50 odeslání za měsíc. Pokud byste ho
překračovali, existují placené plány s vyšším limitem. Předmět e-mailu je
vždy "Objednávka", tělo obsahuje kompletní souhrn i referenční kód.

## Napojení na fakturační / skladový systém (Supabase databáze)

Objednávky se ukládají do vlastní databáze na **Supabase** (bezplatná
služba — hostovaná Postgres databáze s vestavěným API). Váš fakturační/
skladový program si odtud může objednávky přímo číst.

**Nastavení před spuštěním naostro:**

1. Založte si nový projekt na [supabase.com](https://supabase.com)
   (bezplatný plán stačí).
2. V projektu otevřete **SQL Editor → New query**, vložte celý obsah
   souboru `supabase/setup.sql` z tohoto repozitáře a klikněte **Run**.
   Vytvoří se tabulka `orders` a bezpečnostní pravidlo (viz níže).
3. V **Project Settings → API** zkopírujte **Project URL** a klíč
   **anon public**.
4. V `app.js` najděte:
   ```js
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
   a nahraďte oběma zkopírovanými hodnotami.

Dokud tam zůstanou placeholdery, zápis do Supabase se přeskočí a
objednávka se pošle jen e-mailem přes Formspree — nic se nerozbije, jen
chybí záznam v databázi.

**Proč je bezpečné mít `anon` klíč přímo ve veřejném kódu:** na rozdíl od
klasického API klíče je Supabase "anon" klíč navržený tak, aby byl veřejný.
Skutečné zabezpečení dělá **Row Level Security (RLS)** pravidlo v
`setup.sql`, které povoluje jen **vkládání nových objednávek** — číst,
mazat ani upravovat cizí objednávky s tímto klíčem nejde.

**Pro čtení objednávek ve vašem vlastním programu** použijte tajný
**`service_role`** klíč (najdete ho na stejné stránce API nastavení) —
ten obchází RLS a vidí úplně všechno. **Tenhle klíč nikdy nedávejte do
webu ani do veřejného repozitáře** — patří jen do vašeho vlastního
(soukromého) programu/backendu.

## Čísla objednávek

Tabulka `orders` má sloupec `id`, který Supabase automaticky a spolehlivě
čísluje vzestupně (1, 2, 3…) — to je skutečné pořadové číslo objednávky,
zobrazí se zákazníkovi po odeslání i v e-mailu. Formátování na vlastní
tvar čísla (např. s předponou, podle roku apod.) si podle domluvy
doděláte přímo ve svém programu, který objednávky z databáze čte.

## Doprava a výpočet vzdálenosti

Kalkulačka dopravy v kroku objednávky funguje takto:
- **Po Praze** a **osobní odběr (Praha 9 – Vysočany)** jsou vždy zdarma.
- **Doručení na adresu**: zákazník zadá adresu, ta se pošle na bezplatnou
  geokódovací službu **OpenStreetMap Nominatim** (`nominatim.openstreetmap.org`)
  pro získání souřadnic, a pak na veřejný routovací server **OSRM**
  (`router.project-osrm.org`), který spočítá **skutečnou trasu po silnici**
  (ne vzdušnou čarou). Cena = délka trasy × 2 (tam a zpět) × sazba za km.
- Sazba je **5 Kč/km**, nebo **7,50 Kč/km**, pokud množství libovolné
  položky v košíku přesáhne nejvyšší cenovou hladinu daného produktu (pak je
  potřeba výroba/rozvoz ve 2 várkách).
- Souřadnice depa jsou v `app.js` v konstantě `DEPOT` — než web spustíte
  naostro, upravte je na přesnou adresu vašeho skladu/výdejny.

⚠️ **Důležité pro ostrý provoz:** veřejný OSRM demo server
(`router.project-osrm.org`) je podle svých vlastních pravidel určen jen pro
**"reasonable, non-commercial use"** (přiměřené, NEKOMERČNÍ použití) a limit
je max. 1 dotaz za sekundu. Pro skutečný komerční e-shop tedy budete
potřebovat buď:
- vlastní hostovaný OSRM server (software je zdarma, ale potřebuje vlastní
  hosting a údržbu), nebo
- placenou routovací službu s komerční licencí (např. Mapy.cz API, Google
  Directions API) napojenou přes vlastní backend, kde jde bezpečně schovat
  API klíč.

Podobně **Nominatim** má vlastní zásady použití (rate limit, požadavek na
identifikovatelný `User-Agent`/`Referer`, zákaz masového automatizovaného
dotazování) — pro vyšší objem objednávek zvažte i zde placenou alternativu.

## Balení a množstevní ceny

Každý produkt má pole `caseSize` (kolik kusů je v jednom kartonu — 24 pro
San Benedetto řadu, 6 pro řadu Core). Cenové hladiny (druhá a třetí) jsou
zaokrouhlené nahoru na nejbližší násobek `caseSize`, aby odpovídaly celým
kartonům (např. 504 a 1008 ks místo kulatých 500 a 1000). Množství v
návrháři se zaokrouhluje nahoru na celé kartony automaticky.
