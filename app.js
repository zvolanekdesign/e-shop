/* =========================================================
   Lahev & Tvar — potisk lahví San Benedetto pro firmy
   Statický e-shop, žádný backend — pro GitHub Pages.
   ========================================================= */

/* ---------- Volitelné načtení pdf.js (jen pro PDF náhled) ---------- */
let pdfjsLoadPromise = null;
function ensurePdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (pdfjsLoadPromise) return pdfjsLoadPromise;
  pdfjsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      try {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } catch (e) { reject(e); }
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return pdfjsLoadPromise;
}

/* =========================================================
   PRODUKTY
   Sem se postupně doplňují další vody stejnou strukturou.
   label = obdélník etikety jako podíl (0–1) šířky/výšky fotky,
   změřeno přímo na dodaných fotkách.
   priceTiers = množstevní slevy, seřazené vzestupně podle minQty.
   ========================================================= */
const IS_PRODUCT_PAGE = location.pathname.endsWith('/product.html');

const PRODUCTS = [
  {
    sku: 'ISB6117',
    name: 'San Benedetto 0,5 l PET – perlivá',
    brand: 'San Benedetto',
    volume: '0,5 l',
    weight: '0,5 kg',
    waterType: 'Perlivá',
    categories: ['Premium', 'Objem 500 ml'],
    tags: ['San Benedetto', 'minerální voda', 'PET', 'perlivá'],

    tagline: 'Naše nejvyšší řada minerálních vod od značky San Benedetto.',
    intro: 'Přírodní minerální voda San Benedetto — pouze příroda zná recept. Přírodní perlivá voda pramenící z ledovců Dolomit má vyvážené složení minerálů a stopových prvků, díky kterému je vhodná i pro každodenní pití.',
    marketing: 'Buďte svým klientům i potenciálním zákazníkům každý den na očích. Minerální voda je nedílnou součástí každodenního života — zabalená v praktickém půllitrovém balení a opatřená vlastním potiskem se stane skvělou reklamou pro vaši firmu.',

    minQty: 48,
    caseSize: 24,
    priceTiers: [
      { minQty: 48, price: 23.0 },
      { minQty: 504, price: 21.5 },
      { minQty: 1008, price: 20.0 }
    ],
    priceNote: 'Cena je konečná a zahrnuje návrh etikety, tisková data, 3 grafické korektury, tisk etiket, polep lahví, plnění PET lahví a balení. Doprava po Praze naší dopravou je zdarma.',
    production: 'Výroba do 14 dnů od schválení designu, obvykle do týdne. Grafické práce a 3 korektury jsou v ceně — pošlete vlastní grafiku, nebo vám etiketu rádi navrhneme na míru, i to je v ceně.',

    brandStory: 'Minerální voda San Benedetto pramení na severu Itálie pod dolomitskými Alpami. Stáčí se ve městě Scorzè od roku 1956 a vyváží se do více než 80 zemí světa.',
    filler: 'Acqua Minerale San Benedetto S.p.A., Viale Kennedy 65 – 30037 Scorzè (VE), Itálie',
    storage: 'Skladujte v suchu a chladu, chraňte před přímým slunečním zářením.',
    composition: 'Přírodní sycená minerální voda.',
    analytical: [
      { label: 'Ca²⁺', value: '51,1 mg/l' },
      { label: 'Mg²⁺', value: '29,9 mg/l' },
      { label: 'Na⁺', value: '6,3 mg/l' },
      { label: 'HCO₃⁻', value: '283 mg/l' },
      { label: 'SO₄²⁻', value: '4,5 mg/l' },
      { label: 'NO₃⁻', value: '< 9 mg/l' },
      { label: 'Rozpuštěné látky (180 °C)', value: '271 mg/l' },
      { label: 'pH', value: '7,55' }
    ],

    skins: [
      { src: 'assets/bottle_500ml_your_logo_sanbenedetto_2.png', swatch: '#188fa7', label: { x: 0.388, y: 0.592, w: 0.205, h: 0.155 } }
    ]
  },
  {
    sku: 'ISB6118',
    name: 'San Benedetto 0,5 l PET – neperlivá',
    brand: 'San Benedetto',
    volume: '0,5 l',
    weight: '0,5 kg',
    waterType: 'Neperlivá',
    categories: ['Premium', 'Objem 500 ml'],
    tags: ['San Benedetto', 'minerální voda', 'PET', 'neperlivá'],

    tagline: 'Naše nejvyšší řada minerálních vod od značky San Benedetto.',
    intro: 'Přírodní minerální voda San Benedetto — pouze příroda zná recept. Přírodní neperlivá voda pramenící z ledovců Dolomit má vyvážené složení minerálů a stopových prvků, díky kterému je vhodná i pro každodenní pití.',
    marketing: 'Buďte svým klientům i potenciálním zákazníkům každý den na očích. Minerální voda je nedílnou součástí každodenního života — zabalená v praktickém půllitrovém balení a opatřená vlastním potiskem se stane skvělou reklamou pro vaši firmu.',

    minQty: 48,
    caseSize: 24,
    priceTiers: [
      { minQty: 48, price: 23.0 },
      { minQty: 504, price: 21.5 },
      { minQty: 1008, price: 20.0 }
    ],
    priceNote: 'Cena je konečná a zahrnuje návrh etikety, tisková data, 3 grafické korektury, tisk etiket, polep lahví, plnění PET lahví a balení. Doprava po Praze naší dopravou je zdarma.',
    production: 'Výroba do 14 dnů od schválení designu, obvykle do týdne. Grafické práce a 3 korektury jsou v ceně — pošlete vlastní grafiku, nebo vám etiketu rádi navrhneme na míru, i to je v ceně.',

    brandStory: 'Minerální voda San Benedetto pramení na severu Itálie pod dolomitskými Alpami. Stáčí se ve městě Scorzè od roku 1956 a vyváží se do více než 80 zemí světa.',
    filler: 'Acqua Minerale San Benedetto S.p.A., Viale Kennedy 65 – 30037 Scorzè (VE), Itálie',
    storage: 'Skladujte na suchém a čistém místě, chraňte před přímým slunečním zářením a tepelnými zdroji. Neskladujte v mrazu — doporučená teplota +10 °C až +25 °C.',
    composition: 'Přírodní neperlivá minerální voda ze zřídla Benedicta, Scorzè (Itálie).',
    analytical: [
      { label: 'Ca²⁺', value: '49,8 mg/l' },
      { label: 'Mg²⁺', value: '28,5 mg/l' },
      { label: 'Na⁺', value: '5,9 mg/l' },
      { label: 'K⁺', value: '0,99 mg/l' },
      { label: 'HCO₃⁻', value: '300 mg/l' },
      { label: 'SO₄²⁻', value: '4,9 mg/l' },
      { label: 'Cl⁻', value: '3,0 mg/l' },
      { label: 'NO₃⁻', value: '9 mg/l' },
      { label: 'SiO₂', value: '16,5 mg/l' },
      { label: 'F⁻', value: '< 0,1 mg/l' },
      { label: 'pH (u zdroje)', value: '7,60' },
      { label: 'Měrná elektrická vodivost (20 °C)', value: '420 µS/cm' },
      { label: 'Pevný extrakt (180 °C)', value: '273 mg/l' },
      { label: 'Celková mineralizace', value: '0,423 g/l' }
    ],

    skins: [
      { src: 'assets/bottle_500ml_your_logo_sanbenedetto.png', swatch: '#2b8da0', label: { x: 0.398, y: 0.592, w: 0.204, h: 0.154 } }
    ]
  },
  {
    sku: 'ISB6116',
    name: 'San Benedetto 0,33 l PET – neperlivá',
    brand: 'San Benedetto',
    volume: '0,33 l',
    weight: '0,33 kg',
    waterType: 'Neperlivá',
    categories: ['Premium', 'Objem 330 ml'],
    tags: ['San Benedetto', 'minerální voda', 'PET', 'neperlivá'],

    tagline: 'Naše nejvyšší řada minerálních vod od značky San Benedetto.',
    intro: 'Přírodní minerální voda San Benedetto — pouze příroda zná recept. Přírodní neperlivá voda pramenící z ledovců Dolomit má vyvážené složení minerálů a stopových prvků, díky kterému je vhodná i pro každodenní pití.',
    marketing: 'Buďte svým klientům i potenciálním zákazníkům každý den na očích. Minerální voda je nedílnou součástí každodenního života — zabalená v praktickém balení 0,33 l a opatřená vlastním potiskem se stane skvělou reklamou pro vaši firmu.',

    minQty: 48,
    caseSize: 24,
    priceTiers: [
      { minQty: 48, price: 22.0 },
      { minQty: 504, price: 20.5 },
      { minQty: 1008, price: 19.0 }
    ],
    priceNote: 'Cena je konečná a zahrnuje návrh etikety, tisková data, 3 grafické korektury, tisk etiket, polep lahví, plnění PET lahví a balení. Doprava po Praze naší dopravou je zdarma.',
    production: 'Výroba do 14 dnů od schválení designu, obvykle do týdne. Grafické práce a 3 korektury jsou v ceně — pošlete vlastní grafiku, nebo vám etiketu rádi navrhneme na míru, i to je v ceně.',

    brandStory: 'Minerální voda San Benedetto pramení na severu Itálie pod dolomitskými Alpami. Stáčí se ve městě Scorzè od roku 1956 a vyváží se do více než 80 zemí světa.',
    filler: 'Acqua Minerale San Benedetto S.p.A., Viale Kennedy 65 – 30037 Scorzè (VE), Itálie',
    storage: 'Skladujte na suchém a čistém místě, chraňte před přímým slunečním zářením a tepelnými zdroji. Neskladujte v mrazu — doporučená teplota +10 °C až +25 °C.',
    composition: 'Přírodní neperlivá minerální voda ze zřídla Benedicta, Scorzè (Itálie).',
    analytical: [
      { label: 'Ca²⁺', value: '49,8 mg/l' },
      { label: 'Mg²⁺', value: '28,5 mg/l' },
      { label: 'Na⁺', value: '5,9 mg/l' },
      { label: 'K⁺', value: '0,99 mg/l' },
      { label: 'HCO₃⁻', value: '300 mg/l' },
      { label: 'SO₄²⁻', value: '4,9 mg/l' },
      { label: 'Cl⁻', value: '3,0 mg/l' },
      { label: 'NO₃⁻', value: '9 mg/l' },
      { label: 'SiO₂', value: '16,5 mg/l' },
      { label: 'F⁻', value: '< 0,1 mg/l' },
      { label: 'pH (u zdroje)', value: '7,60' },
      { label: 'Měrná elektrická vodivost (20 °C)', value: '420 µS/cm' },
      { label: 'Pevný extrakt (180 °C)', value: '273 mg/l' },
      { label: 'Celková mineralizace', value: '0,423 g/l' }
    ],

    skins: [
      { src: 'assets/bottle_330ml_your_logo_2.png', swatch: '#2b8da0', label: { x: 0.378, y: 0.545, w: 0.257, h: 0.185 } }
    ]
  },
  {
    sku: 'ISB6115',
    name: 'San Benedetto 0,33 l PET – perlivá',
    brand: 'San Benedetto',
    volume: '0,33 l',
    weight: '0,33 kg',
    waterType: 'Perlivá',
    categories: ['Premium', 'Objem 330 ml'],
    tags: ['San Benedetto', 'minerální voda', 'PET', 'perlivá'],

    tagline: 'Naše nejvyšší řada minerálních vod od značky San Benedetto.',
    intro: 'Přírodní minerální voda San Benedetto — pouze příroda zná recept. Přírodní perlivá voda pramenící z ledovců Dolomit má vyvážené složení minerálů a stopových prvků, díky kterému je vhodná i pro každodenní pití.',
    marketing: 'Buďte svým klientům i potenciálním zákazníkům každý den na očích. Minerální voda je nedílnou součástí každodenního života — zabalená v praktickém balení 0,33 l a opatřená vlastním potiskem se stane skvělou reklamou pro vaši firmu.',

    minQty: 48,
    caseSize: 24,
    priceTiers: [
      { minQty: 48, price: 22.0 },
      { minQty: 504, price: 20.5 },
      { minQty: 1008, price: 19.0 }
    ],
    priceNote: 'Cena je konečná a zahrnuje návrh etikety, tisková data, 3 grafické korektury, tisk etiket, polep lahví, plnění PET lahví a balení. Doprava po Praze naší dopravou je zdarma.',
    production: 'Výroba do 14 dnů od schválení designu, obvykle do týdne. Grafické práce a 3 korektury jsou v ceně — pošlete vlastní grafiku, nebo vám etiketu rádi navrhneme na míru, i to je v ceně.',

    brandStory: 'Minerální voda San Benedetto pramení na severu Itálie pod dolomitskými Alpami. Stáčí se ve městě Scorzè od roku 1956 a vyváží se do více než 80 zemí světa.',
    filler: 'Acqua Minerale San Benedetto S.p.A., Viale Kennedy 65 – 30037 Scorzè (VE), Itálie',
    storage: 'Skladujte v suchu a chladu, chraňte před přímým slunečním zářením.',
    composition: 'Přírodní sycená minerální voda.',
    analytical: [
      { label: 'Ca²⁺', value: '51,1 mg/l' },
      { label: 'Mg²⁺', value: '29,9 mg/l' },
      { label: 'Na⁺', value: '6,3 mg/l' },
      { label: 'HCO₃⁻', value: '283 mg/l' },
      { label: 'SO₄²⁻', value: '4,5 mg/l' },
      { label: 'NO₃⁻', value: '< 9 mg/l' },
      { label: 'Rozpuštěné látky (180 °C)', value: '271 mg/l' },
      { label: 'pH', value: '7,55' }
    ],

    skins: [
      { src: 'assets/bottle_330ml_your_logo.png', swatch: '#188fa7', label: { x: 0.361, y: 0.545, w: 0.277, h: 0.185 } }
    ]
  },
  {
    sku: 'ISB2112',
    name: '0,5 l PET – jemně perlivá',
    brand: 'Core',
    volume: '0,5 l',
    weight: '0,5 kg',
    waterType: 'Jemně perlivá',
    categories: ['Core', 'Objem 500 ml'],
    tags: ['pitná voda', 'PET', 'jemně perlivá', 'česká potravina'],

    tagline: 'Cenově dostupná řada Core — kvalitní pitná voda s vaším potiskem.',
    intro: 'Jemně perlivá pitná voda ošetřená UV zářením, stočená v České republice. Nese označení Česká potravina — osvěžující volba pro firemní pitný režim i drobné dárky.',
    marketing: 'Buďte svým klientům i potenciálním zákazníkům každý den na očích. Pitná voda je nedílnou součástí každodenního života — zabalená v praktickém půllitrovém balení a opatřená vlastním potiskem se stane skvělou reklamou pro vaši firmu.',

    minQty: 48,
    caseSize: 6,
    priceTiers: [
      { minQty: 48, price: 17.9 },
      { minQty: 504, price: 16.4 },
      { minQty: 1002, price: 14.9 }
    ],
    priceNote: 'Cena je konečná a zahrnuje návrh etikety, tisková data, 3 grafické korektury, tisk etiket, polep lahví, plnění PET lahví a balení. Doprava po Praze naší dopravou je zdarma.',
    production: 'Výroba do 14 dnů od schválení designu, obvykle do týdne. Grafické práce a 3 korektury jsou v ceně — pošlete vlastní grafiku, nebo vám etiketu rádi navrhneme na míru, i to je v ceně.',

    brandStory: 'Core je naše cenově dostupnější řada balené pitné vody — stejný servis potisku a stejná péče o design, jen bez prémiové značky. Voda nese označení Česká potravina a je stočená v České republice.',
    filler: 'VESETA spol. s r.o., Braškovská 7, CZ-273 51 Braškov',
    storage: 'Minimální trvanlivost do / číslo šarže: viz horní část lahve. Uchovávejte v chladu, chraňte před přímým slunečním světlem. Po otevření uchovejte v chladničce a spotřebujte do 3 dnů.',
    composition: 'Pitná voda – sycená. Složení: pitná voda, oxid uhličitý max. 3,9 g/l. Ošetřena UV zářením.',
    analytical: [],

    skins: [
      { src: 'assets/bottle_500ml_your_logo_2.png', swatch: '#188fa7', label: { x: 0.407, y: 0.590, w: 0.187, h: 0.153 } }
    ]
  },
  {
    sku: 'ISB2111',
    name: '0,5 l PET – neperlivá',
    brand: 'Core',
    volume: '0,5 l',
    weight: '0,5 kg',
    waterType: 'Neperlivá',
    categories: ['Core', 'Objem 500 ml'],
    tags: ['pitná voda', 'PET', 'neperlivá', 'česká potravina'],

    tagline: 'Cenově dostupná řada Core — kvalitní pitná voda s vaším potiskem.',
    intro: 'Neperlivá pitná voda ošetřená UV zářením, stočená v České republice. Nese označení Česká potravina — osvěžující volba pro firemní pitný režim i drobné dárky.',
    marketing: 'Buďte svým klientům i potenciálním zákazníkům každý den na očích. Pitná voda je nedílnou součástí každodenního života — zabalená v praktickém půllitrovém balení a opatřená vlastním potiskem se stane skvělou reklamou pro vaši firmu.',

    minQty: 48,
    caseSize: 6,
    priceTiers: [
      { minQty: 48, price: 17.9 },
      { minQty: 504, price: 16.4 },
      { minQty: 1002, price: 14.9 }
    ],
    priceNote: 'Cena je konečná a zahrnuje návrh etikety, tisková data, 3 grafické korektury, tisk etiket, polep lahví, plnění PET lahví a balení. Doprava po Praze naší dopravou je zdarma.',
    production: 'Výroba do 14 dnů od schválení designu, obvykle do týdne. Grafické práce a 3 korektury jsou v ceně — pošlete vlastní grafiku, nebo vám etiketu rádi navrhneme na míru, i to je v ceně.',

    brandStory: 'Core je naše cenově dostupnější řada balené pitné vody — stejný servis potisku a stejná péče o design, jen bez prémiové značky. Voda nese označení Česká potravina a je stočená v České republice.',
    filler: 'VESETA spol. s r.o., Braškovská 7, CZ-273 51 Braškov',
    storage: 'Minimální trvanlivost do / číslo šarže: viz horní část lahve. Uchovávejte v chladu, chraňte před přímým slunečním světlem. Po otevření uchovejte v chladničce a spotřebujte do 3 dnů.',
    composition: 'Pitná voda – neperlivá. Ošetřena UV zářením.',
    analytical: [],

    skins: [
      { src: 'assets/bottle_500ml_your_logo.png', swatch: '#2b8da0', label: { x: 0.407, y: 0.590, w: 0.187, h: 0.153 } }
    ]
  }
];

