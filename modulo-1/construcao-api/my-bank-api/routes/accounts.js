import express, { json } from "express"
import { promises as fs } from "fs"
import { parse } from "path"
import { stringify } from "querystring"


const { readFile, writeFile, appendFile } = fs
const router = express.Router()



router.post("/", async (req, res) => {

    try {
        // pegar dados do usuario
        let account = req.body

        // ler arquivo json
        const data = JSON.parse(await readFile(global.filename))

        // acrescentar meu id a cada dado colocado pelo usuario
        account = { id: data.nextId++, ...account }

        // colocar os dados no array
        data.accounts.push(account)

        // sobreescrever os dados no json
        await writeFile(global.filename, JSON.stringify(data, null, 2))

        // devolver os dados na tela 
        res.send(account)

    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})


router.get("/", async (req, res) => {
    try {
        const data = JSON.parse(await readFile(global.filename))
        delete data.nextId
        res.send(data)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const data = JSON.parse(await readFile(global.filename))
        let filterId = data.accounts.find(ide => ide.id == req.params.id)
        res.send(filterId)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const data = JSON.parse(await readFile(global.filename))
        data.accounts = data.accounts.filter(ide => ide.id !== parseInt(req.params.id))
        data.nextId--
        await writeFile(global.filename, JSON.stringify(data, null, 2))

        res.send()
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})




export default router