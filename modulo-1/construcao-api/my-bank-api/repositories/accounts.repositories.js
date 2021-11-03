import { promises as fs } from "fs"


const { readFile, writeFile } = fs


async function insertAccountRepositories(account) {
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

    return account
}


async function getAccountRepositories() {
    // ler arquivo json
    const data = JSON.parse(await readFile(global.filename))
    return data.accounts
}


async function getIDAccountRepositories(id){

    const data = await getAccountRepositories()
    let filterId = data.find(ide => ide.id == id)
    return filterId
}

async function delAccountRepositories(id){
    const data = JSON.parse(await readFile(global.filename))
    data.accounts = data.accounts.filter(ide => ide.id !== parseInt(id))
    await writeFile(global.filename, JSON.stringify(data, null, 2))
}

async function updateAccountRepositories(account){
    const data = JSON.parse(await readFile(global.filename))
    let index = data.accounts.findIndex(idu => idu.id == account.id)

    if (index === -1){
        throw new Error("Registro inválido")
    }

    data.accounts[index].name = account.name
    data.accounts[index].balance = account.balance
    await writeFile(global.filename, JSON.stringify(data, null, 2))

    return data.accounts[index]
}

async function updatePatchAccountRepositories(account){
    const data = JSON.parse(await readFile(global.filename))
        let index = data.accounts.findIndex(idu => idu.id == account.id)

        if (index === -1){
            throw new Error("Registro inválido")
        }

        data.accounts[index].balance = account.balance
        await writeFile(global.filename, JSON.stringify(data, null, 2))

        return data.accounts[index]
}

export default {
    insertAccountRepositories,
    getAccountRepositories,
    getIDAccountRepositories,
    delAccountRepositories,
    updateAccountRepositories,
    updatePatchAccountRepositories
}