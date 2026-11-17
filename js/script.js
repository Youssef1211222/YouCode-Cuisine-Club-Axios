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