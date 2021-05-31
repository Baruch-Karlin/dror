const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    const url = 'https://www.boxofficemojo.com/year/openings/'
    await page.goto(url);


    const result = await page.$$eval('table tr', rows => {
        return Array.from(rows, row => {
            const columns = row.querySelectorAll('td');
            return Array.from(columns, column => column.innerText);
        });
    });

    result.forEach(movie => {
        console.log(movie)
    })

    await browser.close();
})();


