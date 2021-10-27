import express from "express"
import accountsRouter from "./routes/accounts.js"
import {promises as fs} from "fs"


const {readFile, writeFile, appendFile} = fs
const app = express()
app.use(express.json())

app.use("/account", accountsRouter)

app.listen(3000, async () => {
    const initialJson = {
        nextId: 1,
        accounts: []
    }
    try {
        await readFile("accounts.json")
        
    } catch (error) {
        await writeFile("account.json",JSON.stringify(initialJson))
    }
  
   console.log("API Started")
})