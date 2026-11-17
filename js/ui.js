function afficherRecettes(recettes) {
    const container = document.getElementById("liste-recettes")

    const compteur = document.getElementById("compteur-recettes")
    compteur.textContent = `${recettes.length} recettes disponibles`

    const returne = document.createElement("button")

    container.replaceChildren()

    if (recettes.length === 0) {
        const message = document.createElement("p")
        message.textContent = "Aucune recette trouvée"
        message.className = "col-span-full text-center bg-white rounded-2xl shadow-sm border border-gray-200 py-12 px-6 text-lg font-medium text-[#315B45]"
        container.appendChild(message)
        
        returne.textContent = "Voir toutes les recettes"
        container.appendChild(returne)
        returne.addEventListener("click" ,async function() {
        const recettesOriginales = await getRecipes()
        afficherRecettes(recettesOriginales)
        })
        return
    }

    recettes.forEach(function(recette) {
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

        titre.textContent =  recette.name
        image.src = recette.image
        cuisine.textContent = recette.cuisine
        difficulty.textContent = recette.difficulty
        temps.textContent = `${recette.prepTimeMinutes} Min`


        div.append(difficulty,temps)
        card.append(image,titre,cuisine,div)
        container.appendChild(card)
    })
}
