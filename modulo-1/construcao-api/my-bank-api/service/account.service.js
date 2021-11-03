import { promises as fs } from "fs"


const { readFile, writeFile } = fs

async function postService(account) {
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

async function getService() {
    const data = JSON.parse(await readFile(global.filename))
    delete data.nextId
    return data

}

async function getIdAccount(id){
    const data = JSON.parse(await readFile(global.filename))
    let filterId = data.accounts.find(ide => ide.id == id)
    return filterId
}

async function deleteService(id){
    const data = JSON.parse(await readFile(global.filename))
    const userDel =  data.accounts.filter(ide => ide.id === parseInt(id))
    data.accounts = data.accounts.filter(ide => ide.id !== parseInt(id))
    await writeFile(global.filename, JSON.stringify(data, null, 2))

    return userDel
}

async function updateService(account){
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

async function updatePatchService(account){
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
    postService,
    getService,
    getIdAccount,
    deleteService,
    updateService,
    updatePatchService
}