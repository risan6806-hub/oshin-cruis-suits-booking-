import sharp from 'sharp';
const p=[['suite-panorama',4/5],['suite-grand',4/5],['detail-view',3/2],['suite-ocean',4/5],['suite-residence',4/5]];
const t=[];let x=6;const H=460;
for(const [n,r] of p){const w=Math.round(H*r);
 const b=await sharp(`public/img/${n}-768.webp`).resize(w,H,{fit:'cover'}).jpeg({quality:80}).toBuffer();
 t.push({input:Buffer.from(`<svg width="${w}" height="22"><rect width="${w}" height="22" fill="#111"/><text x="4" y="16" font-family="monospace" font-size="14" fill="#B99A67">${n}</text></svg>`),left:x,top:6});
 t.push({input:b,left:x,top:28});x+=w+6;}
await sharp({create:{width:x,height:H+34,channels:3,background:'#000'}}).composite(t).jpeg({quality:82}).toFile('.cand/suites.jpg');
