const api = axios.create({ baseURL: "https://dummyjson.com", timeout: 5000 })

function messageErreur(error) {
    if (error.response) {
        const status = error.response.status

        if (status === 404) {
            return "Recette introuvable (404)."
        }
        if (status >= 500) {
            return "Erreur du serveur (500). Veuillez réessayer plus tard."
        }
        return `Une erreur est survenue (${status}).`
    }

    return "Serveur injoignable. Vérifiez votre connexion internet."
}

async function getRecipes() {
    try {
        const response = await api.get("/recipes?limit=12")
        return response.data.recipes
    } catch (error) {
        throw new Error(messageErreur(error))
    }
}

async function searchRecipes(query) {
    try {
        const response = await api.get(`/recipes/search?q=${encodeURIComponent(query)}`)
        return response.data.recipes
    } catch (error) {
        throw new Error(messageErreur(error))
    }
}

async function ajouterRecette(recette) {
    try {
        const response = await api.post("/recipes/add", recette)
        return response.data
    } catch (error) {
        throw new Error(messageErreur(error))
    }
}

async function supprimerRecette(id) {
    try {
        const response = await api.delete(`/recipes/${id}`)
        return response.data
    } catch (error) {
        throw new Error(messageErreur(error))
    }
}