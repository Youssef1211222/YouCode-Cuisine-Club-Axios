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
})