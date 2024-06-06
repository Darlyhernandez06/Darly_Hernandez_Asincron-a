// 2. Lea el archivo users.json suministrado por el instructor y tome como base las capturas para luego mostrar todos los datos de usuario de cada
// aprendiz, este ejercicio de desarrolla con promesas.

// a. Imprima el resultado en una tabla donde solo nos mostrar el nombre
// y el avatar de cada aprendiz

// Leer el archivo users.json y procesar los datos para mostrar nombre y avatar de cada aprendiz
fetch("user.json") // Hacer una solicitud para obtener el contenido del archivo users.json,  Esta línea hace una solicitud HTTP GET al archivo user.json para obtener su contenido. fetch devuelve una promesa que eventualmente se resolverá con la respuesta del servidor.
  
  .then(response => response.json()) // Convertir la respuesta a formato JSON, Una vez que la solicitud se completa con éxito, la respuesta se convierte a formato JSON utilizando el método json() del objeto Response. Esto se hace encadenando otra promesa a la primera.

  .then(users => { // Cuando la respuesta sea convertida a JSON, proceder con los datos obtenidos, Cuando la respuesta se convierte a JSON, este bloque de código se ejecuta. users ahora contiene los datos del archivo user.json en formato JSON.

    // Filtrar solo los usuarios que son aprendices,
    const aprendices = users.filter(user => user.aprendiz); // Se filtran los usuarios para obtener solo aquellos que tienen la propiedad aprendiz establecida como verdadera. Esto se hace utilizando el método filter() de los arrays.

    // Crear un array de objetos con el nombre y el avatar de cada aprendiz
    const datosAprendices = aprendices.map(aprendiz => ({ // Utilizar map para crear un nuevo array con los datos de cada aprendiz. Se extrae el nombre del aprendiz y se construye la URL del avatar del aprendiz en GitHub.

      Nombre: aprendiz.name, // Obtener el nombre del aprendiz
      Avatar: `https://github.com/${aprendiz.user}.png?size=200` // Construir la URL del avatar del aprendiz en GitHub
    }));

    // Mostrar los datos en una tabla en la consola
    console.table(datosAprendices); // Mostrar los datos de los aprendices en una tabla en la consola
  })
  .catch(error => {
    console.error('Error:', error);  // Manejar cualquier error que ocurra durante el proceso
  });

// El texto png?size=200 al final de la URL del avatar de GitHub indica que la imagen se entregará en formato PNG y tendrá un tamaño específico de 200x200 píxeles. La parte ?size=200 es un parámetro de la URL que le dice al servidor de GitHub qué tamaño de imagen debe devolver. En este caso, se está solicitando una imagen de avatar de tamaño 200x200 píxeles