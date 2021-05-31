const puppeteer = require('puppeteer');
//this is the way to get the url for each movie
// const body = document.querySelector("tbody");
// const trs = body.getElementsByTagName("tr");
// const arr = Array.prototype.slice.call(trs);
// const tds = arr.map(e => {
//     return (e.cells[1])
// })
// const list = tds.map(e => Array.prototype.slice.call(e.getElementsByTagName('a')))
// const as = a = list.map(e => (e[0]))      
// const filter = as.filter(e => {
//     if (e !== undefined) {
//         return(e)
//     }
// })
// filter.forEach(e => console.log(e.href))


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page2 = await browser.newPage();
    const url2 = 'https://www.boxofficemojo.com/year/openings/'
    await page2.goto(url2);

    //to receive all of the urls
    // const data = () => {
    //     const body = document.querySelector("tbody");
    //     const trs = body.getElementsByTagName("tr");
    //     const arr = Array.prototype.slice.call(trs);
    //     const tds = arr.map(e => {
    //         return (e.cells[1])
    //     })
    //     const list = tds.map(e => Array.prototype.slice.call(e.getElementsByTagName('a')))
    //     const as = a = list.map(e => (e[0]))
    //     const filter = as.filter(e => {
    //         if (e !== undefined) {
    //             return (e)
    //         }
    //     })
    //     // filter.forEach(e => console.log(e.href))
    //     // return filter.map(e => e.href)
    //     const mapped = filter.map(e => {
    //         return movieItem = {
    //             name: e.innerText,
    //             url: e.href
    //         }
    //     })

    //     return mapped
    // }

    // console.log(data)

    //code to extract information from each url

    // const data = await page2.evaluate(() => {
    //     const mainDiv = document.querySelector('.mojo-summary-values');
    //     const textArr = Array.prototype.slice.call(mainDiv.children).map(e => e.children[1].innerText);
    //     return textArr
    // });
    console.log(data[1]);

    await browser.close();
})();


