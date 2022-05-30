const CreateBookService = require("../services/CreateBookService");
const { request, response } = require("express")

module.exports = {
    /**
     * Faz uma requisição à API, preenchendo o corpo da requisição com a instância do modelo e devolvendo a resposta em JSON.
     * @param {request} request 
     * @param {response} response 
     * @returns Promise
     */
    async handle(request, response) {
        
        try {
            const {title, author_id, language, num_pages, publication_date, publisher} = request.body;
            const book = await CreateBookService.execute( 
                title, 
                author_id,
                language,
                num_pages,
                publication_date,
                publisher)

            response.status(201).json(book)
        } catch(err) {
            response.status(400).json({error: err.message})
        }
    }
}
