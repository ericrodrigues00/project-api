const sequelize = require("sequelize");
const Book = require("../models/bookModel");
const Op = sequelize.Op

module.exports = {
    async searchBook(title) {
        
        const titleSearch = await Book.findOne({where: {title: title}})

        return titleSearch
    },
    async searchLike(title) {
        const titleSearchLike = await Book.findAll({where: {
            title: {
                [Op.substring]: title}
            }})
        
        if (titleSearchLike == null) {
            throw new Error("Book not found")
        }
        
        return titleSearchLike

    },
    async searchById(id) {
        const searchBookById = await Book.findOne({where: {id: id}})

        return searchBookById
    }
}