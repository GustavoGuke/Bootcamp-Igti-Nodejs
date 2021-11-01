import express from "express"
import { promises as fs } from "fs"



const { readFile, writeFile} = fs
const router = express.Router()



router.post("/", async (req, res, next) => {

    try {
        // pegar dados do usuario
        let account = req.body

        // tratando erros
        if (!account.name || account.balance == null) {
            throw new Error("Name e balance são obrigatório")
        }

        // ler arquivo json
        const data = JSON.parse(await readFile(global.filename))

        // acrescentar meu id a cada dado colocado pelo usuario
        account = { 
            id: data.nextId++, 
            name: account.name,
            balance: account.balance
         }

        // colocar os dados no array
        data.accounts.push(account)

        // sobreescrever os dados no json
        await writeFile(global.filename, JSON.stringify(data, null, 2))

        // devolver os dados na tela 
        res.send(account)

    } catch (error) {
        next(err)
    }
})


router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.filename))
        delete data.nextId
        res.send(data)
    } catch (error) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.filename))
        let filterId = data.accounts.find(ide => ide.id == req.params.id)
        res.send(filterId)
    } catch (error) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.filename))
        data.accounts = data.accounts.filter(ide => ide.id !== parseInt(req.params.id))
        data.nextId--
        await writeFile(global.filename, JSON.stringify(data, null, 2))

        res.send()
    } catch (error) {
        next(err)
    }
})

router.put("/", async (req, res, next) => {
    try {


        let update = req.body

        // tratando erros
        if (!update.name || update.balance == null) {
            throw new Error("Name e balance são obrigatório")
        }
        const data = JSON.parse(await readFile(global.filename))
        let index = data.accounts.findIndex(idu => idu.id == update.id)

        if (index === -1){
            throw new Error("Registro inválido")
        }

        data.accounts[index].name = update.name
        data.accounts[index].balance = update.balance
        await writeFile(global.filename, JSON.stringify(data, null, 2))
        console.log(index)

        res.send(update)
    } catch (err) {
        next(err)
    }
})


router.patch("/updateBalance", async (req, res, next) => {
    try {

        let update = req.body
          // tratando erros
          if (!update.id || update.balance == null) {
            throw new Error("Id e Balance são obrigatórios")
        }
        const data = JSON.parse(await readFile(global.filename))
        let index = data.accounts.findIndex(idu => idu.id == update.id)

        if (index === -1){
            throw new Error("Registro inválido")
        }

        data.accounts[index].balance = update.balance
        await writeFile(global.filename, JSON.stringify(data, null, 2))
        console.log(index)

        res.send(data.accounts[index])
    } catch (err) {
        next(err)
    }
})


router.use((err, req, res, next) => {
    console.log(err)
    res.status(400).send({ error: err.message })
})



export default router