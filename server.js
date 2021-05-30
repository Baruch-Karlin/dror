const express = require("express");
const mongoose = require('mongoose');

const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

app.use("/movies", require('./routes/movies'));

app.get('/', (req, res) => {
    res.send(`Hello world from local`);
});

const port = 5050;
const host = '127.0.0.1'
const db_url = 'mongodb+srv://test:test@cluster0.98ts0.mongodb.net/first_db?retryWrites=true&w=majority';

mongoose.connect(db_url,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then((response) => {
        console.log('your data base is ' + response.connections[0].name)
        app.listen(port, host, () => {
            console.log(`the server is listening at http://${host}:${port}`);
        });
    });