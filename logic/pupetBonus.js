const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    const url = 'https://www.boxofficemojo.com/year/openings/'
    await page.goto(url);


    const data = await page.evaluate(() => {
        const body = document.querySelector("tbody");
        const trs = body.getElementsByTagName("tr");  
        const arr = Array.prototype.slice.call(trs);
       

        // const href = trs[5].getElementsByTagName("td")[1].firstElementChild.href 
        return href;
    });

    console.log(data);

    await browser.close();
})();


