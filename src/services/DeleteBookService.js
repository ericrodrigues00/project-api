const Book = require("../models/bookModel")

module.exports = {
    async execute(id) {
        const deleteBookById = await Book.destroy({where: {id: id}})

        if(!deleteBookById) {
            throw new Error("This book was not found on our database and could not be deleted")
        }
        
        return deleteBookById
    }
}