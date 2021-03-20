const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const PORT = 8000;
const dirPath = path.join(__dirname, 'public/images/Maou');

var nMaou = 0;

app.use(express.static(__dirname + '/public'));


fs.readdir(dirPath, (err, files) => {
    if(err) {
        return console.log('Error: ' + err);
    }
    files.forEach(file => {
        nMaou++;
    });
});

app.get('/', (req, res) => {
    res.json({Maou:nMaou});
    res.sendFile(__dirname + '/index.html');
});

const server = app.listen(PORT, () => {
    console.log('Listening at port ' + PORT);
});