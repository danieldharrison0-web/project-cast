const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage();
 const base=process.env.PREVIEW_URL||'http://127.0.0.1:8010/';
 for(const width of [375,768,1440]){
  await page.setViewportSize({width,height:1000});
  for(const route of ['/','/competitions','/competition/ultegra']){
   await page.goto(base+'#'+route);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   for(const placeholder of await page.locator('.prize-placeholder').all()){
    const label=await placeholder.locator('.eyebrow').boundingBox();
    const caption=await placeholder.locator('.placeholder-caption').boundingBox();
    const frame=await placeholder.boundingBox();
    assert(label.y+label.height<caption.y,'Placeholder text overlaps');
    assert(caption.y+caption.height<=frame.y+frame.height,'Caption exceeds image area');
   }
   const cards=page.locator('.competition-card');
   for(const card of await cards.all()){
    const box=await card.boundingBox();
    if(width===375)assert(box.height<510,`Mobile card unexpectedly tall: ${box.height}`);
    assert(await card.getByRole('link',{name:'Preview entry',exact:true}).isVisible());
    assert((await card.innerText()).includes('DEMONSTRATION COMPETITION'));
    assert(await card.evaluate(el=>[...el.querySelectorAll('h3,small,.card-facts')].every(e=>e.scrollWidth<=e.clientWidth)));
   }
   if(route==='/competitions'){
    const first=cards.first();assert((await first.innerText()).includes('£2.99'));assert((await first.innerText()).includes('£1,250'));
    await page.screenshot({path:`/tmp/cast-v3-cards-${width}.png`,fullPage:true});
    console.log(`PASS ${width}px: no overlap or clipping; card height ${Math.round((await first.boundingBox()).height)}px; prices and preview action preserved`);
   }
  }
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
