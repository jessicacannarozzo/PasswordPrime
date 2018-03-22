// Backend @authors: Jess Cannarozzo & Karla Martins-Spuldaro
const express = require('express');
const app = express();
const request = require('request');
const quotesURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";

//routes
app.get('/', (req,res) => { 
    res.sendStatus(200);
});

app.get('/quotes', (req,res) => { 
    request.get({
        url: quotesURL
    }, (error, message,body) => {
        if (!error && message.statusCode === 200) {
            if (body.charAt(0) === '?') { //format
                body = body.substring(2,body.length-1);
            }
            
            // createQuotePW(body);
            obj = {
                pw: createQuotePW(JSON.parse(body).quoteText),
                quote: JSON.parse(body).quoteText,
                author: JSON.parse(body).quoteAuthor,
                link: JSON.parse(body).quoteLink
            };
            res.send(obj);
        }
    });
});

app.get('/colours', (req,res) => { 
    res.sendStatus(200);
});

app.get('/credits', (req,res) => { 
    res.sendStatus(200);
});

//methods
function createQuotePW(quote) {
    var quotePW = quote.match(/\b(\w)/g).join('');
    console.log(quotePW);
    return quotePW;
}

app.listen(3000, () => console.log("We're live on 3000! In style."));