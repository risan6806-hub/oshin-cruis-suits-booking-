import fs from 'node:fs';
const css = fs.readFileSync('.cand/fonts.css', 'utf8');
const blocks = css.split('@font-face').slice(1).map(b => '@font-face' + b.slice(0, b.indexOf('}') + 1));
// Keep only the subsets this site actually renders.
const keep = blocks.filter(b => /\/\* (latin|latin-ext) \*\//.test(css.slice(0, css.indexOf(b))) || true)
  .filter(b => {
    const i = css.indexOf(b);
    const comment = css.slice(0, i).match(/\/\* ([a-z-]+) \*\/\s*$/);
    return comment && (comment[1] === 'latin' || comment[1] === 'latin-ext');
  });
let out = '';
const seen = new Set();
for (const b of keep) {
  const url = b.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
  if (!url) continue;
  const file = url.split('/').slice(-2).join('-');
  if (!seen.has(file)) {
    seen.add(file);
    const res = await fetch(url);
    fs.writeFileSync(`public/fonts/${file}`, Buffer.from(await res.arrayBuffer()));
  }
  out += b.replace(url, `/fonts/${file}`).replace('@font-face', '@font-face') + '\n';
}
fs.writeFileSync('src/styles/fonts.css', `/* Self-hosted: Cormorant Garamond (display) + Jost (interface). */\n${out}`);
console.log('faces:', keep.length, 'files:', seen.size);
