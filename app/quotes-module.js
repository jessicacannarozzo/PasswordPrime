const request = require('request');
const quotesURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
const quoteLen = 60;

//methods
//input: quote (string)
//output: create password from first letter of each word in the quote
function createQuotePW(quote) {
    if (quote) {
        const quotePW = quote.match(/\b(\w)/g).join('');
        
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
        if (!error && message.statusCode === 200 && JSON.parse(body).quoteText.length < quoteLen) {          
        //    body = formatQuote(body);
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
        } else {
            this.getQuote(cb); //find a new quote
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