/* ---------- Předehřátí fotek lahví ---------- */
const SKIN_IMAGES = {};
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
function preloadSkins() {
  const srcs = new Set();
  PRODUCTS.forEach(p => p.skins.forEach(s => srcs.add(s.src)));
  return Promise.all([...srcs].map(src => loadImage(src).then(img => { SKIN_IMAGES[src] = img; })));
}

/* ---------- Pomocné funkce ---------- */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function truncate(str, n) { return str.length > n ? str.slice(0, n - 1) + '…' : str; }
function escapeHtml(str) { const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }
function pointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}
function formatKc(n) {
  return n.toLocaleString('cs-CZ', { minimumFractionDigits: n % 1 !== 0 ? 2 : 0, maximumFractionDigits: 2 }) + ' Kč';
}
/** Vrátí platnou cenovou hladinu pro dané množství (nejvyšší minQty <= qty). */
function tierForQty(product, qty) {
  let tier = product.priceTiers[0];
  for (const t of product.priceTiers) {
    if (qty >= t.minQty) tier = t;
  }
  return tier;
}

/**
 * Vykreslí reálnou fotku láhve a do oblasti etikety vloží nahraný motiv.
 */
function drawBottle(canvas, opts) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const skin = SKIN_IMAGES[opts.skinSrc];
  if (!skin) return;
  ctx.drawImage(skin, 0, 0, w, h);

  const rect = {
    x: opts.labelFrac.x * w,
    y: opts.labelFrac.y * h,
    w: opts.labelFrac.w * w,
    h: opts.labelFrac.h * h
  };

  if (opts.image) {
    // Jemný stín pod etiketou, aby působila jako skutečně nalepená.
    ctx.save();
    ctx.shadowColor = 'rgba(7, 45, 75, 0.28)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = 'rgba(255,255,255,0.98)';
    roundRect(ctx, rect.x, rect.y, rect.w, rect.h, Math.min(8, rect.w * 0.035));
    ctx.fill();
    ctx.restore();

    ctx.save();
    roundRect(ctx, rect.x, rect.y, rect.w, rect.h, Math.min(8, rect.w * 0.035));
    ctx.clip();
    const img = opts.image;
    const t = opts.transform || { scale: 1, offsetX: 0, offsetY: 0 };
    const baseScale = Math.max(rect.w / img.width, rect.h / img.height);
    const scale = baseScale * (t.scale || 1);
    ctx.translate(rect.x + rect.w / 2 + (t.offsetX || 0), rect.y + rect.h / 2 + (t.offsetY || 0));
    ctx.scale(scale, scale);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();

    // Velmi jemné průsvitné prolnutí se světlem lahve.
    ctx.save();
    roundRect(ctx, rect.x, rect.y, rect.w, rect.h, Math.min(8, rect.w * 0.035));
    ctx.clip();
    ctx.globalAlpha = 0.08;
    ctx.drawImage(skin, rect.x, rect.y, rect.w, rect.h, rect.x, rect.y, rect.w, rect.h);
    ctx.restore();
  } else if (opts.fileLabel) {
    ctx.save();
    roundRect(ctx, rect.x, rect.y, rect.w, rect.h, Math.min(10, rect.w * 0.05));
    ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.fillStyle = '#1B2B22';
    ctx.textAlign = 'center';
    ctx.font = `600 ${Math.round(rect.w * 0.075)}px "Work Sans", sans-serif`;
    ctx.fillText('Soubor:', rect.x + rect.w / 2, rect.y + rect.h / 2 - 6);
    ctx.font = `${Math.round(rect.w * 0.062)}px "Work Sans", sans-serif`;
    ctx.fillText(truncate(opts.fileLabel, 22), rect.x + rect.w / 2, rect.y + rect.h / 2 + 16);
    ctx.restore();
  } else if (opts.showHint) {
    ctx.save();
    ctx.strokeStyle = 'rgba(27,43,34,0.55)';
    ctx.setLineDash([7, 6]);
    ctx.lineWidth = 3;
    roundRect(ctx, rect.x + 2, rect.y + 2, rect.w - 4, rect.h - 4, 8);
    ctx.stroke();
    ctx.restore();
  }
}

