async function init() {
    const recettes = await getRecipes()
    afficherRecettes(recettes)
}
init()

const form = document.getElementById("form-recherche")

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const recherche = document.getElementById("recherche")
    const Rrecettes = await searchRecipes(recherche.value)
    console.log(Rrecettes)
    afficherRecettes(Rrecettes)
    if (Rrecettes.length > 0) {
        const returne = document.createElement("button")
        returne.className = "col-span-full justify-self-center mt-6 text-[#315B45] underline cursor-pointer"
        returne.textContent  = "Voir toutes les recettes"
        document.getElementById("liste-recettes").appendChild(returne)
        returne.addEventListener("click" , async function() {
            recherche.value = ""
            const recettes = await getRecipes()
            afficherRecettes(recettes)
        })
    }
})

const buttonAjout = document.getElementById("ouvrir-modal")

const modalRecette = document.getElementById("modal-recette")



buttonAjout.addEventListener("click" , function() {
    modalRecette.showModal()
})

const fermerModal = document.getElementById("fermer-modal")

fermerModal.addEventListener("click" , function() {
    modalRecette.close()
})

const formAjout = document.getElementById("form-ajout")

formAjout.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nom = document.getElementById("nom-recette").value.trim();
    const cuisine = document.getElementById("cuisine-recette").value.trim()
    const difficulte = document.getElementById("difficulte-recette").value.trim()
    const temps = Number(document.getElementById("temps-recette").value)

    const nomError = document.getElementById("erreur-nom")
    const cuisineError = document.getElementById("erreur-cuisine")
    const difficulteError = document.getElementById("erreur-difficulte")
    const tempsError = document.getElementById("erreur-temps")
    
    if (validerNom(nom) === false) {
        nomError.textContent = "Le nom doit contenir entre 3 et 60 caractères"
    }else {
        nomError.textContent = ""
    }

    if (validerCuisine(cuisine) === false) {
        cuisineError.textContent = "Veuillez saisir une cuisine"
    }else {
        cuisineError.textContent = ""
    }

    if (validerDifficulte(difficulte) === false) {
        difficulteError.textContent = "Veuillez choisir une difficulté"
    }else {
        difficulteError.textContent = ""
    }

    if (validerTemps(temps) === false) {
        tempsError.textContent = "Le temps de préparation doit être compris entre 1 et 300 minutes"
    }else {
        tempsError.textContent = ""
    }

    if (!validerNom(nom) || !validerCuisine(cuisine) || !validerDifficulte(difficulte) || !validerTemps(temps)) {
        return;
    }

    const recette = {
        name : nom ,
        cuisine : cuisine ,
        difficulty : difficulte ,
        prepTimeMinutes : temps
    }

    modalRecette.close()

    const nouvelleRecette = await ajouterRecette(recette)

    if (nouvelleRecette) {
        modalRecette.close()
        const validationPop = document.getElementById("validation-pop")
        validationPop.showModal()
        const validationOk = document.getElementById("validation-ok")
        validationOk.addEventListener("click" , function() {
            validationPop.close()
        })

    }
    console.log(nouvelleRecette)
})

