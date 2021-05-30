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


        const result = await page.$$eval('table tr', rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            });
        });
        
         // console.log(result);

        result.map(movieItem => {
            // console.log(movie)
            const movie = new Movie({
                _id: new mongoose.Types.ObjectId(),
                year: movieItem[0],
                movie_title: movieItem[1],
                opening_gross: movieItem[2],
                theaters: movieItem[4],
                total_gross: movieItem[6]
            })
            movie.save()
                .then(result => {
                    res.status(200)
                })
        })
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