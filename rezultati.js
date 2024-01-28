$(document).ready(function () {
    let stPravilnih = parseInt(getCookie("stPravilnih"));
    let stNapacnih = parseInt(getCookie("stNarobnih"));
    let stVseh = stNapacnih + stPravilnih;
    console.log(stPravilnih, stNapacnih, stVseh);

    $("#pravilni").html("Število pravilnih odgovorov: " + stPravilnih);
    $("#napacni").html("Število napačnih odgovorov: " + stNapacnih);
});

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