/* ---------- Stav aplikace ---------- */
const state = {
  activeCategory: 'Vše',
  activeProduct: null,
  activeSkinIndex: 0,
  image: null,
  fileLabel: null,
  transform: { scale: 1, rotate: 0, offsetX: 0, offsetY: 0 },
  cart: []
};

/* ---------- Košík: localStorage ---------- */
const CART_KEY = 'lahev-tvar-cart';
function loadCart() {
  try { state.cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { state.cart = []; }
}
function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); }

/* ---------- Kategorie ---------- */
function renderCategoryFilters() {
  const wrap = document.getElementById('category-filters');
  const cats = ['Vše', 'Premium', 'Core', 'Objem 500 ml', 'Objem 330 ml'];
  wrap.innerHTML = '';
  cats.forEach(cat => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'category-pill' + (cat === state.activeCategory ? ' active' : '');
    b.textContent = cat;
    b.addEventListener('click', () => {
      state.activeCategory = cat;
      wrap.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      b.classList.add('active');
      renderProductGrid();
    });
    wrap.appendChild(b);
  });
}

/* ---------- Render: produktová mřížka ---------- */
function renderProductGrid() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  const list = PRODUCTS.filter(p => state.activeCategory === 'Vše' || p.categories.includes(state.activeCategory));

  list.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';

    const canvas = document.createElement('canvas');
    canvas.width = 500; canvas.height = 500;
    drawBottle(canvas, { skinSrc: product.skins[0].src, labelFrac: product.skins[0].label });

    const badges = document.createElement('div');
    badges.className = 'product-badges';
    const collection = product.categories.includes('Premium') ? 'Premium' : 'Core';
    badges.innerHTML = `<span class="badge">${escapeHtml(collection)}</span><span class="badge badge-outline">${escapeHtml(product.volume)}</span><span class="badge badge-outline">${escapeHtml(product.waterType)}</span>`;

    const h3 = document.createElement('h3'); h3.textContent = product.name;
    const tagline = document.createElement('p'); tagline.className = 'desc'; tagline.textContent = product.tagline;

    const lowestTier = product.priceTiers[0];
    const priceRow = document.createElement('p');
    priceRow.className = 'price-from';
    priceRow.innerHTML = `<span class="amount">od ${formatKc(product.priceTiers[product.priceTiers.length - 1].price)}</span><span class="unit">/ ks při ${product.priceTiers[product.priceTiers.length - 1].minQty}+ ks</span>`;

    const moq = document.createElement('p');
    moq.className = 'moq-note';
    moq.textContent = `Cena od ${lowestTier.minQty} ks: ${formatKc(lowestTier.price)}/ks · minimální odběr ${product.minQty} ks`;

    const actions = document.createElement('div');
    actions.className = 'card-actions';
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'btn btn-primary';
    btn.textContent = 'Personalizovat';
    btn.addEventListener('click', () => { window.open(`product.html?sku=${encodeURIComponent(product.sku)}`, '_blank', 'noopener'); });
    actions.appendChild(btn);

    card.append(canvas, badges, h3, tagline, priceRow, moq, actions);
    grid.appendChild(card);
  });
}

