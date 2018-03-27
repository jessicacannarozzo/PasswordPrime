// Backend @authors: Jess Cannarozzo & Karla Martins-Spuldaro
const express = require('express');
const app = express();
const quoteModule = require('./quotes-module.js');

//Middleware
app.use(express.static(__dirname)) //static server

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.get('/colour.html', (req, res) => {
  res.sendFile('/colour.html', {root: __dirname});
})

app.get('/quotes.html', (req, res) => {
  res.sendFile('/quotes.html', {root: __dirname});
})

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