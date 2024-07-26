const valor_entrada = 2000;
const peliculas = [
    { id: 1, nombre: "El hombre araña", categoria: "Niños" },
    { id: 2, nombre: "Los increíbles", categoria: "Niños" },
    { id: 3, nombre: "Intensamente", categoria: "Niños" },
    { id: 4, nombre: "Mentiras arriesgadas", categoria: "Adultos" },
    { id: 5, nombre: "Heat", categoria: "Adultos" },
    { id: 6, nombre: "Terminator", categoria: "Adultos" }
];

const valor_entradas = (cant_entradas, precio_entrada) => cant_entradas * precio_entrada;

const max_entradas = 5;

document.getElementById('categoria_pelicula').addEventListener('submit', event => {
    event.preventDefault();

    const categoria_elegida = document.getElementById("categoria_elegida").value;
    localStorage.setItem("categoria_elegida", categoria_elegida);

    const pelis_disponibles = peliculas.filter(({ categoria }) => categoria === categoria_elegida);

    const peliculasSelect = document.getElementById('peliculas_elegida');
    peliculasSelect.innerHTML = '';
    pelis_disponibles.forEach(({ nombre }) => {
        const option = document.createElement('option');
        option.value = nombre;
        option.textContent = nombre;
        peliculasSelect.appendChild(option);
    });

    document.getElementById('peliculas_disponibles').style.display = 'block';
});

document.getElementById('peliculas_disponibles').addEventListener('submit', event => {
    event.preventDefault();

    const pelicula_elegida = document.getElementById("peliculas_elegida").value;
    localStorage.setItem('pelicula_elegida', pelicula_elegida);

    document.getElementById('entradas').style.display = 'block';
});

document.getElementById('entradas').addEventListener('submit', event => {
    event.preventDefault();

    const cantidad_entradas = document.getElementById("cantidad_entradas").value;
    localStorage.setItem('cantidad_entradas', cantidad_entradas);

    const butacasInput = document.getElementById('butacas_label');
    butacasInput.innerHTML = "<div>Elija las butacas que desea:</div>";

    for (let index = 0; index < cantidad_entradas; index++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Entrada ${index + 1}`;
        butacasInput.appendChild(input);
    }

    document.getElementById('butacas').style.display = 'block';
});

document.getElementById('butacas').addEventListener('submit', event => {
    event.preventDefault();

    const numeros_butaca = Array.from(document.querySelectorAll('#butacas_label input'))
        .map(butaca => butaca.value)
        .filter(value => value > 0);

    localStorage.setItem("numeros_butacas", numeros_butaca);

    const cantidad_entradas = localStorage.getItem("cantidad_entradas");
    const precio_total = valor_entradas(cantidad_entradas, valor_entrada);

    document.getElementById('compra_final').style.display = 'block';

    const padrediv = document.getElementById('padre_items');
    padrediv.innerHTML = `
        <div>De la película ${localStorage.getItem("pelicula_elegida")}</div>
        <div>La cantidad de ${cantidad_entradas} entradas</div>
        <div>Las butacas ${numeros_butaca}</div>
        <div>El precio total es de $${precio_total}</div>
    `;
});





















