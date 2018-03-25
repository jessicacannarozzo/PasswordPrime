const request = require('request');
const quotesURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
const quoteLen = 40;
const pwLen = 60;
const symbols = "!@#$%^&";
const numbers = "1234567890";

//methods
//input: quote (string)
//output: create password from first letter of each word in the quote
function createQuotePW(quote) {
    if (quote) {
        quotePW = quote.match(/\b(\w)/g).join(''); //get first letter of each word in quote
        // while (quotePw.length < pwLen) {
        //     i = 
        //     quotePw = quotePW.slice(0, )
        // }
        return quotePW;
    }
}

//input: res from app.get('/quotes')
//logic: gets quote from quotesURL
//output: returns quote to res
exports.getQuote = (cb) => {
    request.get({
        url: quotesURL
    }, (error, message,body) => {
        if (body) body = formatQuote(body);
        if (!error && message.statusCode === 200 && (body && JSON.parse(body)).quoteText.length < quoteLen) {          
            let quote = {};
            
            try {
                quote = JSON.parse(body);
                const passwordObj = {
                    pw: createQuotePW(quote.quoteText),
                    quote: quote.quoteText,
                    author: quote.quoteAuthor,
                    link: quote.quoteLink
                };
                return cb.send(passwordObj)
            } catch(err) {
                console.log(err);
            }

            // console.log(quote.quoteText);

        } else {
            this.getQuote(cb); //find a new quote
        }
    });
}

// removes odd characters from quote
function formatQuote(body) {
    if (body.charAt(0) === '?') { //format
        for (i = 0; i < body.length; i++) {
            if (body.charAt(i) === '\'') {
                console.log(body);
                body = body.substring(0,i).concat("\\'").concat(body.substring(i+1,body.length));
                console.log(body);             
                i +=2 ;   
            }
        }
        return body.substring(2,body.length-1);
    }
}