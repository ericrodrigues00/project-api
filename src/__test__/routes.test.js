const request = require("supertest");

const app = require("../server");

const databaseSync = require("../database/testDatabaseConnection")

describe("POST /books", () => {
    beforeAll(async () => {
        await databaseSync()
    })

    describe("Given a title, author_id, language, num_pages, publication_date and publisher", () => {

        test("Should generate a book id", async () => {
            const response = await request(app).post("/books").send({
                title: "Book Sample 1",
                author_id: "54mpl310",
                language: "Sample Language",
                num_pages: 201,
                publication_date: "2022-12-12T00:00:00.000Z",
                publisher: "Sample Publisher"
            })
            expect(response.body).toHaveProperty("id")
        })
        
        test("Should respond with a 201 status code", async () => {
            const response = await request(app).post("/books").send({
                title: "Book Sample 2",
                author_id: "54mpl310",
                language: "Sample Language",
                num_pages: 201,
                publication_date: "2022-12-12T00:00:00.000Z",
                publisher: "Sample Publisher"
            })
            expect(response.statusCode).toBe(201)
        });

        test("Should specify JSON in the content type header", async () => {
            const response = await request(app).post("/books").send({
                title: "Book Sample 3",
                author_id: "54mpl310",
                language: "Sample Language",
                num_pages: 201,
                publication_date: "2022-12-12T00:00:00.000Z",
                publisher: "Sample Publisher"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        });

    })

    describe("When entry is flawed", () => {
        
        test("Should not allow to create an entry with a duplicate title", async () => {
            const response = await request(app).post("/books").send({
                title: "Book Sample 2",
                author_id: "54mpl310",
                language: "Sample Language",
                num_pages: 201,
                publication_date: "2022-12-12T00:00:00.000Z",
                publisher: "Sample Publisher"
            })
            expect(response.statusCode).toBe(400)
        });

        test("Should not allow to create a book entry without a title", async () => {
            const response = await request(app).post("/books").send({
                author_id: "54mpl310",
                language: "Sample Language",
                num_pages: 201,
                publication_date: "2022-12-12T00:00:00.000Z",
                publisher: "Sample Publisher"
            })
            expect(response.statusCode).toBe(400)
        });
    })
})

describe("DELETE /books", () => {
    describe("Given a book id", () => {
        test("Should return a 202 status code", async () => {
            const response = await request(app).post("/books").send({
                title: "Delete Test",
                author_id: "54mpl310",
                language: "Sample Language",
                num_pages: 201,
                publication_date: "2022-12-12T00:00:00.000Z",
                publisher: "Sample Publisher"
            })
            const id = response.body.id;

            const erase = await request(app).delete(`/books/${id}`)

            expect(erase.statusCode).toBe(202)
            
        })

        test("Should delete a book", async () => {
            const response = await request(app).post("/books").send({
                title: "Delete Test",
                author_id: "54mpl310",
                language: "Sample Language",
                num_pages: 201,
                publication_date: "2022-12-12T00:00:00.000Z",
                publisher: "Sample Publisher"
            })
            const id = response.body.id;

            const erase = await request(app).delete(`/books/${id}`)

            expect(erase.body).toHaveProperty("message")
            
        })
    })
})

describe("GET /books", () => {
    describe("Given no parameters", () => {
        test("Should return all books", async () => {
            const response = await request(app).get("/books")

            expect(response.body.message).toBe("All books listed below")
        })

        test("Should return a 200 status code", async () => {
            const response = await request(app).get("/books")

            expect(response.statusCode).toBe(200)
        })
    })

    describe("Given a title", () => {
        test("Should return all titles that are similar to query", async () => {
            const response = await request(app).get("/books/Sample")

            expect(response.body).toHaveProperty("results")
        })
    })
})

describe("PUT /books", () => {
    test("Should update a book entry and return a 202 status code", async () => {
        const temporary = await request(app).post("/books").send({
            title: "Book Sample 6",
            author_id: "54mpl310",
            language: "Sample Language",
            num_pages: 201,
            publication_date: "2022-12-12T00:00:00.000Z",
            publisher: "Sample Publisher"
        })

        const id = temporary.body.id

        const response = await request(app).put(`/books/${id}`).send({
            title: "Sample Book Updated",
            author_id: "54mpl310",
            language: "Sample Language",
            num_pages: 201,
            publication_date: "2022-12-12T00:00:00.000Z",
            publisher: "Sample Publisher"
        })
        expect(response.body).toHaveProperty("message")
        expect(response.statusCode).toBe(202)
    })

    test("Should not update a book entry if a field is mising", async () => {
        const temporary = await request(app).post("/books").send({
            title: "Book Sample 7",
            author_id: "54mpl310",
            language: "Sample Language",
            num_pages: 201,
            publication_date: "2022-12-12T00:00:00.000Z",
            publisher: "Sample Publisher"
        })

        const id = temporary.body.id

        const response = await request(app).put(`/books/${id}`).send({
            author_id: "54mpl310",
            language: "Sample Language",
            num_pages: 201,
            publication_date: "2022-12-12T00:00:00.000Z",
            publisher: "Sample Publisher"
        })
        expect(response.body).toHaveProperty("error")
    })

    test("Should not try to update id", async () => {
        const temporary = await request(app).post("/books").send({
            title: "Book Sample 8",
            author_id: "54mpl310",
            language: "Sample Language",
            num_pages: 201,
            publication_date: "2022-12-12T00:00:00.000Z",
            publisher: "Sample Publisher"
        })

        const id = temporary.body.id

        const response = await request(app).put(`/books/${id}`).send({
            id: "1",
            title: "Sample Book Updated Put",
            author_id: "54mpl3 Updated Put",
            language: "Sample Language",
            num_pages: 201,
            publication_date: "2022-12-12T00:00:00.000Z",
            publisher: "Sample Publisher"
        })
        expect(response.body).toHaveProperty("error")
    })

})

describe("PATCH /books", () => {
    test("Should update title", async () => {
        const temporary = await request(app).post("/books").send({
            title: "Book Sample 9",
            author_id: "54mpl310",
            language: "Sample Language",
            num_pages: 201,
            publication_date: "2022-12-12T00:00:00.000Z",
            publisher: "Sample Publisher"
        })

        const id = temporary.body.id

        const response = await request(app).patch(`/books/${id}`).send({
            title: "Sample Book Updated Patch"
        })

        expect(response.body).toHaveProperty("message")

    })

    test("Should return a 202 status code", async () => {
        const temporary = await request(app).post("/books").send({
            title: "Sample Book 9000",
            author_id: "54mpl310",
            language: "Sample Language",
            num_pages: 201,
            publication_date: "2022-12-12T00:00:00.000Z",
            publisher: "Sample Publisher"
        })

        const id = temporary.body.id

        const response = await request(app).patch(`/books/${id}`).send({
            title: "Sample Book Updated Patch 2"
        })

        expect(response.statusCode).toBe(202)
    })
})