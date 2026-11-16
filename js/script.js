async function init() {
    const recettes = await getRecipes()
    afficherRecettes(recettes)
}
init()