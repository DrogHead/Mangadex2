let bg_logo = document.getElementsByClassName('bg_logo')[0];
let pagine = document.getElementsByClassName('pagine')[0];
let controlli = document.getElementsByClassName('controlli');

// R E S P O N S I V E
function responsive() {
    bg_logo.style.width = bg_logo.getBoundingClientRect().height + 'px';
    for (let con of controlli) {
        con.style.width = pagine.getBoundingClientRect().width + 'px';
    }
}

responsive();

window.addEventListener('resize', responsive);
document.addEventListener('ready', responsive)

responsive();

// function topFunction() {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// }

$(document).ready(function(){
    $("div[id='top']").click(function(){
        $("html, body").animate({ scrollTop: 0 }, 1500);
    });
});

