import { promises as fs } from "fs"

let html = "<h1>WriteFile: Cria um arquivo</h1> \n"
let html2 = "<h2>ReadFile: Lê o arquivo</h2> \n"
let html3 = "<h2>AppenddFile: Concatena arquivo</h2> \n"
let html4 = "<h2>Usar Promises para não deixar o código extenso e dificil de ler</h2> \n"
let html5 = "<h2>Usar Async para não deixar as callback hell</h2>"


// escrevendo e lendo json

// Usando async 
async function init() {
    try {
        await fs.writeFile("page.html", html)
        await fs.appendFile("page.html", `${html2} ${html3} ${html4} ${html5} `)
        const res = await fs.readFile("page.html", "utf-8",)
        console.log(res)
    } catch (err)  {
        console.log(err)
    }
} 
init()



// usando forma de promise
// fs.writeFile("page.html", html).then(() => {
//     fs.appendFile("page.html", `${html2} ${html3} ${html4} `).then(() => {
//         fs.readFile("page.html", "utf-8",).then( res => {
//             console.log(res)
//         }).catch( err => {
//             console.log( err)
//         })
//     }).catch( err => {
//         console.log(err)
//     })
// }).catch(err => {
//     console.log(err)
// })




// Usando callBack
// cria o arquivo
// fs.writeFile("page.html", html, (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("arquivo criado")

//         // concatena
//         fs.appendFile("page.html", `${html2} ${html3}`, (err) => {
//             if (err) {
//                 console.log(err)
//             } else {

//                 // lê o arquivo
//                 fs.readFile("page.html", "utf-8", (err, data) => {
//                     if (err) {
//                         console.log(err)
//                     } else {
//                         console.log(data)
//                     }
//                 })
//             }
//         })
//     }
// })