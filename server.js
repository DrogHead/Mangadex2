const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const PORT = 8000;
const dirPath = path.join(__dirname, 'public/images/Maou');

const maouLinks = [];
const maouNums = [];

var nMaou = 0;
fs.readdir(dirPath, (err, files) => {
    if(err) {
        return console.log('Error: ' + err);
    }
    files.forEach(file => {
        nMaou++;
        let numLink = (nMaou < 100 ? (nMaou < 10 ? "00" : "0") : "") + nMaou;

        maouLinks.push("http://127.0.0.1:8000/Maou/cap" + numLink);

        fillNums(path.join(dirPath, 'C'+numLink));

    });
});

function fillNums(pth) {
    let n = 0;
    let files = fs.readdirSync(pth);
    files.forEach(file => {
        n++;
    });
    maouNums.push(n);
}



app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    const manga = [{
        titolo: 'Maou no Ore ga Dorei Elf',
        img: '/images/Cover/maou.png'
    },
    {
        titolo: 'Assassin de Aru Ore no Sutetasu ga Yuusha Yori mo akiraka ni tsuyoi nodaga',
        img: '/images/Cover/assassin.png'
    },
    {
        titolo: 'I Am The Sorcerer King',
        img: '/images/Cover/sorcerer.png'
    }];

    res.render('index', {
        manga, PORT
    })
});

app.get('/Maou', (req, res) => {
    res.render('Maou/index', {nMaou, maouLinks});
});


app.get('/Maou/cap001', (req, res) => {
    let num = maouNums[0];
    res.render('Maou/cap001', {num});
});

/*
app.get('*', (req, res) => {
    res.render('error');
})
*/

const server = app.listen(PORT, () => {
    console.log('Listening at port ' + PORT);
});