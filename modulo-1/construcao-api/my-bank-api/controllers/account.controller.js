import service from "../service/account.service.js"
import { promises as fs } from "fs"


const  { readFile, writeFile} = fs

async function createAccount(req, res, next){

    try {
        // pegar dados do usuario
        let account = req.body

        // tratando erros
        if (!account.name || account.balance == null) {
            throw new Error("Name e balance são obrigatório")
        }

        // função com a lógica
        account = await service.postService(account)

        // devolver os dados na tela 
        res.send(account)

    } catch (error) {
        next(err)
    }
}


async function getAccount(req, res, next) {
    try {
        // função com a lógica
        res.send(await service.getService())
    } catch (error) {
        next(error)
    }
}

async function getIdAccount(req, res, next)  {
    try {
        res.send(await service.getIdAccount(req.params.id))
    } catch (error) {
        next(error)
    }
}

async function deleteAccount(req, res, next)  {
    try {
        const resp = await service.deleteService(req.params.id)
        res.send(`Deletado`)
    } catch (error) {
        next(error)
    }
}

async function  putAccount(req, res, next) {
    try {
        let update = req.body
        // tratando erros
        if (!update.name || update.balance == null) {
            throw new Error("Name e balance são obrigatório")
        }
        res.send(await service.updateService(update))
    } catch (err) {
        next(err)
    }
}

async function patchAccount(req, res, next) {
    try {

        let update = req.body
          // tratando erros
          if (!update.id || update.balance == null) {
            throw new Error("Id e Balance são obrigatórios")
        }
        res.send(await service.updatePatchService(update))
    } catch (err) {
        next(err)
    }
}

export default {
    createAccount,
    getAccount,
    getIdAccount,
    deleteAccount,
    putAccount,
    patchAccount

}