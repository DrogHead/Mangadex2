const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const PORT = 8000;

const MAXNUM = 999;

// Database
const manga = [{
    titolo: 'Maou no Ore ga Dorei Elf',
    img: '/images/Cover/maou.png',
    desc: 'Zagan is feared as an evil mage, he is awkward and has a sharp tongue, and once again had to put down thieves that encroached on his territory when he researching that morning. In a dark auction, he finds a white slave elf, Nephie, who holds a peerless beauty',
    url: '/Maou',
    nick: 'Maou',
    dirPath: "",
    chapterLinks: [],
    numOfPages: []
},
{
    titolo: 'Assassin de Aru Ore no Sutetasu ga Yuusha Yori mo akiraka ni tsuyoi nodaga',
    img: '/images/Cover/assassin.png',
    desc: 'Akira is just having an usual day at his second year of high school when he and his fellow classmates get sucked into another world through a portal! This fantasy land is called Morigan, and is a world filled with Demons, Humans, Elves and other mystical creatures.',
    url: '/Assassin',
    nick: 'Assassin',
    dirPath: "",
    chapterLinks: [],
    numOfPages: []
},
{
    titolo: 'I Am The Sorcerer King',
    img: '/images/Cover/sorcerer.png',
    desc: '10 years ago, the monster horde from the rift formed from space and time started attacking the mankind. At the same time, people have started to awaken the power and began hunting the monsters for fame and money Lee SungHoon, in need of money because of his mother’s sickness, takes a dangerous job to help hunt those monsters four times ',
    url: '/Sorcerer',
    nick: 'Sorcerer',
    dirPath: "",
    chapterLinks: [],
    numOfPages: []
}];


// Fill directories for manga
manga.forEach(m => {
    m.dirPath = path.join(__dirname, 'public/images' + m.url);
});

// Fill number of chapters and number of pages per chapter
manga.forEach(m => {

    let n = 0;
    fs.readdir(m.dirPath, (err, files) => {

        if (err) return console.log('Error: ' + err);

        files.forEach(file => {

            n++;
            let str = (n < 100 ? (n < 10 ? "00" : "0") : "") + n;

            m.chapterLinks.push('http://127.0.0.1:' + PORT + m.url + '/cap' + str);

            let nn = 0;
            let ff = fs.readdirSync(path.join(m.dirPath, 'C' + str));
            ff.forEach(f => {
                nn++;
            })
            m.numOfPages.push(nn);

        });

    });

});


// Homepage
app.get('/', (req, res) => {
    res.render('index', {
        manga, PORT
    })
});


// Manga pages
manga.forEach(m => {

    app.get(m.url, (req, res) => {
        let links = m.chapterLinks;
        let nLinks = m.chapterLinks.length;
        res.render(m.nick + '/index', { m, links, nLinks });
    });

});


// Chapters pages
for (let i = 1; i <= MAXNUM; i++) {

    let str = (i < 100 ? (i < 10 ? "00" : "0") : "") + i;

    manga.forEach(m => {

        app.get(m.url + '/cap' + str, (req, res) => {
            if (i > m.chapterLinks.length) return;
            else {
                let num = m.numOfPages[i - 1];
                let index = str;
                res.render(m.nick + '/cap' + str, { num, index });
            }
        });

    });
}



const server = app.listen(PORT, () => {
    console.log('Listening at port ' + PORT);
});