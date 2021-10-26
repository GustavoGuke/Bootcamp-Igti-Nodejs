import Express from "express";


// associar rotas a nivel de roteador
const router = Express.Router()

router.get("/", (req, res) => {
    console.log("GET Router")
    res.send("GET /Carros")
})

router.get("/precos", (req, res) => {
    res.send("GET /Preços")
})


export default router