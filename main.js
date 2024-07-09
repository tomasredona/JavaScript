const valor_entrada = 2000
let peliculas = [
    { id: 1, nombre: "El hombre araña", categoria: "Niños" },
    { id: 2, nombre: "Los increíbles", categoria: "Niños" },
    { id: 3, nombre: "Intensamente", categoria: "Niños" },
    { id: 4, nombre: "Mentiras arriesgadas", categoria: "Adultos" },
    { id: 5, nombre: "Heat", categoria: "Adultos" },
    { id: 6, nombre: "Terminator", categoria: "Adultos" },
]

alert("Bienvenidos a Cinepolis, presione enter enter para continuar.")

let entrada_usuario
const max_entradas = 5

let categoria = prompt("Que categoria de película desea ver, ingrese 1 para niños o 2 para adultos")

const pelis_disponibles = peliculas.filter((pelicula) => {
    if (parseInt(categoria) === 1 && pelicula.categoria === "Niños") {
        return pelicula
    }
    else if (parseInt(categoria) === 2 && pelicula.categoria === "Adultos") {
        return pelicula
    }
})
const pelis_mostrar = pelis_disponibles.map((pelicula) => `\n${pelicula.id}-${pelicula.nombre}`).join('')

alert(`Estas son las películas disponibles: \n${pelis_mostrar}`)

let numero_pelicula = prompt("Ingrese el número de pelicula que desea ver")

const pelicula_elegida = peliculas.filter((pelicula) => pelicula.id == numero_pelicula)

entrada_usuario = prompt("Ingrese la cantidad de entradas que necesite")

if (entrada_usuario > max_entradas) {
    alert(`Excedió el limite de entradas por persona ${max_entradas}`)
}
else {
    alert(`Gracias por su compra! Usted adquirió ${entrada_usuario} entradas para la película ${pelicula_elegida[0].nombre}`)
}

alert("Seleccione butacas")

for (let i = 1; i <= entrada_usuario; i++) {

    prompt(`Seleccione la butaca para la entrada número ${i}`)
}
valor_entradas = (cant_entradas, precio_entrada) => {
    return cant_entradas * precio_entrada
}

let precio_total = valor_entradas(entrada_usuario, valor_entrada)

alert(`Total a pagar: ${precio_total}`)




// function valor_entradas(cant_entradas, precio_entrada) {
// return cant_entradas * precio_entrada
// }