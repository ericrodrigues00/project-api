const Book = require("../models/bookModel");
const {request, response} = require("express")

module.exports = {
    async all(request, response) {
        try {
            const books = await Book.findAll();
            response.status(200).json({
                message: "All books listed below",
                books: books
            })
        } catch (err) {
            response.status(400).json({error: err.message})
        }
    }
}