function buildDetailsHtml(product) {
  const tierRows = product.priceTiers.map(t =>
    `<tr><td>od ${t.minQty} ks</td><td>${formatKc(t.price)} / ks</td></tr>`
  ).join('');
  const analyticalRows = product.analytical.map(a =>
    `<tr><td>${escapeHtml(a.label)}</td><td>${escapeHtml(a.value)}</td></tr>`
  ).join('');
  const analyticalBlock = product.analytical.length
    ? `<table class="analytical-table"><tbody>${analyticalRows}</tbody></table>`
    : '';
  const tagPills = product.tags.map(t => `<span class="tag-pill">${escapeHtml(t)}</span>`).join('');

  return `
    <div>
      <h4>Popis</h4>
      <p>${escapeHtml(product.intro)}</p>
      <p>${escapeHtml(product.marketing)}</p>
    </div>
    <div>
      <h4>Ceník podle množství</h4>
      <table class="tier-price-table"><tbody>${tierRows}</tbody></table>
      <p class="moq-note" style="margin-top:8px">${escapeHtml(product.priceNote)}</p>
    </div>
    <div>
      <h4>Balení</h4>
      <p class="moq-note">${product.caseSize} ks v kartonu · objednávky se zaokrouhlují na celé kartony, proto jsou cenové hladiny na ${product.priceTiers[1].minQty} a ${product.priceTiers[2].minQty} ks.</p>
    </div>
    <div>
      <h4>Výroba a grafika</h4>
      <p>${escapeHtml(product.production)}</p>
    </div>
    <div>
      <h4>O značce</h4>
      <p>${escapeHtml(product.brandStory)}</p>
      <p class="moq-note">Plnič: ${escapeHtml(product.filler)}</p>
    </div>
    <div>
      <h4>Složení a skladování</h4>
      <p>${escapeHtml(product.composition)}</p>
      <p class="moq-note">${escapeHtml(product.storage)}</p>
      ${analyticalBlock}
    </div>
    <div>
      <h4>SKU a štítky</h4>
      <p class="moq-note">${escapeHtml(product.sku)}</p>
      <div class="tag-pills">${tagPills}</div>
    </div>
  `;
}

/* ---------- Customizer ---------- */
const customizerSection = document.getElementById('customizer');
const designCanvas = document.getElementById('design-canvas');

