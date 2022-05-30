const { request, response, next } = require("express")
const Book = require("../models/bookModel")
const SearchBookService = require("../services/SearchBookService")

module.exports = {
    async checkDuplicates(request, response, next) {

        const title = request.body.title

        if(!title) {
            return response.status(400).json({
                error: "The field 'title' is required."
            })
        }

        const bookAlreadyExists = await SearchBookService.searchBook(title)

        if (!bookAlreadyExists) {
            next()
        } else {
            return response.status(400).json({
                error: "This book already exists on our database"
            })
        }

    }
}