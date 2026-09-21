import sharp from 'sharp';
import fs from 'node:fs';
const names=[...new Set(fs.readdirSync('public/img').map(f=>f.replace(/-\d+\.webp$/,'')))].sort();
const CW=300,CH=200,COLS=5,PAD=6,LBL=20;
const rows=Math.ceil(names.length/COLS);
const W=COLS*(CW+PAD)+PAD,H=rows*(CH+LBL+PAD)+PAD;const t=[];
for(let i=0;i<names.length;i++){
  const c=i%COLS,r=Math.floor(i/COLS),x=PAD+c*(CW+PAD),y=PAD+r*(CH+LBL+PAD);
  const files=fs.readdirSync('public/img').filter(f=>f.startsWith(names[i]+'-')&&/-(768|480)\.webp$/.test(f));
  const b=await sharp('public/img/'+files[0]).resize(CW,CH,{fit:'cover'}).jpeg({quality:75}).toBuffer();
  t.push({input:b,left:x,top:y+LBL});
  t.push({input:Buffer.from(`<svg width="${CW}" height="${LBL}"><rect width="${CW}" height="${LBL}" fill="#111"/><text x="4" y="15" font-family="monospace" font-size="13" fill="#B99A67">${names[i]}</text></svg>`),left:x,top:y});
}
await sharp({create:{width:W,height:H,channels:3,background:'#000'}}).composite(t).jpeg({quality:76}).toFile('.cand/graded.jpg');
console.log(names.length);
