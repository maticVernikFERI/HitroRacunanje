$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let racunanjeDo = urlParams.get("racunanjeDo");
    let operacije = urlParams.getAll("operacije");
    let tipIgre = urlParams.get("tipIgre");
    let rezultat = napisiRacun(operacije, racunanjeDo);
    let stPravilnih = 0;
    let stNarobnih = 0;

    $(".num").click(beriRezultat);
    $("#oddaj").click(function () {
        if(oddajRezultat(rezultat)) {
            stPravilnih++;
        } else {
            stNarobnih++;
        }
        rezultat = napisiRacun(operacije, racunanjeDo);
        $("#odgovor").html("");
    });
});

function oddajRezultat(rezultat) {
    let napisanRezultat = $("#odgovor").html();
    if (rezultat == napisanRezultat) {
        return true;
    } else {
        return false;
    }
}

function beriRezultat() {
    let rezString = $("#odgovor").html();
    console.log(rezString);
    rezString += $(this).html();
    $("#odgovor").html(rezString);
}

function napisiRacun(operacije, racunanjeDo) {
    racunanjeDo++;
    let rezultat = Math.floor(Math.random() * racunanjeDo);
    let stOperacij = operacije.length;
    let operacija = operacije[Math.floor(Math.random() * stOperacij)];
    let stevki = dobiStevki(operacija, rezultat, racunanjeDo);

    let racun = stevki[0] + " " + operacija + " " + stevki[1] + " = ";
    racun += rezultat;

    $("#enacba").html(racun);

    return rezultat;
}

function dobiStevki(operacija, rezultat, racunanjeDo) {
    let stevke;
    switch (operacija) {
        case "+":
            stevke = dobiStevkiZaPlus(rezultat);
            break;
        case "-":
            stevke = dobiStevkiZaMinus(rezultat, racunanjeDo);
            break;
        case "*":
            stevke = dobiStevkiZaKrat(rezultat, racunanjeDo);
            break;
        case "/":
            stevke = dobiStevkiZaDeljeno(rezultat, racunanjeDo);
            break;
    }
    return stevke;
}

function dobiStevkiZaPlus(rezultat) {
    let stevka1 = getRandomInt(0, rezultat);
    let stevka2 = rezultat - stevka1;
    return [stevka1, stevka2];
}
function dobiStevkiZaMinus(rezultat, racunanjeDo) {
    racunanjeDo--;
    let stevka1 = getRandomInt(rezultat, racunanjeDo);
    let stevka2 =  stevka1 - rezultat;
    console.log(rezultat, stevka1, stevka2);
    return [stevka1, stevka2];
}
function dobiStevkiZaKrat(rezultat, racunanjeDo) {
    if (rezultat == 0) {
        return [0, getRandomInt(0, racunanjeDo)];
    }
    let delitelji = dobiDelitelje(rezultat);
    let stDeliteljev = delitelji.length;
    let stevka1 = delitelji[Math.floor(Math.random() * stDeliteljev)];
    let stevka2 = rezultat / stevka1;
    return [stevka1, stevka2];
}
function dobiStevkiZaDeljeno(rezultat, racunanjeDo) {
    if (rezultat == 0) {
        return [0, getRandomInt(0, racunanjeDo)];
    }
    let veckratniki = dobiVeckratnike(rezultat, racunanjeDo);
    console.log(veckratniki);
    let stevka1 = veckratniki[getRandomInt(0, veckratniki.length - 1)];
    let stevka2 = stevka1 / rezultat;
    return [stevka1, stevka2];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dobiDelitelje(stevilo) {
    let delitelji = [];
    for (let i = 1; i <= stevilo; i++) {
        if (stevilo % i == 0) {
            delitelji.push(i);
        }
    }
    return delitelji;
}

function dobiVeckratnike(stevilo, meja) {
    let veckratniki = [];
    let i = 1;
    while (stevilo*i < meja) {
        veckratniki.push(stevilo * i);
        i++;
    }
    return veckratniki;
}