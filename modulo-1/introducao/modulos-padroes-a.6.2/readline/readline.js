import readlile from "readline"

const rl = readlile.createInterface({
    input: process.stdin,
    output: process.stdout
})


function repetirNome(){


    rl.question("Digite seu nome: ", nome => {
        if(nome !== "gustavo"){
            rl.close()
        } else{
        console.log(nome)
        repetirNome()
        }
    })

}
repetirNome()