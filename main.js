async function cargarSistema() {

    // Precio por entrada
    const valor_entrada = 4000;

    async function cargarPeliculas() {
        try {
            const response = await fetch('./peliculas.json');
            const pre_peliculas = await response.json();
            return pre_peliculas.peliculas
        } catch (error) {
            console.error('Error al cargar el archivo JSON:', error);
        }
    }

    const peliculas = await cargarPeliculas()

    // Función para calcular el valor total de las entradas
    const valor_entradas = (cant_entradas, precio_entrada) => cant_entradas * precio_entrada;

    // Evento para manejar el envío del formulario de categoría de película
    document.getElementById('categoria_pelicula').addEventListener('submit', event => {
        event.preventDefault(); // Evita que el formulario se envíe y recargue la página

        const categoria_elegida = document.getElementById("categoria_elegida").value; // Obtiene la categoría seleccionada
        localStorage.setItem("categoria_elegida", categoria_elegida); // Guarda la categoría seleccionada en el localStorage

        // Filtra las películas disponibles según la categoría seleccionada
        const pelis_disponibles = peliculas.filter(({ categoria }) => categoria === categoria_elegida);

        // Rellena el select de películas con las opciones filtradas
        const peliculasSelect = document.getElementById('peliculas_elegida');
        peliculasSelect.innerHTML = ''; // Limpia el contenido previo del select
        pelis_disponibles.forEach(({ nombre }) => {
            const option = document.createElement('option');
            option.value = nombre;
            option.textContent = nombre;
            peliculasSelect.appendChild(option); // Agrega cada película como una opción en el select
        });

        document.getElementById('peliculas_disponibles').style.display = 'block'; // Muestra el formulario de selección de películas
    });

    // Evento para manejar el envío del formulario de películas disponibles
    document.getElementById('peliculas_disponibles').addEventListener('submit', event => {
        event.preventDefault(); // Evita que el formulario se envíe y recargue la página

        const pelicula_elegida = document.getElementById("peliculas_elegida").value; // Obtiene la película seleccionada
        localStorage.setItem('pelicula_elegida', pelicula_elegida); // Guarda la película seleccionada en el localStorage

        document.getElementById('entradas').style.display = 'block'; // Muestra el formulario de selección de entradas
    });

    // Evento para manejar el envío del formulario de entradas
    document.getElementById('entradas').addEventListener('submit', event => {
        event.preventDefault(); // Evita que el formulario se envíe y recargue la página

        const cantidad_entradas = document.getElementById("cantidad_entradas").value; // Obtiene la cantidad de entradas seleccionada
        localStorage.setItem('cantidad_entradas', cantidad_entradas); // Guarda la cantidad de entradas en el localStorage

        // Crea campos de entrada para seleccionar las butacas según la cantidad de entradas
        const butacasInput = document.getElementById('butacas_label');
        butacasInput.innerHTML = "<div>Elija las butacas que desea:</div>";

        for (let index = 0; index < cantidad_entradas; index++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.placeholder = `Entrada ${index + 1}`;
            butacasInput.appendChild(input); // Agrega un input para cada butaca
        }

        document.getElementById('butacas').style.display = 'block'; // Muestra el formulario de selección de butacas
    });

    // Evento para manejar el envío del formulario de butacas
    document.getElementById('butacas').addEventListener('submit', event => {
        event.preventDefault(); // Evita que el formulario se envíe y recargue la página

        // Obtiene los números de butaca seleccionados
        const numeros_butaca = Array.from(document.querySelectorAll('#butacas_label input'))
            .map(butaca => butaca.value)
            .filter(value => value > 0); // Filtra solo los valores mayores a 0

        localStorage.setItem("numeros_butacas", numeros_butaca); // Guarda los números de butaca en el localStorage

        const cantidad_entradas = localStorage.getItem("cantidad_entradas"); // Recupera la cantidad de entradas del localStorage
        const precio_total = valor_entradas(cantidad_entradas, valor_entrada); // Calcula el precio total de las entradas

        document.getElementById('compra_final').style.display = 'block'; // Muestra la sección del resumen de compra

        // Muestra el resumen de la compra en el DOM
        const padrediv = document.getElementById('padre_items');
        padrediv.innerHTML = `
          <div>De la película: ${localStorage.getItem("pelicula_elegida")}</div>
          <div>La cantidad de: ${cantidad_entradas} Entradas</div>
          <div>Las butacas: ${numeros_butaca}</div>
          <div>El precio total es de: $${precio_total}</div>
      `;

        // Muestra el SweetAlert con un mensaje de agradecimiento
        Swal.fire({
            title: '¡Gracias por su compra!',
            html: `
            <ul style="text-align: left; list-style-type: none; padding: 0;">
                <li><strong>Película:</strong> ${localStorage.getItem("pelicula_elegida")}</li>
                <li><strong>Cantidad de entradas:</strong> ${localStorage.getItem("cantidad_entradas")}</li>
                <li><strong>Butacas:</strong> ${localStorage.getItem("numeros_butacas").split(',').join(', ')}</li>
                <li><strong>Total a pagar:</strong> $${precio_total}</li>
            </ul>
        `,
            icon: 'success', // Muestra un ícono de éxito
            confirmButtonText: 'Aceptar' // Texto del botón de confirmación
        })

            .then(() => {
                location.reload(); // Recarga la página cuando el usuario hace clic en "Aceptar"
            });
    });

}

cargarSistema()























