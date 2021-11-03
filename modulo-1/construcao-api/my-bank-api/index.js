import express from "express"
import accountsRouter from "./routes/accounts.routes.js"
import {promises as fs} from "fs"


const {readFile, writeFile} = fs
const app = express()
app.use(express.json())
global.filename = "account.json"
app.use("/account", accountsRouter)

app.listen(3000, async () => {
    const initialJson = {
        nextId: 1,
        accounts: []
    }
    try {
        await readFile(global.filename)
        
    } catch (error) {
        await writeFile(global.filename,JSON.stringify(initialJson))
        
    }
  
   console.log("API Started")
})