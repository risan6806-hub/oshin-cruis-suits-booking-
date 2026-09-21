import sharp from 'sharp';
const picks=[['raw/33','A HERO dark wave'],['raw2/141','B ocean texture'],['raw3/202','C dark aerial'],['raw3/204','D superyacht'],['raw3/230','E sunrise calm'],['raw/32','F pastel open sea']];
const CW=740,CH=420,PAD=8,LBL=26;
const t=[];let y=PAD;
for(const [p,l] of picks){
  const b=await sharp(`.cand/${p}.jpg`).resize(CW,CH,{fit:'cover'}).jpeg({quality:80}).toBuffer();
  t.push({input:Buffer.from(`<svg width="${CW}" height="${LBL}"><rect width="${CW}" height="${LBL}" fill="#111"/><text x="6" y="19" font-family="monospace" font-size="17" fill="#fff">${l}</text></svg>`),left:PAD,top:y});
  t.push({input:b,left:PAD,top:y+LBL}); y+=CH+LBL+PAD;
}
await sharp({create:{width:CW+PAD*2,height:y,channels:3,background:'#000'}}).composite(t).jpeg({quality:82}).toFile('.cand/heroes.jpg');
