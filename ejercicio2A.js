// 2. Lea el archivo users.json suministrado por el instructor y tome como base las capturas para luego mostrar todos los datos de usuario de cada
// aprendiz, este ejercicio de desarrolla con promesas.

// a. Imprima el resultado en una tabla donde solo nos mostrar el nombre y el avatar de cada aprendiz

// EXPLICACION DEL CODIGO LINEA POR LINEA 

// Hacer una solicitud para obtener el contenido del archivo users.json.
// Esta línea hace una solicitud HTTP GET al archivo user.json para obtener su contenido.
// fetch devuelve una promesa que eventualmente se resolverá con la respuesta del servidor.
// es un método de solicitud utilizado para obtener datos de un servidor web. Se 
// caracteriza por ser seguro y no tener efectos secundarios en el servidor, y los
// parámetros de la solicitud se incluyen en la URL.
fetch("user.json")
  // Convertir la respuesta a formato JSON.
  // Una vez que la solicitud se completa con éxito, la respuesta se convierte a formato JSON utilizando el método json() del objeto Response.
  // Esto se hace encadenando otra promesa a la primera.

  // .then(response => response.json()): Después de que se realiza la solicitud HTTP, 
  // el servidor envía una respuesta. El método .then() se encadena a la solicitud HTTP 
  // para manejar la respuesta. Toma la respuesta (objeto Response) como parámetro y 
  // utiliza el método .json() para convertir los datos de la respuesta a formato JSON. 
  // Esto devuelve una nueva promesa que se resuelve con los datos en formato JSON cuando 
  // la conversión está completa.
  
  // .then(data => { ... }): Una vez que la promesa devuelta por .json() se resuelve con 
  // los datos en formato JSON, este método .then() se encadena

  .then(response => response.json())
  .then(data => {
    // Cuando la respuesta se convierte a JSON, este bloque de código se ejecuta.
    // data ahora contiene los datos del archivo user.json en formato JSON.

    // Filtrar solo los usuarios que son aprendices.
    // Se filtran los usuarios para obtener solo aquellos que tienen la propiedad aprendiz establecida como verdadera.
    // Esto se hace utilizando el método filter() de los arrays.

    // data.users: Hace referencia a un array de usuarios dentro del objeto data. Este 
    // código asume que data es un objeto que contiene una propiedad llamada users, 
    // que es un array de objetos representando usuarios.
    // Utiliza el método filter() de los arrays para iterar sobre cada elemento del array
    // users y devolver un nuevo array que contiene únicamente los elementos para los 
    // cuales la función de filtro devuelve true.
    // Se proporciona como argumento a filter() una función de flecha que toma un parámetro
    // user (que representa cada usuario en el array). Dentro de esta función, se evalúa 
    // la expresión user.aprendiz. Si user.aprendiz es evaluado como true, entonces el 
    // usuario actual será incluido en el nuevo array filtrado; de lo contrario, será 
    // excluido.
    // La constante aprendices será un nuevo array que contiene únicamente los usuarios 
    // que tienen la propiedad aprendiz establecida como verdadera.
    const aprendices = data.users.filter(user => user.aprendiz);

    // Crear un array de objetos con el nombre y el avatar de cada aprendiz.
    // Utilizar map para crear un nuevo array con los datos de cada aprendiz.
    // Se extrae el nombre del aprendiz y se construye la URL del avatar del aprendiz en 
    // GitHub.

    // El parámetro aprendiz representa cada elemento del array aprendices durante la 
    // iteración.
    // El resultado de map() es un nuevo array, donde cada elemento está formado por
    // el resultado de llamar a la función proporcionada en cada elemento del array 
    // original.
    const datosAprendices = aprendices.map(aprendiz => ({
      // Obtener el nombre del aprendiz.
      // Establecer una propiedad "Nombre" del objeto como el nombre del aprendiz.
      // cada aprendiz tiene una propiedad name que contiene su nombre.
      Nombre: aprendiz.name,
      // Construir la URL del avatar del aprendiz en GitHub.
      // Construye la URL del avatar del aprendiz en GitHub. Se supone que cada aprendiz 
      // tiene una propiedad user que contiene su nombre de usuario de GitHub. La URL se 
      // forma concatenando el nombre de usuario al comienzo de la URL base para los 
      // avatares de GitHub (https://github.com/), seguido de .png y ?size=200 para
      // especificar el formato y el tamaño del avatar, respectivamente.
      // `: backticks
      Avatar: `https://github.com/${aprendiz.user}.png?size=200`
    }));

    // Mostrar los datos en una tabla en la consola.
    // Mostrar los datos de los aprendices en una tabla en la consola.
    console.table(datosAprendices);
  })
  .catch(error => {
    // Manejar cualquier error que ocurra durante el proceso.
    console.error('Error:', error);
  });

// El texto png?size=200 al final de la URL del avatar de GitHub indica que la imagen se 
// entregará en formato PNG y tendrá un tamaño específico de 200x200 píxeles. La parte
// ?size=200 es un parámetro de la URL que le dice al servidor de GitHub qué tamaño de
// imagen debe devolver. En este caso, se está solicitando una imagen de avatar de tamaño
// 200x200 píxeles