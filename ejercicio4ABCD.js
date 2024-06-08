// 4. Basados en la solución del punto 3 daremos solución a los siguientes puntos:
// // a. Muestre solo los resultados que tengan menos de 5 repositorios
// públicos en una tabla por consola.
// b. Muestre solo los resultados de los repositorios que contengan la
// palabra JavaScript en su name
// c. Ordene de menor a mayor según el nombre del repositorio
// d. Muestre solo los repositorios que tengan mas de cinco letras en su
// nombre

// EXPLICACION DEL CODIGO LINEA POR LINEA 

// Define una función de flecha expresada que es asíncrona, utilizando la sintaxis de funciones de flecha.
const obtenerRepositorios = async () => {
  // el código está dentro de un bloque try-catch para manejar cualquier error que pueda
  // ocurrir durante el proceso
  try {
      // Hacer una solicitud para obtener el contenido del archivo users.json.
      // La función fetch se utiliza para obtener recursos de la red, como archivos JSON, desde un servidor web.
      // Aquí se utiliza para obtener el contenido del archivo JSON "user.json" desde el servidor.
      // La función fetch devuelve una promesa que se resolverá en una respuesta a la solicitud.
      // Se utiliza await para esperar la respuesta de la solicitud antes de continuar con la ejecución del código.
      // Después, se utiliza el método .json() para convertir la respuesta en un objeto JavaScript que representa los datos del archivo JSON.
      // La respuesta se almacena en la variable 'response', que representa la respuesta de la solicitud.
      const response = await fetch("user.json");
      
      // Convertir la respuesta a formato JSON.
      // El método .json() devuelve otra promesa que se resolverá en el objeto JavaScript con los datos del archivo JSON.
      // Se utiliza await nuevamente para esperar la conversión antes de continuar con la ejecución del código.
      // El objeto JavaScript resultante se almacena en la variable "data", que contiene los datos del archivo JSON.
      const data = await response.json();

      // Utiliza una función de flecha expresada como función de callback en el método filter para filtrar los usuarios que son aprendices.
      // El método filter() se utiliza para filtrar elementos de un array basado en una condición.
      // En este caso, se filtran los usuarios que tienen la propiedad "aprendiz" establecida como verdadera.
      // El resultado se almacena en la variable "aprendices".

      // Utilizar una función de flecha expresada como función de callback en el método filter para filtrar los usuarios que son aprendices.
      // La función de callback es user => user.aprendiz. Esta función se pasa como 
      // argumento al método filter() y se ejecuta para cada elemento del array 
      // data.users. 
      // La función verifica si la propiedad aprendiz de cada usuario es verdadera. 
      // Si es así, ese usuario se incluye en el nuevo array resultante.
      // data.users: La variable data contiene los datos obtenidos del archivo 
      // "user.json" después de convertirlos a formato JavaScript mediante la función 
      // json(). data es un objeto que tiene una propiedad users que es un array de 
      // usuarios.
      const aprendices = data.users.filter(user => user.aprendiz);

      // Crear un arreglo para almacenar los repositorios de cada aprendiz.
      // La variable "repositoriosAprendices" se inicializa como un arreglo vacío.
      let repositoriosAprendices = [];

      // Iterar sobre cada aprendiz.
      // El bucle for...of se utiliza para iterar sobre elementos de un array, en este caso, sobre el array de aprendices.
      // En cada iteración, se ejecuta el bloque de código dentro del bucle con "aprendiz" tomando el valor del elemento actual del array.
      for (const aprendiz of aprendices) {
          // Hacer una solicitud para obtener los repositorios públicos del aprendiz en GitHub.
          // Dentro del bucle, se utiliza la función fetch() para hacer una solicitud HTTP GET a la API de GitHub.
          // Se utiliza la interpolación de cadenas para construir la URL de la API de GitHub basada en el nombre de usuario del aprendiz.
          // Se utiliza await para esperar la respuesta de la solicitud antes de continuar con la ejecución del código.
          // La respuesta se almacena en la constante "respuestaGithub".
          const respuestaGithub = await fetch(`https://api.github.com/users/${aprendiz.user}/repos`);

          // Convertir la respuesta a formato JSON.
          // Se utiliza await para esperar la conversión antes de continuar con la ejecución del código.
          // Los repositorios del aprendiz se almacenan en la constante "repositorios".
          // Se convierte la respuesta a formato JSON.
          // Esto se hace utilizando el método json() del objeto Response.
          // El método json() es un método del objeto Response que devuelve una promesa que eventualmente se 
          // resuelve con los datos de la respuesta en formato JSON.
          // El operador await se utiliza para esperar a que esta promesa se resuelva, lo que significa que la 
          // ejecución del código se detiene hasta que la conversión a JSON se complete.
          // Los datos convertidos a JSON se asignan a la variable repositorios.
          const repositorios = await respuestaGithub.json();

          // Filtrar los repositorios con menos de 5 elementos:
          // Se utiliza el método filter() en el array "repositorios" para filtrar los elementos basados en una condición.
          // En este caso, la condición se especifica utilizando una función de flecha (arrow function).
          // Para cada elemento "repo" en el array "repositorios", se evalúa si la propiedad "public_repos" del repositorio es menor que 5.
          // Si la condición es verdadera (es decir, si el repositorio tiene menos de 5 elementos), el repositorio se incluye en el nuevo array "repositoriosMenosDe5".
          // Si la condición es falsa (es decir, si el repositorio tiene 5 o más elementos), el repositorio no se incluye en el nuevo array.
          const repositoriosMenosDe5 = repositorios.filter(repo => repo.public_repos < 5);
          // Imprimir en la consola los repositorios del aprendiz con menos de 5 elementos.
          console.log(`Repositorios de ${aprendiz.name} con menos de 5 repositorios:`);
          console.table(repositoriosMenosDe5);

          // Filtrar los repositorios que contienen la palabra JavaScript en su nombre.
          // El método filter() se utiliza para filtrar elementos de un array basado en una condición.
          // En este caso, se filtran los repositorios que tienen la palabra "javascript" (ignorando mayúsculas y minúsculas) en su nombre.
          // El resultado se almacena en la constante "repositoriosJavaScript".
          // repo representa cada repositorio en el array repositorios.
          // repo.name accede al nombre del repositorio actual.
          // toLowerCase() convierte el nombre del repositorio a minúsculas.
          // includes('javascript') verifica si el nombre del repositorio contiene la cadena "javascript" (ignorando mayúsculas y minúsculas).
          const repositoriosJavaScript = repositorios.filter(repo => repo.name.toLowerCase().includes('javascript'));
          // Imprimir en la consola los repositorios del aprendiz con menos de 5 elementos.
          // Se utiliza console.log() para imprimir un mensaje en la consola, que indica los repositorios que cumplen con la condición.
          // Se utiliza console.table() para mostrar los repositorios filtrados en formato de tabla en la consola.
          // El mensaje incluye el nombre del aprendiz para identificar a qué aprendiz pertenecen los repositorios.
          console.log(`Repositorios de ${aprendiz.name} con la palabra "JavaScript" en su nombre:`);
          console.table(repositoriosJavaScript);

          // Ordenar los repositorios de menor a mayor según el nombre:
          // Se utiliza el método sort() en el array "repositorios" para ordenar los elementos.
          // La función de comparación proporcionada compara dos elementos "a" y "b" (dos repositorios) y devuelve un valor numérico.
          // La función localeCompare() se utiliza para comparar las cadenas de texto (nombres de los repositorios) de forma sensible a la localización, lo que garantiza un ordenamiento alfabético adecuado.
          // name para acceder al nombre de cada repositorio y así poder compararlos y ordenarlos alfabéticamente. 
          // Si el resultado de la comparación es negativo, "a" se ordenará antes que "b".
          // Si el resultado es positivo, "b" se ordenará antes que "a".
          // Si el resultado es cero, "a" y "b" se consideran iguales y no se cambian de posición.
          repositorios.sort((a, b) => a.name.localeCompare(b.name));
          // Imprimir en la consola los repositorios del aprendiz ordenados alfabéticamente:
          console.log(`Repositorios de ${aprendiz.name} ordenados alfabéticamente:`);
          console.table(repositorios);


          // Filtrar los repositorios que tienen más de cinco letras en su nombre.
          // El método filter() se utiliza para filtrar elementos de un array basado en una condición.
          // En este caso, se filtran los repositorios que tienen más de cinco letras en su nombre.
          // El resultado se almacena en la constante "repositoriosMasDe5Letras".
          // repo representa cada repositorio en el array repositorios.
          // repo.name accede al nombre del repositorio actual.
          // length devuelve la cantidad de caracteres en el nombre del repositorio.
          // > 5 verifica si la longitud del nombre del repositorio es mayor que 5.
          const repositoriosMasDe5Letras = repositorios.filter(repo => repo.name.length > 5);
          // Imprimir en la consola los repositorios del aprendiz cuyos nombres tienen más de cinco letras.
          console.log(`Repositorios de ${aprendiz.name} con nombres que tienen más de cinco letras:`);
          console.table(repositoriosMasDe5Letras);

          // Agregar los repositorios del aprendiz al arreglo general.
          // Se utiliza el operador spread (...) para combinar los arrays de repositorios.
          // El resultado se asigna a la variable "repositoriosAprendices".
          repositoriosAprendices = [...repositoriosAprendices, ...repositorios];
      }
      // Retornar todos los repositorios en un solo arreglo.
      return repositoriosAprendices;
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante el proceso
      console.error('Error:', error);
      // Devolver un arreglo vacío en caso de error
      return [];
  }
};

