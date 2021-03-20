let nMaou = 20
let Body = document.getElementById("b");


for(let i = 1; i <= nMaou; i++) {
    let A = document.createElement('a');

    let text = "Capitolo " + i;
    A.innerText = text;

    Body.appendChild(A);
    Body.innerHTML += "<br>";
}