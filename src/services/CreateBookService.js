const Book = require("../models/bookModel");
const { v4: uuid } = require('uuid');

module.exports = {
    /**
     * Cria uma instância do modelo e retorna um objeto com os atributos passados.
     * @param {string} title 
     * @param {string} author_id 
     * @param {string} language 
     * @param {integer} num_pages 
     * @param {date} publication_date 
     * @param {string} publisher 
     * @returns Promise
     */
    async execute(title, author_id, language, num_pages, publication_date, publisher) {
                
        const idHash = uuid();

        const book = await Book.create({
            id: idHash,
            title: title,
            author_id: author_id,
            language: language,
            num_pages: num_pages,
            publication_date: publication_date,
            publisher: publisher
        })

        return book
        
    }
}