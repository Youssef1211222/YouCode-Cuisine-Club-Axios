const form = document.getElementById("form-recherche")
const buttonAjout = document.getElementById("ouvrir-modal")
const modalRecette = document.getElementById("modal-recette")
const fermerModal = document.getElementById("fermer-modal")
const formAjout = document.getElementById("form-ajout")

async function executerRequete(requete) {
    masquerMessage()
    afficherChargement()

    try {
        await requete()
    } catch (error) {
        afficherErreur(error.message, function () {
            executerRequete(requete)
        })
    } finally {
        masquerChargement()
    }
}

function init() {
    executerRequete(async function () {
        const recettes = await getRecipes()
        afficherRecettes(recettes)
    })
}

function gererRecherche(event) {
    event.preventDefault()

    const recherche = document.getElementById("recherche")
    const terme = recherche.value

    executerRequete(async function () {
        const Rrecettes = await searchRecipes(terme)
        console.log(Rrecettes)
        afficherRecettes(Rrecettes)

        if (Rrecettes.length > 0) {
            const returne = document.createElement("button")
            returne.className = "col-span-full justify-self-center mt-6 text-[#315B45] underline cursor-pointer"
            returne.textContent = "Voir toutes les recettes"
            document.getElementById("liste-recettes").appendChild(returne)

            returne.addEventListener("click", function () {
                recherche.value = ""
                executerRequete(async function () {
                    const recettes = await getRecipes()
                    afficherRecettes(recettes)
                })
            })
        }
    })
}

function afficherErreurs(nom, cuisine, difficulte, temps) {
    const nomError = document.getElementById("erreur-nom")
    const cuisineError = document.getElementById("erreur-cuisine")
    const difficulteError = document.getElementById("erreur-difficulte")
    const tempsError = document.getElementById("erreur-temps")

    if (validerNom(nom) === false) {
        nomError.textContent = "Le nom doit contenir entre 3 et 60 caractères"
    } else {
        nomError.textContent = ""
    }

    if (validerCuisine(cuisine) === false) {
        cuisineError.textContent = "Veuillez saisir une cuisine"
    } else {
        cuisineError.textContent = ""
    }

    if (validerDifficulte(difficulte) === false) {
        difficulteError.textContent = "Veuillez choisir une difficulté"
    } else {
        difficulteError.textContent = ""
    }

    if (validerTemps(temps) === false) {
        tempsError.textContent = "Le temps de préparation doit être compris entre 1 et 300 minutes"
    } else {
        tempsError.textContent = ""
    }
}

function creerNouvelleCarte(nouvelleRecette) {
    const Ncard = document.createElement("div")
    Ncard.className = "bg-white rounded-2xl shadow-md overflow-hidden"

    const Ndiv = document.createElement("div")
    Ndiv.className = "flex justify-between items-center px-4 py-4"

    const Ntitre = document.createElement("h3")
    Ntitre.className = "text-lg font-bold text-[#342C26] px-4 pt-4"

    const Nimage = document.createElement("img")
    Nimage.className = "w-full h-48 object-cover"

    const Ncuisine = document.createElement("p")
    Ncuisine.className = "text-sm text-gray-500 px-4 mt-1"

    const Ndifficulty = document.createElement("p")
    Ndifficulty.className = "text-sm font-medium text-[#315B45]"

    const Ntemps = document.createElement("span")
    Ntemps.className = "text-sm text-gray-500"

    Ntitre.textContent = nouvelleRecette.name
    Ncuisine.textContent = nouvelleRecette.cuisine
    Ndifficulty.textContent = nouvelleRecette.difficulty
    Ntemps.textContent = `${nouvelleRecette.prepTimeMinutes} Min`

    Ndiv.append(Ndifficulty, Ntemps)
    Ncard.append(Nimage, Ntitre, Ncuisine, Ndiv)

    return Ncard
}

async function gererAjout(event) {
    event.preventDefault()

    const nom = document.getElementById("nom-recette").value.trim()
    const cuisine = document.getElementById("cuisine-recette").value.trim()
    const difficulte = document.getElementById("difficulte-recette").value.trim()
    const temps = Number(document.getElementById("temps-recette").value)

    const submitRecette = document.getElementById("submit-recette")

    afficherErreurs(nom, cuisine, difficulte, temps)

    if (!validerNom(nom) || !validerCuisine(cuisine) || !validerDifficulte(difficulte) || !validerTemps(temps)) {
        return
    }

    const recette = {
        name: nom,
        cuisine: cuisine,
        difficulty: difficulte,
        prepTimeMinutes: temps
    }

    modalRecette.close()

    executerRequete(async function () {
        submitRecette.disabled = true

        try {
            const nouvelleRecette = await ajouterRecette(recette)

            if (nouvelleRecette) {
                modalRecette.close()

                const validationPop = document.getElementById("validation-pop")
                validationPop.showModal()

                const validationOk = document.getElementById("validation-ok")
                validationOk.addEventListener("click", function () {
                    validationPop.close()
                })
            }
            console.log(nouvelleRecette)

            const Ncard = creerNouvelleCarte(nouvelleRecette)
            container.prepend(Ncard)
        } finally {
            submitRecette.disabled = false
        }
    })
}

form.addEventListener("submit", gererRecherche)

buttonAjout.addEventListener("click", function () {
    modalRecette.showModal()
})

fermerModal.addEventListener("click", function () {
    modalRecette.close()
})

formAjout.addEventListener("submit", gererAjout)

init()