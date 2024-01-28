function validateRacunanjeDo() {
    var racunanjeDo = document.getElementsByName("racunanjeDo");
    console.log(racunanjeDo[0].checked);
    if (racunanjeDo[0].checked || racunanjeDo[1].checked || racunanjeDo[2].checked || racunanjeDo[3].checked) {
        console.log("true");
        return true;
    } else {
        console.log("false");
        return false;
    }
}

function validateOperacije() {
    var operacije = document.getElementsByName("operacije");
    console.log(operacije[0]);
    if (operacije[0].checked || operacije[1].checked || operacije[2].checked || operacije[3].checked) {
        return true;
    } else {
        return false;
    }
}

function validateForm() {
    if (validateRacunanjeDo() && validateOperacije()) {
        return true;
    } else {
        alert("Prosin izpolnite vsa polja!");
        return false;
    }
}