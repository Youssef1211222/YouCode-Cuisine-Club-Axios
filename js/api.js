const api = axios.create({baseURL:"https://dummyjson.com" ,timeout:5000})

async function getRecipes() {
    const response = await api.get("/recipes?limit=12")
    return response.data.recipes
}

async function searchRecipes(query) {
    const response = await api.get(`/recipes/search?q=${encodeURIComponent(query)}`)
    return response.data.recipes
}

async function ajouterRecette(recette) {
    const response = await api.post("/recipes/add", recette)
    return response.data
}


async function supprimerRecette(id) {
    const response = await api.delete(`/recipes/${id}`)
    return response.data
}

