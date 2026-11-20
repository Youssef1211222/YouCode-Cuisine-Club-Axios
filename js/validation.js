function validerNom(nom) {
    if (nom.length < 3 || nom.length > 60) {
        return false
    } else {
        return true
    }
}

function validerCuisine(cuisine) {
    if (cuisine.trim() === "") {
        return false
    } else {
        return true
    }
}

function validerDifficulte(difficulte) {
    if (difficulte === "") {
        return false
    } else {
        return true
    }
}

function validerTemps(temps) {
    if (temps === "" || temps < 1 || temps > 300) {
        return false
    } else {
        return true
    }
}