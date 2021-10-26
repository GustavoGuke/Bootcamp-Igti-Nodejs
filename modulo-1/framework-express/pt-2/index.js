import express, { application } from "express";
import carros from "./carros.js"; 

// associar rotas a nivel de aplicação
const app = express()
app.use(express.json())

app.use("/carros",carros )

app.get("/", (req, res) => {
    res.send("GET NORMAL")
})

app.listen(8080, () => {
    console.log("api started")
})