function openCustomizer(product) {
  state.activeProduct = product;
  state.activeSkinIndex = 0;
  state.image = null;
  state.fileLabel = null;
  state.transform = { scale: 1, rotate: 0, offsetX: 0, offsetY: 0 };

  document.getElementById('customizer-title').textContent = product.name;
  document.getElementById('upload-drop-text').innerHTML = 'Přetáhněte soubor sem nebo klikněte pro výběr<br><small>JPG, PNG nebo PDF</small>';
  document.getElementById('adjust-block').hidden = true;
  document.getElementById('add-to-cart').disabled = true;
  document.getElementById('add-to-cart').textContent = 'Nahrajte motiv pro přidání do košíku';
  document.getElementById('file-input').value = '';
  document.getElementById('scale-range').value = 100;

  const qtyInput = document.getElementById('qty-input');
  qtyInput.value = product.minQty;
  qtyInput.min = product.minQty;
  qtyInput.step = product.caseSize;

  const swatchBlock = document.getElementById('swatch-block');
  swatchBlock.hidden = product.skins.length < 2;
  if (product.skins.length > 1) renderSwatches(product);

  renderTierTable(product);
  updatePriceDisplay();

  customizerSection.hidden = false;
  redrawDesignCanvas();
  if (!IS_PRODUCT_PAGE) customizerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeCustomizer() { customizerSection.hidden = true; }

function renderTierTable(product) {
  const wrap = document.getElementById('tier-table');
  wrap.innerHTML = '';
  product.priceTiers.forEach(t => {
    const row = document.createElement('div');
    row.className = 'tier-row';
    row.dataset.minqty = t.minQty;
    row.innerHTML = `<span>od ${t.minQty} ks</span><span>${formatKc(t.price)} / ks</span>`;
    wrap.appendChild(row);
  });
}

function updatePriceDisplay() {
  const product = state.activeProduct;
  if (!product) return;
  const qtyInput = document.getElementById('qty-input');
  let qty = Math.max(product.minQty, Math.round(Number(qtyInput.value) || product.minQty));
  // zaokrouhlit nahoru na celé kartony
  qty = Math.ceil(qty / product.caseSize) * product.caseSize;
  qtyInput.value = qty;

  const tier = tierForQty(product, qty);
  const total = tier.price * qty;

  document.getElementById('customizer-price').textContent =
    `${formatKc(tier.price)} / ks · celkem ${formatKc(total)}`;

  document.querySelectorAll('#tier-table .tier-row').forEach(row => {
    row.classList.toggle('active-tier', Number(row.dataset.minqty) === tier.minQty);
  });

  const hint = document.getElementById('qty-hint');
  const cartons = qty / product.caseSize;
  const nextTier = product.priceTiers.find(t => t.minQty > qty);
  if (nextTier) {
    hint.textContent = `${cartons} kartonů po ${product.caseSize} ks. Minimální odběr ${product.minQty} ks. Při ${nextTier.minQty}+ ks cena klesne na ${formatKc(nextTier.price)}/ks.`;
    hint.classList.remove('warn');
  } else {
    hint.textContent = `${cartons} kartonů po ${product.caseSize} ks. Minimální odběr ${product.minQty} ks. Máte nejnižší cenu za kus.`;
    hint.classList.remove('warn');
  }
}

function renderSwatches(product) {
  const wrap = document.getElementById('color-swatches');
  wrap.innerHTML = '';
  product.skins.forEach((skin, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'swatch' + (i === state.activeSkinIndex ? ' active' : '');
    b.style.background = skin.swatch;
    b.setAttribute('aria-label', 'Varianta etikety ' + (i + 1));
    b.addEventListener('click', () => {
      state.activeSkinIndex = i;
      wrap.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
      b.classList.add('active');
      redrawDesignCanvas();
    });
    wrap.appendChild(b);
  });
}

function redrawDesignCanvas() {
  if (!state.activeProduct) return;
  const skin = state.activeProduct.skins[state.activeSkinIndex];
  drawBottle(designCanvas, {
    skinSrc: skin.src,
    labelFrac: skin.label,
    image: state.image,
    transform: state.transform,
    fileLabel: state.image ? null : state.fileLabel,
    showHint: !state.image && !state.fileLabel
  });
}

/* ---------- Nahrávání souboru ---------- */
const fileInput = document.getElementById('file-input');
const uploadDrop = document.getElementById('upload-drop');

fileInput.addEventListener('change', e => {
  if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
});
['dragover', 'dragenter'].forEach(evt =>
  uploadDrop.addEventListener(evt, e => { e.preventDefault(); uploadDrop.classList.add('drag-over'); })
);
['dragleave', 'drop'].forEach(evt =>
  uploadDrop.addEventListener(evt, e => { e.preventDefault(); uploadDrop.classList.remove('drag-over'); })
);
uploadDrop.addEventListener('drop', e => {
  if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});

function handleFile(file) {
  state.fileLabel = file.name;
  state.transform = { scale: 1, rotate: 0, offsetX: 0, offsetY: 0 };
  document.getElementById('scale-range').value = 100;

  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => { state.image = img; finishUpload(file.name); };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  } else if (file.type === 'application/pdf') {
    state.image = null;
    document.getElementById('upload-drop-text').innerHTML = 'Načítám náhled PDF…';
    renderPdfFirstPage(file)
      .then(img => { state.image = img; finishUpload(file.name); })
      .catch(() => { finishUpload(file.name, true); });
  } else {
    state.image = null;
    finishUpload(file.name);
  }
}

function renderPdfFirstPage(file) {
  return ensurePdfJs().then(pdfjsLib => {
    return file.arrayBuffer().then(buf => {
      return pdfjsLib.getDocument({ data: buf }).promise.then(pdf => pdf.getPage(1)).then(page => {
        const viewport = page.getViewport({ scale: 2 });
        const tmp = document.createElement('canvas');
        tmp.width = viewport.width; tmp.height = viewport.height;
        const tctx = tmp.getContext('2d');
        return page.render({ canvasContext: tctx, viewport }).promise.then(() => {
          const img = new Image();
          return new Promise(resolve => {
            img.onload = () => resolve(img);
            img.src = tmp.toDataURL('image/png');
          });
        });
      });
    });
  });
}

function finishUpload(name, pdfFailed) {
  document.getElementById('upload-drop-text').innerHTML =
    `Nahráno: <strong>${escapeHtml(truncate(name, 30))}</strong><br><small>Klikněte pro výměnu souboru</small>`;
  document.getElementById('adjust-block').hidden = false;
  document.getElementById('add-to-cart').disabled = false;
  document.getElementById('add-to-cart').textContent = 'Přidat do košíku';
  if (pdfFailed) showToast('Náhled PDF se nepodařilo vykreslit, na štítku uvidíte jen název souboru.');
  redrawDesignCanvas();
}

/* ---------- Posun / zoom / rotace motivu ---------- */
let dragging = false, dragStart = null, dragOffsetStart = null;

function canvasCoords(evt) {
  const rect = designCanvas.getBoundingClientRect();
  const scaleX = designCanvas.width / rect.width;
  const scaleY = designCanvas.height / rect.height;
  return { x: (evt.clientX - rect.left) * scaleX, y: (evt.clientY - rect.top) * scaleY };
}
function currentLabelRect() {
  const skin = state.activeProduct.skins[state.activeSkinIndex];
  const w = designCanvas.width, h = designCanvas.height;
  return { x: skin.label.x * w, y: skin.label.y * h, w: skin.label.w * w, h: skin.label.h * h };
}

designCanvas.addEventListener('pointerdown', e => {
  if (!state.image) return;
  const c = canvasCoords(e);
  if (!pointInRect(c.x, c.y, currentLabelRect())) return;
  dragging = true;
  dragStart = c;
  dragOffsetStart = { ...state.transform };
  designCanvas.setPointerCapture(e.pointerId);
});
designCanvas.addEventListener('pointermove', e => {
  if (!dragging) return;
  const c = canvasCoords(e);
  state.transform.offsetX = dragOffsetStart.offsetX + (c.x - dragStart.x);
  state.transform.offsetY = dragOffsetStart.offsetY + (c.y - dragStart.y);
  redrawDesignCanvas();
});
['pointerup', 'pointercancel', 'pointerleave'].forEach(evt =>
  designCanvas.addEventListener(evt, () => { dragging = false; })
);

