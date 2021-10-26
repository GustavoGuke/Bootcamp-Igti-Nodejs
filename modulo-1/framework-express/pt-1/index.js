import express  from "express";

const app = express()
app.use(express.json())

// recebe qualquer requisição
app.all("/testAll", (req, res) => {
    res.send(req.method)
})

// Caracteres especiais **************************

// ultima letra é opcional
app.get("/teste?", (req, res) => {
    res.send("teste ok ")
})

// a ultima letra pode ser passada varias vezes
app.get("/buzz+", (req, res) => {
    res.send("buzz + ")
})

// aceita qualquer caracter passado depois do * e antes da ultima palavra
app.get("/one*Tudo", (req, res) => {
    res.send("Aceito todos endpoints depois do * ")
})

// aceita dois tipos de endpoints passado o tes ou tesste
app.get("/tes(ste)?", (req, res) => {
    res.send("Entre parentes se torna opcional ")
})


// pegar parametro na rota
app.get("/tesParam/:id", (req, res) => {
    res.send(req.params.id)
})

// parametros via query
app.get("/testQuery", (req, res) => {
    res.send(req.query)
})

// get padrao
app.get("/", (req, res) => {
    res.send("Express ok ")
})

app.listen(8080, () => {
    console.log("api started")
})