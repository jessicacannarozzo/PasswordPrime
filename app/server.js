// Backend @authors: Jess Cannarozzo & Karla Martins-Spuldaro
const express = require('express');
const app = express();
const request = require('request');
const quotesURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";

const quoteLen = 60;

//routes
app.get('/', (req, res) => {
    res.sendStatus(200);
});

// output: passwordObj with generated quote password, quote, author, quote link
app.get('/quotes', (req, res) => { 
    // var result = getQuote(handleQuote);

    getQuote(res);
});

app.get('/colours', (req,res) => { 
    res.sendStatus(200);
});

app.get('/credits', (req,res) => { 
    res.sendStatus(200);
});

//methods
//input: quote (string)
//output: create password from first letter of each word in the quote
function createQuotePW(quote) {
    if (quote) {const quotePW = quote.match(/\b(\w)/g).join('');
        console.log(quotePW);
        return quotePW;
    }
}

// gets quote from quotesURL, returns quote to res
function getQuote(cb) {
    request.get({
        url: quotesURL
    }, (error, message,body) => {
        if (!error && message.statusCode === 200) {          
           body = formatQuote(body);
            let quote = {};
            
            try {
                quote = JSON.parse(body);
            } catch(err) {
                console.log(err);
            }

            console.log(quote.quoteText);
                        
            
            const passwordObj = {
                pw: createQuotePW(quote.quoteText),
                quote: quote.quoteText,
                author: quote.quoteAuthor,
                link: quote.quoteLink
            };
            return cb.send(passwordObj)
        }
    });
}

// removes odd characters from quote
function formatQuote(body) {
    if (body.charAt(0) === '?') { //format
        // console.log(body);
        return body.substring(2,body.length-1);
    }
}

app.listen(3000, () => console.log("We're live on 3000! In style."));