const Book = require("../models/bookModel")

module.exports = {
    async execute(id, 
        newTitle, 
        newAuthor_id,
        newLanguage,
        newNum_pages,
        newPublication_date,
        newPublisher) {
        
        let book = await Book.findByPk(id);

        if (book == null) {
            throw new Error("Could not update book")
        }

        const newBook = await Book.update({
            title: newTitle,
            author_id: newAuthor_id,
            language: newLanguage,
            num_pages: newNum_pages,
            publication_date: newPublication_date,
            publisher: newPublisher
        }, {where: {id: id}});

        if (newBook) {
            book = await Book.findByPk(id);
            return book
        }
    }
}