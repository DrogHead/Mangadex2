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
        img: '/images/Cover/maou.png',
        desc: 'Zagan is feared as an evil mage, he is awkward and has a sharp tongue, and once again had to put down thieves that encroached on his territory when he researching that morning. In a dark auction, he finds a white slave elf, Nephie, who holds a peerless beauty',
        link: 'Maou no Ore ga Dorei Elf wo Yome ni Shitanda ga, Dou Medereba Ii? chapter 32\nMaou no Ore ga Dorei Elf wo Yome ni Shitanda ga, Dou Medereba Ii? chapter 33'
    },
    {
        titolo: 'Assassin de Aru Ore no Sutetasu ga Yuusha Yori mo akiraka ni tsuyoi nodaga',
        img: '/images/Cover/assassin.png',
        desc: 'Akira is just having an usual day at his second year of high school when he and his fellow classmates get sucked into another world through a portal! This fantasy land is called Morigan, and is a world filled with Demons, Humans, Elves and other mystical creatures.',
        link: 'My Status as an Assassin Obviously Exceeds the Brave s chapter 21\nMy Status as an Assassin Obviously Exceeds the Brave s chapter 22'
    },
    {
        titolo: 'I Am The Sorcerer King',
        img: '/images/Cover/sorcerer.png',
        desc: '10 years ago, the monster horde from the rift formed from space and time started attacking the mankind. At the same time, people have started to awaken the power and began hunting the monsters for fame and money Lee SungHoon, in need of money because of his mother’s sickness, takes a dangerous job to help hunt those monsters four times ',
        link: 'I Am The Sorcerer King chapter 17\nI Am The Sorcerer King chapter 16'
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