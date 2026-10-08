const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:768,height:1024},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:8003/cast-v3/');
 assert.equal(await page.locator('.hero-content').evaluate(el=>getComputedStyle(el).animationName),'none');
 await page.keyboard.press('Tab');assert.equal(await page.locator('.skip-link').evaluate(el=>el===document.activeElement),true);
 await page.keyboard.press('Enter');assert.equal(new URL(page.url()).hash,'');assert.equal(await page.locator('#app').evaluate(el=>el===document.activeElement),true);
 const logo=await page.locator('.brand img').getAttribute('src');assert.equal(logo,'../IMG_0316.png');
 const response=await page.request.get('http://127.0.0.1:8003/IMG_0316.png');assert.deepEqual(await response.body(),fs.readFileSync('IMG_0316.png'));
 await page.setViewportSize({width:390,height:844});await page.reload();await page.getByRole('button',{name:'Menu'}).click();await page.keyboard.press('Escape');assert.equal(await page.getByRole('button',{name:'Menu'}).getAttribute('aria-expanded'),'false');
 await page.screenshot({path:'/tmp/cast-v3-home-phone.png',fullPage:true});
 for(const route of ['competition/ultegra','merchandise','dashboard','admin/create']){await page.goto(`http://127.0.0.1:8003/cast-v3/#/${route}`);await page.screenshot({path:`/tmp/cast-v3-${route.replace('/','-')}.png`,fullPage:true});}
 const writes=[];page.on('request',r=>{if(r.method()!=='GET')writes.push(r.url())});
 await page.getByLabel('Competition title',{exact:true}).fill('<img src=x onerror=alert(1)>');await page.getByRole('button',{name:'Validate demo draft'}).click();assert.deepEqual(writes,[]);assert.equal(await page.locator('img[src=x]').count(),0);
 execFileSync('sh',['cast-v3/build-preview.sh']);const first=fs.readFileSync('cast-v3-preview-dist/cast-v3/index.html');execFileSync('sh',['cast-v3/build-preview.sh']);assert.deepEqual(first,fs.readFileSync('cast-v3-preview-dist/cast-v3/index.html'));
 const staged=await page.request.get('http://127.0.0.1:8003/cast-v3-preview-dist/cast-v3/');assert.equal(staged.status(),200);
 const asset=await page.request.get('http://127.0.0.1:8003/cast-v3-preview-dist/IMG_0316.png');assert.deepEqual(await asset.body(),fs.readFileSync('IMG_0316.png'));
 await page.goto('http://127.0.0.1:8003/cast-v3-preview-dist/cast-v3/#/competition/ultegra');assert(await page.getByRole('button',{name:'Entries unavailable · Design preview'}).isDisabled());
 console.log('PASS reduced motion, keyboard skip link, Escape menu, exact logo bytes, inert form input, no writes, repeatable preview build and staged route/assets');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
