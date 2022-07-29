import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
    })
    await page.goto("http://instagram.com/kaynnethy_milfont");
    await page.waitForSelector('div > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div._a3gq._ab-1 > section > main > div > header > section > div._aa_m > h2');
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
        document.querySelector("div > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div._a3gq._ab-1 > section > main > div > header > section > div._aa_m > h2").innerText = 'kaynnethy_viado'
    })
    await page.screenshot({ path: 'caneta.png' });

    //await browser.close();
})()

