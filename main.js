const valor_entrada = 2000

alert("Bienvenidos a Cinepolis, presione enter enter para continuar.")

let entrada_usuario
const max_entradas = 5

entrada_usuario = prompt("Ingrese la cantidad de entradas que necesite")

if (entrada_usuario > max_entradas) {
    alert(`Excedió el limite de entradas por persona ${max_entradas}`)
}
else {
    alert(`Gracias por su compra! Usted adquirió ${entrada_usuario} entradas`)
}

const peli_elegida = prompt("Por favor elija la película que desea ver")

alert("Seleccione butacas")

for (let i = 1; i <= entrada_usuario; i++) {

    prompt(`Seleccione la butaca para la entrada número ${i}`)
}

let precio_total = valor_entradas(entrada_usuario, valor_entrada)

alert(`Total a pagar: ${precio_total}`)

valor_entradas = (cant_entradas, precio_entrada) => {
    return cant_entradas * precio_entrada
}


// function valor_entradas(cant_entradas, precio_entrada) {
// return cant_entradas * precio_entrada
// }