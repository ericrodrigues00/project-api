const { request, response } = require("express")
const SearchBookService = require("../services/SearchBookService")

module.exports = {
    /**
     * Faz uma requisição à API, procurando por um título específico na base de dados
     * @param {request} request 
     * @param {response} response 
     */
    async handle(request, response) {
        try {
            const title = request.params.title;
            const book = await SearchBookService.searchLike(title)
            response.status(200).json({results: book})
        } catch(err) {
            response.status(400).json({error: err.message})
        }
        
    }
}