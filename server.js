const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const PORT = 8000;
const dirPath = path.join(__dirname, 'public/images/Maou');



var nMaou = 0;
fs.readdir(dirPath, (err, files) => {
    if(err) {
        return console.log('Error: ' + err);
    }
    files.forEach(file => {
        nMaou++;
    });
});



app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cap001', (req, res) => {
    res.render('cap001');
});

app.get('*', (req, res) => {
    res.render('error');
})


const server = app.listen(PORT, () => {
    console.log('Listening at port ' + PORT);
});