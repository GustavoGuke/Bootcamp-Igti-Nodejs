import {promises as fs} from "fs"

// escrevendo e lendo json


async function readJson(){
   
    try{
        let carros = ['palio', 'gol', "onix"]
        let obj = {car: carros}
        await fs.writeFile("carro.json",JSON.stringify(obj))
        const data = JSON.parse( await fs.readFile("carro.json"))
        console.log(data.car)

    } catch (err){
        console.log(err)
    }
}

readJson()