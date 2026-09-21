import sharp from 'sharp';
import fs from 'node:fs';

const files = fs.readdirSync('.cand/raw3').filter(f=>f.endsWith('.jpg')).sort();
const CW=300, CH=200, COLS=5, PAD=6, LBL=22;
const rows = Math.ceil(files.length/COLS);
const W = COLS*(CW+PAD)+PAD, H = rows*(CH+LBL+PAD)+PAD;

const tiles = [];
for (let i=0;i<files.length;i++){
  const c=i%COLS, r=Math.floor(i/COLS);
  const x=PAD+c*(CW+PAD), y=PAD+r*(CH+LBL+PAD);
  const buf = await sharp(`.cand/raw3/${files[i]}`).resize(CW,CH,{fit:'cover'}).jpeg({quality:72}).toBuffer();
  tiles.push({input:buf, left:x, top:y+LBL});
  const name = files[i].replace('.jpg','');
  const svg = Buffer.from(`<svg width="${CW}" height="${LBL}"><rect width="${CW}" height="${LBL}" fill="#111"/><text x="4" y="16" font-family="monospace" font-size="15" fill="#fff">#${name}</text></svg>`);
  tiles.push({input:svg, left:x, top:y});
}
await sharp({create:{width:W,height:H,channels:3,background:'#000'}})
  .composite(tiles).jpeg({quality:74}).toFile('.cand/sheet3.jpg');
console.log('sheet', W, H);
