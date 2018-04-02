// Backend @authors: Jess Cannarozzo & Karla Martins-Spuldaro
var fs = require('fs');
const express = require('express');
const app = express();
const quoteModule = require('./quotes-module.js');
var bodyParser = require('body-parser')

//Middleware
app.use(express.static(__dirname)) //static server

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

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

app.post('/data', function(req,res){
  var dataObj = req.body;
  console.log(dataObj)
  csvText = "";
  for (var key in dataObj) {
	  if (dataObj.hasOwnProperty(key)) {
	    var val = dataObj[key];
	    csvText += val + ","
	  }
	}
	csvText+="\r\n"
    fs.appendFile('results.csv', csvText, function (err) {
  	if (err) throw err;
  		console.log('Updated!');
	});
	res.sendStatus(200);
});

app.listen(3000, () => console.log("We're live on 3000! In style."));