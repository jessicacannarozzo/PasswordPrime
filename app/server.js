// Backend @authors: Jess Cannarozzo & Karla Martins-Spuldaro
const express = require('express');
const app = express();
const quoteModule = require('./quotes-module.js');


//routes
app.get('/', (req, res) => {
    res.sendStatus(200);
});

// output: passwordObj with generated quote password, quote, author, quote link
app.get('/quotes', (req, res) => { 
    quoteModule.getQuote(res);
});

app.get('/colours', (req,res) => { 
    res.sendStatus(200);
});

app.get('/credits', (req,res) => { 
    res.sendStatus(200);
});


app.listen(3000, () => console.log("We're live on 3000! In style."));