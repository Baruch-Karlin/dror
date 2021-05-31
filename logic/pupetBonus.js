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
        const tds = arr.map(e => {
            return (e.cells[1])
        })
        // tds.forEach(e => console.log(Array.prototype.slice.call(e.getElementsByTagName('a'))))
        const list = tds.map(e => Array.prototype.slice.call(e.getElementsByTagName('a')))
        const as = a = list.map(e => (e[0]))      
        const filter = as.filter(e => {
            if (e !== undefined) {
                return(e)
            }
        })
        filter.forEach(e => console.log(e.href))



        // const href = trs[5].getElementsByTagName("td")[1].firstElementChild.href 
        return href;
    });

    console.log(data);

    await browser.close();
})();


