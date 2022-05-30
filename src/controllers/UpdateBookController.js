const { request, response } = require("express")
const updateBookService = require("../services/UpdateBookService")

module.exports = {
    async handle(request, response) {
        try {
            const id = request.params.id;
            const {
                title,
                author_id,
                language,
                num_pages,
                publication_date,
                publisher
            } = request.body
    
            const updatedBook = await updateBookService.execute(
                id, 
                title,
                author_id,
                language,
                num_pages,
                publication_date,
                publisher)
                
            response.status(202).json({message: "Successfully updated",
            "book updated": updatedBook})
        } catch(err) {
            response.status(400).json({error: err.message})
        }
    }
}