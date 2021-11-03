import { promises as fs } from "fs"
import repositories from "../repositories/accounts.repositories.js"


const { readFile, writeFile } = fs

async function postService(account) {
    return await repositories.insertAccountRepositories(account)
}

async function getService() {
    return await repositories.getAccountRepositories()
}

async function getIdAccount(id) {
    return await repositories.getIDAccountRepositories(id)
}

async function deleteService(id) {
    await repositories.delAccountRepositories(id)
}

async function updateService(account) {
    return await repositories.updateAccountRepositories(account)
}

async function updatePatchService(account) {

    return await repositories.updatePatchAccountRepositories(account)
}

export default {
    postService,
    getService,
    getIdAccount,
    deleteService,
    updateService,
    updatePatchService
}