// Backend @authors: Jess Cannarozzo & Karla Martins-Spuldaro
/*
Express Server
access at http://localhost:3000/ when running
*/

var fs = require('fs');
const express = require('express');
const app = express();
const quoteModule = require('./quotes-module.js');
var bodyParser = require('body-parser')

//Middleware
app.use(express.static(__dirname)) //static server
app.use(bodyParser.json()); //bodyparser for JSON object
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.get('/quotes.html', (req, res) => {
  res.sendFile('/quotes.html', {root: __dirname});
})

// output: passwordObj with generated quote password, quote, author, quote link
app.get('/quotes', (req, res) => {
   	quoteModule.getQuote(res);
});

//output: write contents of JSON object to results.csv file for analysis
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

app.listen(process.env.PORT || 3000, () => console.log("We're live on 3000! In style."));