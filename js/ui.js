const container = document.getElementById("liste-recettes")
const compteur = document.getElementById("compteur-recettes")
const chargement = document.getElementById("chargement")
const zoneMessage = document.getElementById("message")

const deleteDialog = document.getElementById("delete-dialog")
const cancelDelete = document.getElementById("cancel-delete")
const confirmDelete = document.getElementById("confirm-delete")

let cardASupprimer = null
let recetteIdASupprimer = null

function afficherChargement() {
    chargement.classList.remove("hidden")
}

function masquerChargement() {
    chargement.classList.add("hidden")
}

function masquerMessage() {
    zoneMessage.classList.add("hidden")
    zoneMessage.replaceChildren()
}

function afficherErreur(texte, onRetry) {
    zoneMessage.replaceChildren()
    zoneMessage.classList.remove("hidden")

    const paragraphe = document.createElement("p")
    paragraphe.textContent = texte
    paragraphe.className = "text-red-600 font-medium mb-3"

    const boutonRetry = document.createElement("button")
    boutonRetry.textContent = "Réessayer"
    boutonRetry.className = "bg-[#315B45] hover:bg-[#244735] text-white rounded-xl px-5 py-2 font-semibold transition cursor-pointer"
    boutonRetry.addEventListener("click", onRetry)

    zoneMessage.append(paragraphe, boutonRetry)
}

function afficherRecettes(recettes) {
    compteur.textContent = `${recettes.length} recettes disponibles`

    container.replaceChildren()

    if (recettes.length === 0) {
        const message = document.createElement("p")
        message.textContent = "Aucune recette trouvée"
        message.className = "col-span-full text-center bg-white rounded-2xl shadow-sm border border-gray-200 py-12 px-6 text-lg font-medium text-[#315B45]"
        container.appendChild(message)

        const returne = document.createElement("button")
        returne.textContent = "Voir toutes les recettes"
        container.appendChild(returne)
        returne.addEventListener("click", function () {
            executerRequete(async function () {
                const recettesOriginales = await getRecipes()
                afficherRecettes(recettesOriginales)
            })
        })
        return
    }

    recettes.forEach(function (recette) {
        const card = document.createElement("div")
        card.className = "bg-white rounded-2xl shadow-md overflow-hidden"

        const div = document.createElement("div")
        div.className = "flex justify-between items-center px-4 py-4"

        const titre = document.createElement("h3")
        titre.className = "text-lg font-bold text-[#342C26] px-4 pt-4"

        const image = document.createElement("img")
        image.className = "w-full h-48 object-cover"

        const cuisine = document.createElement("p")
        cuisine.className = "text-sm text-gray-500 px-4 mt-1"

        const difficulty = document.createElement("p")
        difficulty.className = "text-sm font-medium text-[#315B45]"

        const temps = document.createElement("span")
        temps.className = "text-sm text-gray-500"

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.className = "m-[15px] bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-medium transition"

        deleteButton.addEventListener("click", function () {
            recetteIdASupprimer = recette.id
            cardASupprimer = card
            deleteDialog.showModal()
        })

        titre.textContent = recette.name
        image.src = recette.image
        cuisine.textContent = recette.cuisine
        difficulty.textContent = recette.difficulty
        temps.textContent = `${recette.prepTimeMinutes} Min`

        div.append(difficulty, temps)
        card.append(image, titre, cuisine, div, deleteButton)
        container.appendChild(card)
    })
}

cancelDelete.addEventListener("click", function () {
    deleteDialog.close()
})

confirmDelete.addEventListener("click", function () {
    deleteDialog.close()

    executerRequete(async function () {
        await supprimerRecette(recetteIdASupprimer)
        cardASupprimer.remove()

        const validationPop = document.getElementById("validation-pop")
        validationPop.showModal()

        const validationOk = document.getElementById("validation-ok")
        validationOk.addEventListener("click", function () {
            validationPop.close()
        })
    })
})