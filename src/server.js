require('dotenv').config({path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"})
const express = require("express");
const bookRoute = require("./routes");
const databaseSync = require(process.env.SYNC)
import cors from 'cors'

const corsOptions = {
    origin: '*',
    credentials: true,
}

app.use(cors(corsOptions))

const port = process.env.PORT;
const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "test") {
    databaseSync()
}

app.use(bookRoute);

app.get("/", (req,res) => {
    res.status(200).json({message: "API de Livraria - Resilia - Módulo 4"})
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})

module.exports = app