document.getElementById('scale-range').addEventListener('input', e => {
  state.transform.scale = Number(e.target.value) / 100;
  redrawDesignCanvas();
});
document.getElementById('reset-position').addEventListener('click', () => {
  state.transform = { scale: 1, rotate: 0, offsetX: 0, offsetY: 0 };
  document.getElementById('scale-range').value = 100;
  redrawDesignCanvas();
});
document.getElementById('qty-input').addEventListener('input', updatePriceDisplay);
document.getElementById('qty-input').addEventListener('change', updatePriceDisplay);

document.getElementById('customizer-close').addEventListener('click', closeCustomizer);

/* ---------- Přidání do košíku ---------- */
document.getElementById('add-to-cart').addEventListener('click', () => {
  if (!state.activeProduct || (!state.image && !state.fileLabel)) return;
  redrawDesignCanvas();
  const product = state.activeProduct;
  const qtyInput = document.getElementById('qty-input');
  let qty = Math.max(product.minQty, Math.round(Number(qtyInput.value) || product.minQty));
  qty = Math.ceil(qty / product.caseSize) * product.caseSize;
  const tier = tierForQty(product, qty);

  const item = {
    id: 'item-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    productName: product.name,
    sku: product.sku,
    qty,
    unitPrice: tier.price,
    preview: designCanvas.toDataURL('image/jpeg', 0.9)
  };
  state.cart.push(item);
  saveCart();
  renderCart();
  showToast('Přidáno do košíku');
  closeCustomizer();
});

/* ---------- Košík ---------- */
function renderCart() {
  const itemsWrap = document.getElementById('cart-items');
  const empty = document.getElementById('cart-empty');
  const summary = document.getElementById('cart-summary');
  const countEl = document.getElementById('cart-count');

  const totalQty = state.cart.reduce((s, i) => s + i.qty, 0);
  countEl.textContent = totalQty;

  itemsWrap.innerHTML = '';
  if (state.cart.length === 0) {
    empty.hidden = false;
    summary.hidden = true;
    return;
  }
  empty.hidden = true;
  summary.hidden = false;

  let total = 0;
  state.cart.forEach(item => {
    total += item.qty * item.unitPrice;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${item.preview}" alt="Náhled potisku — ${escapeHtml(item.productName)}">
      <div>
        <p class="cart-item-name">${escapeHtml(item.productName)}</p>
        <p class="cart-item-meta">${item.qty} ks · ${formatKc(item.unitPrice)} / ks</p>
      </div>
      <div class="cart-item-price">${formatKc(item.qty * item.unitPrice)}</div>
      <button type="button" class="cart-item-remove" data-id="${item.id}">Odebrat</button>
    `;
    itemsWrap.appendChild(row);
  });
  document.getElementById('cart-total-value').textContent = formatKc(total);

  itemsWrap.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      state.cart = state.cart.filter(i => i.id !== btn.dataset.id);
      saveCart();
      renderCart();
    });
  });
}

/* ---------- Doprava ----------
   Vzdálenost se počítá po skutečné silniční trase (ne vzdušnou čarou):
   1) adresa se převede na souřadnice přes bezplatné geokódování
      OpenStreetMap Nominatim,
   2) skutečná trasa a její délka se spočítá přes veřejný demo server
      OSRM (Open Source Routing Machine) — počítá reálnou silniční trasu,
      ne přímku.
   POZOR: demo server OSRM (router.project-osrm.org) je podle jeho vlastních
   pravidel určen jen pro "reasonable, non-commercial use" (rozumné,
   NEKOMERČNÍ použití) a max. 1 dotaz/s. Pro ostrý komerční e-shop je proto
   potřeba buď vlastní OSRM server (self-hosted, zdarma jako software, ale
   potřebuje vlastní hosting), nebo placená routovací služba (Mapy.cz API,
   Google Directions API) přes vlastní backend. Totéž platí přiměřeně pro
   Nominatim (rate limit, požadavek na identifikovatelné použití).
   Souřadnice depa (Praha 9 – Vysočany) jsou orientační — uprav na přesnou
   adresu výdejny/skladu. */
const DEPOT = { name: 'Praha 9 – Vysočany', lat: 50.1125, lng: 14.4953 };
const SHIPPING_RATE_NORMAL = 3.5;   // Kč / km
const SHIPPING_RATE_LARGE = 6;  // Kč / km, když objednávka přesáhne kapacitu jedné várky

/** Pokud jakákoli položka v košíku přesáhne svou nejvyšší cenovou hladinu (kapacitu 1 várky), počítá se vyšší sazba za km. */
function shippingRateForCart(cart) {
  let needsSecondBatch = false;
  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.sku === item.sku);
    if (!product) return;
    const maxTier = product.priceTiers[product.priceTiers.length - 1];
    if (item.qty > maxTier.minQty) needsSecondBatch = true;
  });
  return needsSecondBatch ? SHIPPING_RATE_LARGE : SHIPPING_RATE_NORMAL;
}

async function geocodeAddress(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&countrycodes=cz&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { 'Accept-Language': 'cs' } });
  if (!res.ok) throw new Error('network');
  const data = await res.json();
  if (!data.length) throw new Error('not-found');
  return data[0];
}

/** Skutečná silniční vzdálenost (km) mezi dvěma body přes veřejný OSRM server. */
async function roadDistanceKm(fromLat, fromLng, toLat, toLng) {
  const url = `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('routing-failed');
  const data = await res.json();
  if (data.code !== 'Ok' || !data.routes || !data.routes.length) throw new Error('no-route');
  return data.routes[0].distance / 1000; // metry -> km
}

function isPragueAddress(geo) {
  const addr = geo.address || {};
  const pc = (addr.postcode || '').replace(/\s/g, '');
  if (pc.length === 5 && pc[0] === '1') return true;
  const cityLike = [addr.city, addr.town, addr.municipality, addr.county, addr.state].filter(Boolean).join(' ').toLowerCase();
  return cityLike.includes('praha') || cityLike.includes('prague');
}

state.shipping = { method: 'prague', cost: 0, label: 'Doručení po Praze — zdarma' };

function renderCheckoutTotals() {
  const wrap = document.getElementById('checkout-totals');
  const productsTotal = state.cart.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const shippingCost = state.shipping.cost || 0;
  wrap.innerHTML = `
    <div class="row"><span>Zboží</span><span>${formatKc(productsTotal)}</span></div>
    <div class="row"><span>Doprava</span><span>${shippingCost > 0 ? formatKc(shippingCost) : (state.shipping.method === 'outside' ? 'bude upřesněna' : 'zdarma')}</span></div>
    <div class="row grand"><span>Celkem</span><span>${formatKc(productsTotal + shippingCost)}</span></div>
  `;
}

document.querySelectorAll('input[name="shipping-method"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const distanceCalc = document.getElementById('distance-calc');
    if (radio.value === 'outside' && radio.checked) {
      distanceCalc.hidden = false;
      state.shipping = { method: 'outside', cost: 0, label: 'Doručení na adresu — zadejte adresu' };
    } else if (radio.value === 'prague' && radio.checked) {
      distanceCalc.hidden = true;
      state.shipping = { method: 'prague', cost: 0, label: 'Doručení po Praze — zdarma' };
    } else if (radio.value === 'pickup' && radio.checked) {
      distanceCalc.hidden = true;
      state.shipping = { method: 'pickup', cost: 0, label: 'Osobní odběr, Praha 9 – Vysočany — zdarma' };
    }
    renderCheckoutTotals();
  });
});

