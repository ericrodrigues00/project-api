const deleteBookService = require("../services/DeleteBookService");
const searchBookService = require("../services/SearchBookService");

module.exports = {
    async handle(request, response) {
        
        try {
            const id = request.params.id;
            const book = await searchBookService.searchById(id)
            
            const bookDeleted = await deleteBookService.execute(id)
            response.status(202).json({
                "message": !!bookDeleted,
                "book deleted": book})
        } catch(err) {
            response.status(404).json({error: err.message})
        }

    }
}