// Llamar a la función obtenerRepositorios y utilizar async/await para manejar la respuesta, función flecha autoinvocada asíncrona.
(async () => {
  // Esperar a que se resuelva la función obtenerRepositorios y almacenar el resultado en la variable repositorios
  const repositorios = await obtenerRepositorios();
  // Se llama a la función obtenerRepositorios y se espera su resolución.
  // Los repositorios obtenidos se almacenan en la variable repositorios.

  // Imprimir en la consola todos los repositorios obtenidos
  console.log("Todos los repositorios:");
  console.table(repositorios);
  // Se imprime una tabla con todos los repositorios obtenidos.
})();

// En este caso, "función flecha autoinvocada asíncrona" se refiere a una función de flecha
// definida y ejecutada inmediatamente utilizando la sintaxis () => {...}(). La función es
// asíncrona (async), lo que significa que puede contener expresiones await dentro de ella,
// y es autoinvocada, lo que significa que se ejecuta inmediatamente después de ser definida.


// El operador de propagación (...) se utiliza en JavaScript para descomponer o "desempaquetar" los elementos de un arreglo o los valores de un objeto. En este código:

// repositoriosAprendices = [...repositoriosAprendices, ...repositorios];
// El operador ... se utiliza para concatenar los repositorios de cada aprendiz al arreglo repositoriosAprendices.

// En cuanto a (async () => { ... })();, esto es una función flecha autoinvocada asíncrona. Aquí está lo que hace:

// (async () => { ... }): Esto define una función flecha asíncrona anónima.
// () al final: Esto invoca la función inmediatamente después de ser definida.
// En resumen, esta construcción define una función asíncrona anónima y luego la ejecuta de inmediato. En el código
// proporcionado, se utiliza para llamar a la función obtenerRepositorios y manejarla de forma asíncrona.

// Autoinvocada: Una función autoinvocada es una función que se ejecuta inmediatamente después de ser definida
// Por lo tanto, una "función flecha autoinvocada asíncrona" es simplemente una combinación de estas tres características:
// una función flecha definida dentro de paréntesis que se invoca inmediatamente y que también puede contener operaciones
// asíncronas utilizando async / await. Es útil para encapsular código asíncrono en un contexto autocontenido y ejecutarlo
// de inmediato.

// En resumen, el operador de propagación ... se utiliza para hacer cosas como añadir elementos a arrays, pasar argumentos
// de funciones, clonar objetos y combinar objetos en JavaScript de manera más fácil y compacta.

