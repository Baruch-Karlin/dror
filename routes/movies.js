const express = require('express');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Movie = require('./mongooseSchema');


const router = express.Router();


router.post('/', async (req, res, next) => {

    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        const url = 'https://www.boxofficemojo.com/year/openings/'
        await page.goto(url);


        const result = await page.$$eval('tbody tr', rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            });
        });

        const data = await page.evaluate(() => {
            const body = document.querySelector("tbody");
            const trs = body.getElementsByTagName("tr");
            const arr = Array.prototype.slice.call(trs);
            const tds = arr.map(e => {
                return (e.cells[1])
            })
            const list = tds.map(e => Array.prototype.slice.call(e.getElementsByTagName('a')))
            const as = a = list.map(e => (e[0]))
            const filter = as.filter(e => {
                if (e !== undefined) {
                    return (e)
                }
            })
            // filter.forEach(e => console.log(e.href))
            // return filter.map(e => e.href)
            return filter;
        });
        console.log(data)


        // result.map(movieItem => {
        //     if (movieItem.length) {
        //         const movie = new Movie({
        //             _id: new mongoose.Types.ObjectId(),
        //             year: movieItem[0],
        //             movie_title: movieItem[1],
        //             opening_gross: movieItem[2],
        //             theaters: movieItem[4],
        //             total_gross: movieItem[6]
        //         })
        //         movie.save()
        //             .then(result => {
        //                 res.status(200)
        //             })
        //     }
        // })
        await browser.close();
    })();
})

router.get('/', async (req, res, next) => {
    const result = await Movie.find({}).select('total_gross');
    const filter = result.filter(obj => obj.total_gross);
    const mapped = filter.map(obj => {
        return (+obj.total_gross.replace(/[^0-9]/g, ''));
    })
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = mapped.reduce(reducer);
    res.send({ sum });
})

module.exports = router;