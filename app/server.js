// Backend @authors: Jess Cannarozzo & Karla Martins-Spuldaro

const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send(200);
});

app.listen(3000, () => console.log("We're live on 3000! In style."));