const unirest = require('unirest');
const quotesURL = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1";
const APIKey = "e3XdZah2iYmshpzDEF2ip2OLqWOSp1xmzfbjsn5otNlXeuUkPG";
const quoteLen = 50;
const pwLen = 14;
const symbols = "!@#$%^&";
const numbers = "1234567890";

//methods
//input: quote (string)
//output: create password from first letter of each word in the quote
function createQuotePW(quote) {
    quotePw = "";
    if (quote) {
        let quotePw = quote.match(/\b(\w)/g).join(''); //get first letter of each word in quote

        function addSpecialCharacters(pw) {
            while (pw.length < pwLen) {
                let i = Math.floor(Math.random() * symbols.length);
                let j = Math.floor(Math.random() * numbers.length);
                pw += symbols[i];
                pw = numbers[j] + pw;
            }
            return pw;
        }
        quotePw = addSpecialCharacters(quotePw);
        return quotePw;
    }
}

//input: res from app.get('/quotes')
//logic: gets quote from quotesURL
//output: returns quote to res
exports.getQuote = (cb) => {
    var thisInstance = this; //save so that we can go back incase our get request doesn't work out

    unirest.get(quotesURL)
    .header("X-Mashape-Key", APIKey)
    .header("Accept", "application/json")
    .end(function (result) {
        if (result && result.body.quote.length < quoteLen) {
            let passwordObj = {};
            try {
                passwordObj = {
                    pw: createQuotePW(result.body.quote),
                    quote: result.body.quote,
                    author: result.body.author,
                    category: result.body.category
                };
            } catch(err) {
                console.log(err);
            }

            return cb.send(passwordObj);
        } else {
            thisInstance.getQuote(cb); //try again
        }
    });
}