document.getElementById('calc-shipping-btn').addEventListener('click', async () => {
  const addressInput = document.getElementById('shipping-address');
  const resultEl = document.getElementById('shipping-result');
  const query = addressInput.value.trim();
  if (!query) {
    resultEl.textContent = 'Zadejte prosím adresu.';
    resultEl.classList.add('error');
    return;
  }
  resultEl.classList.remove('error');
  resultEl.textContent = 'Ověřuji zadané údaje…';
  try {
    const geo = await geocodeAddress(query);
    if (isPragueAddress(geo)) {
      state.shipping = { method: 'outside', cost: 0, label: 'Adresa je v Praze — doprava zdarma' };
      resultEl.textContent = 'Tahle adresa je v Praze, doprava je zdarma.';
      renderCheckoutTotals();
      return;
    }
    resultEl.textContent = 'Zpracovávám údaje…';
    const distOneWay = await roadDistanceKm(DEPOT.lat, DEPOT.lng, parseFloat(geo.lat), parseFloat(geo.lon));
    const distRoundTrip = distOneWay * 2;
    const rate = shippingRateForCart(state.cart);
    const cost = Math.round(distRoundTrip * rate);
    state.shipping = {
      method: 'outside',
      cost,
      label: 'Doručení na adresu — cena bude upřesněna dle zadaných údajů'
    };
    resultEl.textContent = 'Cena dopravy bude upřesněna dle zadaných údajů.';
    renderCheckoutTotals();
  } catch (err) {
    resultEl.textContent = 'Adresu nebo trasu se nepodařilo spočítat, zkuste adresu upřesnit (ulice, město, PSČ).';
    resultEl.classList.add('error');
  }
});

/* ---------- Checkout ---------- */
// ---------- Fakturace, ARES a dodací adresa ----------
function syncBillingFields() {
  const same = document.querySelector('input[name="billingSame"]')?.checked;
  document.querySelectorAll('.billing-address-fields input').forEach(el => {
    el.disabled = !!same;
    el.required = !same;
  });
  const company = document.querySelector('input[name="billingType"]:checked')?.value === 'company';
  const companyFields = document.getElementById('company-fields');
  if (companyFields) companyFields.hidden = !company;
  ['company','ico'].forEach(name => {
    const el = document.querySelector(`[name="${name}"]`);
    if (el) el.required = company;
  });
}

document.querySelectorAll('input[name="billingSame"]').forEach(el => el.addEventListener('change', syncBillingFields));
document.querySelectorAll('input[name="billingType"]').forEach(el => el.addEventListener('change', syncBillingFields));
syncBillingFields();

