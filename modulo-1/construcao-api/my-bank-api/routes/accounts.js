import express from "express"
import { promises as fs } from "fs"


const { readFile, writeFile, appendFile } = fs
const router = express.Router()



router.post("/", async (req, res) => {

    try {
        // pegar dados do usuario
        let account = req.body

        // ler arquivo json
        const data = JSON.parse(await readFile("account.json"))

        // acrescentar meu id a cada dado colocado pelo usuario
        account = { id: data.nextId++, ...account }

        // colocar os dados no array
        data.accounts.push(account)

        // sobreescrever os dados no json
        await writeFile("account.json", JSON.stringify(data, null, 2))

        // devolver os dados na tela 
        res.send(account)

    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})



export default router