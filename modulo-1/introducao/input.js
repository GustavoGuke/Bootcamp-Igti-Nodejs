const numero = parseInt(process.argv[2])


function ehPrimo(num){
    for( let i = 2; i <= num; i++){
        if(num%i ==0){
            return false
        }
        return true
    }
}
let primo = ehPrimo(numero)
console.log(primo)