const aresBtn = document.getElementById('ares-btn');
if (aresBtn) aresBtn.addEventListener('click', async () => {
  const icoInput = document.getElementById('ico');
  const ico = (icoInput?.value || '').replace(/\s/g, '');
  if (!/^\d{8}$/.test(ico)) { showToast('Zadejte platné osmimístné IČO.'); return; }
  aresBtn.disabled = true;
  aresBtn.textContent = 'Načítám…';
  try {
    const res = await fetch(`https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('ARES');
    const data = await res.json();
    const company = data.obchodniJmeno || data.obchodniJmenoSubjektu || data.nazev || '';
    const sidlo = data.sidlo || {};
    const street = sidlo.nazevUlice || sidlo.textovaAdresa || '';
    const house = [sidlo.cisloDomovni, sidlo.cisloOrientacni].filter(Boolean).join('/');
    const city = sidlo.nazevObce || sidlo.nazevMestskeCasti || '';
    const zip = sidlo.psc ? String(sidlo.psc).padStart(5,'0') : '';
    document.querySelector('[name="company"]').value = company;
    if (street) document.querySelector('[name="billingStreet"]').value = street;
    if (house) document.querySelector('[name="billingHouseNumber"]').value = house;
    if (city) document.querySelector('[name="billingCity"]').value = city;
    if (zip) document.querySelector('[name="billingZip"]').value = zip;
    showToast('Údaje firmy byly načteny z ARES.');
  } catch (err) {
    showToast('Firmu se z ARES nepodařilo načíst. Zkontrolujte IČO.');
  } finally {
    aresBtn.disabled = false;
    aresBtn.textContent = 'Načíst z ARES';
  }
});

function syncDeliveryAddressForShipping() {
  const street = document.querySelector('[name="street"]')?.value.trim() || '';
  const house = document.querySelector('[name="houseNumber"]')?.value.trim() || '';
  const city = document.querySelector('[name="city"]')?.value.trim() || '';
  const zip = document.querySelector('[name="zip"]')?.value.trim() || '';
  const el = document.getElementById('shipping-address');
  if (el) el.value = [street + (house ? ' ' + house : ''), city, zip].filter(Boolean).join(', ');
}
['street','houseNumber','city','zip'].forEach(name => document.querySelector(`[name="${name}"]`)?.addEventListener('input', syncDeliveryAddressForShipping));

document.getElementById('checkout-btn').addEventListener('click', () => {
  document.getElementById('checkout').hidden = false;
  document.getElementById('order-success').hidden = true;
  document.getElementById('checkout-form').hidden = false;
  document.querySelector('.shipping-block').hidden = false;
  document.querySelector('.payment-block').hidden = false;
  document.getElementById('checkout-totals').hidden = false;
  renderCheckoutTotals();
  document.getElementById('checkout').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ---------- Odeslání objednávky ----------
   Objednávka se posílá přes Formspree (https://formspree.io) — bezplatná
   služba, která pošle e-mail rovnou ze serveru. Zákazník tedy nemusí nic
   dalšího potvrzovat ve své e-mailové aplikaci jako u mailto: odkazu.

   NASTAVENÍ (nutné před spuštěním naostro):
   1) Založ si účet na https://formspree.io (bezplatný plán: 50 odeslání/měsíc)
   2) Vytvoř nový formulář, jako cílový e-mail nastav zvolanek.info@gmail.com,
      potvrď ho
   3) Zkopíruj ID formuláře z adresy tvaru https://formspree.io/f/xxxxxxxx
   4) Vlož ho níže místo 'YOUR_FORM_ID'

   Dokud tam zůstane 'YOUR_FORM_ID', web automaticky spadne zpátky na
   mailto: odkaz (otevře e-mailového klienta), aby objednávky nezmizely
   do prázdna. */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
const FALLBACK_EMAIL = 'zvolanek.info@gmail.com';

/* ---------- Napojení na Supabase (databáze objednávek) ----------
   Objednávky se ukládají do Supabase (samostatná bezplatná databáze) —
   odtud si je může číst váš fakturační/skladový program.

   NASTAVENÍ (nutné před spuštěním naostro):
   1) Založte si nový projekt na https://supabase.com (bezplatný plán)
   2) V projektu otevřete "SQL Editor" a spusťte skript ze souboru
      supabase/setup.sql (vytvoří tabulku "orders" a zabezpečení)
   3) V "Project Settings -> API" zkopírujte "Project URL" a klíč
      "anon public"
   4) Vložte je níže do SUPABASE_URL a SUPABASE_ANON_KEY

   Bezpečnost: veřejný "anon" klíč je NAVRŽENÝ tak, aby mohl být přímo
   ve veřejném kódu webu — skutečnou ochranu dat zajišťuje RLS pravidlo
   nastavené v setup.sql, které dovolí jen VKLÁDAT nové objednávky, ne
   číst cizí. Pro čtení všech objednávek ve vašem programu použijte
   tajný "service_role" klíč (ten nikdy nedávejte do webu ani repozitáře).

   Dokud tu zůstanou placeholdery 'YOUR_SUPABASE_URL'/'YOUR_SUPABASE_ANON_KEY',
   zápis do Supabase se přeskočí a objednávka se pošle jen e-mailem přes
   Formspree — nic se nerozbije, jen chybí záznam v databázi. */
const SUPABASE_URL = 'YOUR_SUPABASE_URL';           // např. 'https://xxxxx.supabase.co' — pošli mi ho, doplním
const SUPABASE_ANON_KEY = 'sb_publishable_X3pi2F6s74ZfNvPP18_ahQ_NNc1JsMS';

const supabaseClient =
  (window.supabase && !SUPABASE_URL.includes('YOUR_SUPABASE_URL'))
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

/** Dočasný referenční kód objednávky (zobrazí se, dokud Supabase nevrátí
    skutečné pořadové číslo, a slouží i ke spárování s e-mailem). */
function generateOrderReference() {
  const d = new Date();
  const datePart = d.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `REF-${datePart}-${rand}`;
}

document.getElementById('checkout-form').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const street = form.street.value.trim();
  const houseNumber = form.houseNumber.value.trim();
  const city = form.city.value.trim();
  const zip = form.zip.value.trim();
  const address = `${street} ${houseNumber}, ${zip} ${city}`.trim();
  const billingSame = form.billingSame.checked;
  const billingType = form.billingType.value;
  const company = form.company.value.trim();
  const ico = form.ico.value.trim();
  const dic = form.dic.value.trim();
  const billingAddress = billingSame ? address : `${form.billingStreet.value.trim()} ${form.billingHouseNumber.value.trim()}, ${form.billingZip.value.trim()} ${form.billingCity.value.trim()}`.trim();
  const message = (document.getElementById('cart-message')?.value || '').trim();
  form.address.value = address;
  const orderRef = generateOrderReference();

  const productsTotal = state.cart.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const shippingCost = state.shipping.cost || 0;
  const grandTotal = productsTotal + shippingCost;
  const lines = state.cart.map(i => `- ${i.productName} (${i.sku}) × ${i.qty} ks (${formatKc(i.unitPrice)}/ks) = ${formatKc(i.qty * i.unitPrice)}`);
  const body = [
    `Objednávka — Lahev & Tvar`,
    `Referenční kód: ${orderRef}`,
    ``,
    `Zákazník: ${name}`,
    `E-mail: ${email}`,
    `Telefon: ${phone}`,
    `Dodací adresa: ${address}`,
    `Fakturace: ${billingType === 'company' ? `Firma ${company} (IČO ${ico}${dic ? `, DIČ ${dic}` : ''})` : 'Fyzická osoba'}`,
    `Fakturační adresa: ${billingAddress}`,
    `Zpráva k objednávce: ${message || '—'}`,
    ``,
    `Položky:`,
    ...lines,
    ``,
    `Doprava: ${shippingCost > 0 ? formatKc(shippingCost) : 'bude upřesněna dle zadaných údajů'}`,
    `Platba: Platba online — platební pokyny (číslo účtu, QR platba) zašleme e-mailem po přijetí objednávky. Po dokončení platby je objednávka ihned závazně potvrzena.`,
    `Zboží celkem: ${formatKc(productsTotal)}`,
    `Celkem s dopravou: ${formatKc(grandTotal)}`,
    ``,
    `(Pozn.: soubory s motivy si prosím připravte k samostatnému odeslání. Referenční kód není oficiální číslo objednávky.)`
  ].join('\n');

  const useFallback = FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID');

  if (useFallback) {
    const mailto = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent('Objednávka')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    showToast('Formspree ještě není nastavené — otevírám e-mail místo automatického odeslání.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Odesílám…';

  // Zápis objednávky do Supabase — sem si ji může chodit číst váš program.
  // Selhání nezablokuje hlavní odeslání objednávky přes e-mail.
  let orderNumber = null; // skutečné pořadové číslo z databáze (sloupec "id")
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('orders')
        .insert({
          reference_code: orderRef,
          customer_name: name,
          customer_email: email,
          customer_address: address,
          items: state.cart.map(i => ({
            sku: i.sku, name: i.productName, qty: i.qty,
            unitPrice: i.unitPrice, lineTotal: i.qty * i.unitPrice
          })),
          shipping_method: state.shipping.method,
          shipping_label: state.shipping.label,
          shipping_cost: shippingCost,
          payment_method: 'online',
          payment_note: 'Platební pokyny zasílány e-mailem, objednávka závazná po platbě',
          products_total: productsTotal,
          shipping_total: shippingCost,
          grand_total: grandTotal
        })
        .select('id')
        .single();
      if (error) throw error;
      orderNumber = data.id;
    } catch (err) {
      console.warn('Zápis objednávky do Supabase se nepodařil.', err);
    }
  }

  try {
    const payload = {
      jméno: name,
      email: email,
      adresa: address,
      telefon: phone,
      fakturace: { typ: billingType, firma: company, ico, dic, adresa: billingAddress },
      zprava: message,
      referenční_kód: orderRef,
      číslo_objednávky: orderNumber || '(Supabase nenastaveno)',
      objednávka: body,
      _subject: 'Objednávka',
      _replyto: email
    };
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('formspree-failed');

    document.getElementById('checkout-form').hidden = true;
    document.querySelector('.shipping-block').hidden = true;
    document.querySelector('.payment-block').hidden = true;
    document.getElementById('checkout-totals').hidden = true;
    const success = document.getElementById('order-success');
    success.querySelector('.order-ref').textContent = orderNumber ? `#${orderNumber}` : orderRef;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'start' });

    state.cart = [];
    saveCart();
    renderCart();
    showToast('Objednávka byla odeslána');
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Odeslat objednávku';
    showToast('Odeslání se nepovedlo, zkuste to prosím znovu nebo napište přímo na e-mail.');
  }
});

/* ---------- Toast ---------- */
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ---------- Ukázkový motiv pro hero (procedurální, ne fotka zákazníka) ---------- */
function makeSampleArtCanvas() {
  const c = document.createElement('canvas');
  c.width = 400; c.height = 400;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 400, 400);
  grad.addColorStop(0, '#C1723F');
  grad.addColorStop(1, '#1B2B22');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 400, 400);
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = '#F3EFE2';
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.ellipse(100 + i * 110, 140 + (i % 2) * 140, 130, 130, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#F3EFE2';
  ctx.font = '700 46px "Fraunces", serif';
  ctx.textAlign = 'center';
  ctx.fillText('Vaše', 200, 190);
  ctx.fillText('značka', 200, 245);
  return c;
}

function drawHero() {
  const canvas = document.getElementById('hero-canvas');
  const skin = PRODUCTS[0].skins[0];
  drawBottle(canvas, {
    skinSrc: skin.src,
    labelFrac: skin.label,
    image: makeSampleArtCanvas(),
    transform: { scale: 1, rotate: 0, offsetX: 0, offsetY: 0 }
  });
}

/* ---------- Inicializace ---------- */
loadCart();
renderCart();
renderCategoryFilters();
preloadSkins().then(() => {
  renderProductGrid();
  drawHero();
  if (IS_PRODUCT_PAGE) {
    const sku = new URLSearchParams(location.search).get('sku');
    const product = PRODUCTS.find(p => p.sku === sku) || PRODUCTS[0];
    openCustomizer(product);
  }
}).catch(() => {
  showToast('Nepodařilo se načíst fotky lahví. Zkontrolujte prosím soubory ve složce assets.');
});
