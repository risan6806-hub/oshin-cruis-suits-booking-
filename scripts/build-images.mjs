import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'public/img';
fs.mkdirSync(OUT, { recursive: true });

// role, source, aspect ratio, max width, grade intent
const SET = [
  ['hero-ocean',        'raw/33',   16/9,  2400, 'hero'],
  ['ocean-texture',     'raw2/141', 16/9,  1800, 'deep'],
  ['suite-ocean',       'raw2/116', 4/5,   1400, 'base'],
  ['suite-panorama',    'raw3/235', 4/5,   1400, 'base'],
  ['suite-grand',       'raw2/101', 4/5,   1400, 'base'],
  ['suite-residence',   'raw3/240', 4/5,   1400, 'base'],
  ['featured-suite',    'raw2/104', 16/9,  2200, 'hero'],
  ['detail-view',       'raw2/110', 3/2,   1800, 'base'],
  ['detail-space',      'raw/07',   3/2,   1800, 'base'],
  ['detail-details',    'raw2/114', 3/2,   1800, 'base'],
  ['detail-service',    'raw2/131', 3/2,   1800, 'base'],
  ['dest-santorini',    'raw/14',   3/4,   1200, 'base'],
  ['dest-maldives',     'raw/16',   3/4,   1200, 'base'],
  ['dest-dubai',        'raw/18',   3/4,   1200, 'base'],
  ['dest-mediterranean','raw/21',   3/4,   1200, 'base'],
  ['dest-fjords',       'raw3/207', 3/4,   1200, 'base'],
  ['dest-amalfi',       'raw/20',   3/4,   1200, 'base'],
  ['story-wake',        'raw3/230', 16/9,  2000, 'deep'],
  ['story-dine',        'raw/24',   16/9,  2000, 'deep'],
  ['story-ocean',       'raw/13',   16/9,  2000, 'deep'],
  ['story-return',      'raw3/250', 16/9,  2000, 'deep'],
  ['life-dining',       'raw/23',   1,     1100, 'base'],
  ['life-spa',          'raw2/120', 1,     1100, 'base'],
  ['life-pool',         'raw2/123', 1,     1100, 'base'],
  ['life-lounge',       'raw2/128', 1,     1100, 'base'],
  ['life-private',      'raw2/130', 1,     1100, 'base'],
  ['life-concierge',    'raw2/126', 1,     1100, 'base'],
  ['life-wellness',     'raw/28',   1,     1100, 'base'],
  ['life-deck',         'raw/04',   1,     1100, 'base'],
  ['interlude-vessel',  'raw3/204', 21/9,  2400, 'deep'],
  ['service-detail',    'raw3/244', 4/5,   1200, 'base'],
  ['cta-sunset',        'raw/32',   16/9,  2400, 'hero'],
];

const WIDTHS = [480, 768, 1200, 1800, 2400];

// Cropping is art direction, not automation: 'attention' picks salience, which
// threw away the hero's wave. Compose each frame deliberately.
const POSITION = {
  'hero-ocean': 'centre',
  'suite-panorama': 'right',
  'suite-grand': 'centre',
  'featured-suite': 'centre',
  'interlude-vessel': 'centre',
  'dest-santorini': 'centre',
  'life-deck': 'centre',
};
// One source fights the palette harder than the grade alone can fix.
const SAT_ADJUST = { 'dest-maldives': 0.72, 'dest-amalfi': 0.86 };

// Cinematic grade: cool the shadows toward Deep Ocean, warm the highlights
// toward Champagne, pull saturation back so mixed sources read as one campaign.
const NAVY = { r: 0x0a, g: 0x1e, b: 0x2c };
const CHAMP = { r: 0xb9, g: 0x9a, b: 0x67 };

const GRADES = {
  base: { sat: 0.80, bri: 0.99, contrast: 1.09, lift: -9,  navy: 0.30, champ: 0.13 },
  deep: { sat: 0.74, bri: 0.94, contrast: 1.12, lift: -14, navy: 0.40, champ: 0.12 },
  hero: { sat: 0.82, bri: 0.95, contrast: 1.10, lift: -12, navy: 0.34, champ: 0.15 },
};

const tintLayer = async (w, h, color, alpha) =>
  sharp({ create: { width: w, height: h, channels: 4,
    background: { ...color, alpha } } }).png().toBuffer();

async function grade(input, g) {
  const base = sharp(input)
    .modulate({ saturation: g.sat, brightness: g.bri })
    .linear(g.contrast, g.lift);
  const buf = await base.png().toBuffer();
  const { width, height } = await sharp(buf).metadata();
  return sharp(buf)
    .composite([
      { input: await tintLayer(width, height, NAVY, g.navy), blend: 'soft-light' },
      { input: await tintLayer(width, height, CHAMP, g.champ), blend: 'soft-light' },
    ])
    .toBuffer();
}

const manifest = {};

for (const [name, src, ratio, maxW, gradeKey] of SET) {
  const file = `.cand/${src}.jpg`;
  if (!fs.existsSync(file)) { console.error('MISSING', file); continue; }

  const g = { ...GRADES[gradeKey] };
  if (SAT_ADJUST[name]) g.sat *= SAT_ADJUST[name];
  const targetH = Math.round(maxW / ratio);
  // crop to the role's aspect first, then grade once at full size
  const cropped = await sharp(file)
    .resize(maxW, targetH, { fit: 'cover', position: POSITION[name] ?? 'centre' })
    .toBuffer();
  const graded = await grade(cropped, g);

  const widths = WIDTHS.filter(w => w <= maxW);
  if (!widths.includes(maxW)) widths.push(maxW);

  for (const w of widths) {
    await sharp(graded)
      .resize(w, Math.round(w / ratio), { fit: 'cover' })
      .webp({ quality: w > 1400 ? 72 : 78, effort: 5 })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
  }

  const lqip = await sharp(graded)
    .resize(22, Math.max(1, Math.round(22 / ratio)), { fit: 'cover' })
    .blur(1.2).webp({ quality: 42 }).toBuffer();

  manifest[name] = {
    widths,
    ratio: Number(ratio.toFixed(4)),
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  };
  console.log('✓', name, widths.join('/'));
}

fs.writeFileSync('src/lib/images.generated.ts',
`// AUTO-GENERATED by scripts/build-images.mjs — do not edit by hand.
export type ImageAsset = { widths: number[]; ratio: number; lqip: string };
export const IMAGES = ${JSON.stringify(manifest, null, 2)} as const satisfies Record<string, ImageAsset>;
export type ImageName = keyof typeof IMAGES;
`);
console.log('\nmanifest written:', Object.keys(manifest).length, 'assets');
