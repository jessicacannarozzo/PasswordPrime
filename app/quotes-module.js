const request = require('request');
const quotesURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
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
                console.log(pw);
                pw += symbols[0];
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
    request.get({
        url: quotesURL
    }, (error, message,body) => {
        if (body) body = formatObj(body);
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

//removes escape character (\) in quotes with apostrophes
//input: quote obj
//output: quote (string)
exports.formatQuote = (obj) => {
    try {
        let quote = obj.quoteText;
        
        return quote;
    } catch(err) {
        console.log(err);
    }
}

//removes odd characters from quote
function formatObj(body) {
    if (body.charAt(0) === '?') { //format
        for (i = 0; i < body.length; i++) {
            if (body.charAt(i) === '\'') {
                // console.log(body);
                body = body.substring(0,i).concat("\\'").concat(body.substring(i+1,body.length));
                // console.log(body);             
                i +=2 ;   
            }
        }
        console.log(body);
        return body.substring(2,body.length-1);
    }
}