const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const PORT = 8000;
const dirPath = path.join(__dirname, 'public/images/Maou');

const maouLinks = [];

var nMaou = 0;
fs.readdir(dirPath, (err, files) => {
    if(err) {
        return console.log('Error: ' + err);
    }
    files.forEach(file => {
        nMaou++;
        let numLink = (nMaou < 100 ? (nMaou < 10 ? "00" : "0") : "") + nMaou;
        maouLinks.push("http://127.0.0.1:8000/cap" + numLink);
    });
});


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {nMaou, maouLinks});
});


app.get('/cap001', (req, res) => {
    res.render('cap001');
});

/*
app.get('*', (req, res) => {
    res.render('error');
})
*/

const server = app.listen(PORT, () => {
    console.log('Listening at port ' + PORT);
});