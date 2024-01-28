let countdown;
let stPravilnih = 0;
let stNarobnih = 0;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let racunanjeDo = urlParams.get("racunanjeDo");
let operacije = urlParams.getAll("operacije");
let tipIgre = urlParams.get("tipIgre");
let cas = urlParams.get("cas");
let rezultat;

$(document).ready(function () {
    startNew();
    startcountdown();
    $(".num").click(beriRezultat);
    $("#oddaj").click(function () {
        oddajRezultat(rezultat);
        startNew();
        $("#odgovor").html("");
    });
});

function startNew() {
    if(stPravilnih + stNarobnih == 10){
        setCookie("stPravilnih", stPravilnih, 1);
        setCookie("stNarobnih", stNarobnih, 1);
        console.log(getCookie("stPravilnih"));
        window.open("rezultati.html", "_self");
    }
    rezultat = napisiRacun(operacije, racunanjeDo);

}

function startcountdown() {
    let seconds = cas;
    clearInterval(countdown);
    countdown = setInterval(function () {
        seconds--;
        $("#timer").html(seconds + "s");
        if (seconds == 0) {
            clearInterval(countdown);
            oddajRezultat(null);
            startNew();
        }
    }, 1000);
}

function oddajRezultat(rezultat) {
    let napisanRezultat = $("#odgovor").html();
    if (rezultat == napisanRezultat) {
        stPravilnih++;
    } else {
        stNarobnih++;
    }
    startcountdown(countdown);
    console.log(stPravilnih, stNarobnih);
}

function beriRezultat() {
    if($(this).html() == "C"){
        $("#odgovor").html("");
        return;
    }
    let rezString = $("#odgovor").html();
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
    let stevka2 = stevka1 - rezultat;
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
    while (stevilo * i < meja) {
        veckratniki.push(stevilo * i);
        i++;
    }
    return veckratniki;
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    value = value.toString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}