// 4. Basados en la solución del punto 3 daremos solución a los siguientes puntos:
// // a. Muestre solo los resultados que tengan menos de 5 repositorios
// públicos en una tabla por consola.
// b. Muestre solo los resultados de los repositorios que contengan la
// palabra JavaScript en su name
// c. Ordene de menor a mayor según el nombre del repositorio
// d. Muestre solo los repositorios que tengan mas de cinco letras en su
// nombre

// Define una función de flecha expresada que es asíncrona, utilizando la sintaxis de funciones de flecha.
const obtenerRepositorios = async () => {
    try {
      // Hacer una solicitud para obtener el contenido del archivo users.json
      // En el codigo vemos un "fetch" y este se esta utilizando para obtener recursos de la red, como lo son los archivos json, desde un servidor web y aqui es para obtener el contenido del archivo JSON "user.json" desde el servidor, La función "fetch" devuelve una promesa que resuelve en una respuesta a la solicitud, Se utiliza "await" para esperar la respuesta de la solicitud antes de continuar con la ejecución del código, Después, se utiliza el método.json()' para convertir la respuesta en un objeto JavaScript que representa los datos del archivo JSON, La respuesta se almacena en la variable 'response', que representa la respuesta de la solicitud.
      const response = await fetch("user.json");
      
      // Convertir la respuesta a formato JSON
      const data = await response.json(); // "response.json()'"" devuelve otra promesa que resuelve en el objeto JavaScript con los datos del archivo JSON, Se utiliza 'await' nuevamente para esperar la conversión antes de continuar con la ejecución del código, El objeto JavaScript resultante se almacena en la variable 'user', que contiene los datos del archivo JSON.
    
      // Utiliza una función de flecha expresada como función de callback en el método filter para filtrar los usuarios que son aprendices.
      const aprendices = data.users.filter(user => user.aprendiz); // Respuesta a la parte c)
    
      // Crear un arreglo para almacenar los repositorios de cada aprendiz
      let repositoriosAprendices = [];
    
      // Iterar sobre cada aprendiz
      for (const aprendiz of aprendices) {
        // Hacer una solicitud para obtener los repositorios públicos del aprendiz en GitHub
        const respuestaGithub = await fetch(`https://api.github.com/users/${aprendiz.user}/repos`);
        // Convertir la respuesta a formato JSON
        const repositorios = await respuestaGithub.json();

      // Filtrar los repositorios con menos de 5 elementos (Respuesta a la parte a)
      const repositoriosMenosDe5 = repositorios.filter(repo => repo.public_repos < 5);
      console.log(`Repositorios de ${aprendiz.name} con menos de 5 repositorios:`);
      console.table(repositoriosMenosDe5);

      // Filtrar los repositorios que contienen la palabra JavaScript en su name (Respuesta a la parte b)
      const repositoriosJavaScript = repositorios.filter(repo => repo.name.toLowerCase().includes('javascript'));
      console.log(`Repositorios de ${aprendiz.name} con la palabra "JavaScript" en su nombre:`);
      console.table(repositoriosJavaScript);

      // Ordenar los repositorios de menor a mayor según el nombre (Respuesta a la parte c)
      repositorios.sort((a, b) => a.name.localeCompare(b.name));
      console.log(`Repositorios de ${aprendiz.name} ordenados alfabéticamente:`);
      console.table(repositorios);

      // Filtrar los repositorios que tienen más de cinco letras en su nombre (Respuesta a la parte d)
      const repositoriosMasDe5Letras = repositorios.filter(repo => repo.name.length > 5);
      console.log(`Repositorios de ${aprendiz.name} con nombres que tienen más de cinco letras:`);
      console.table(repositoriosMasDe5Letras);

      // Agregar los repositorios del aprendiz al arreglo general
      repositoriosAprendices = [...repositoriosAprendices, ...repositorios]; // Respuesta a la parte b)
      }   

    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante el proceso
        console.error('Error:', error);
        // Devolver un arreglo vacío en caso de error
        return [];
    }
};

// Llamar a la función obtenerRepositorios y utilizar async/await para manejar la respuesta, función flecha autoinvocada asíncrona
(async () => {
    // Esperar a que se resuelva la función obtenerRepositorios y almacenar el resultado en la variable repositorios
    const repositorios = await obtenerRepositorios();
    // Imprimir en la consola todos los repositorios obtenidos
    console.log("Todos los repositorios:");
    console.table(repositorios);
})();


// const obtenerRepositorios = async () => {: Se define una función llamada obtenerRepositorios que es asíncrona
// (async).Esto significa que la función devolverá una promesa.

// try {: Comienza un bloque try, que se utiliza para manejar posibles errores en el código.Si ocurre un error dentro de este bloque, se ejecutará el código dentro del bloque catch.

// const response = await fetch('users.json');: Se realiza una solicitud para obtener el contenido del archivo users.json
// utilizando la función fetch().La palabra clave await hace que la ejecución de la función fetch() se detenga hasta que la promesa se resuelva.

// const users = await response.json();: El resultado de la solicitud anterior se convierte a formato JSON utilizando el
// método json().Esto devuelve otra promesa que resuelve el cuerpo de la respuesta como JSON.Usamos await para esperar la resolución de esta promesa.

// const aprendices = users.filter(user => user.aprendiz);: Se filtran los usuarios obtenidos del archivo JSON para
// seleccionar solo aquellos que tienen la propiedad aprendiz definida como true.Esto se hace utilizando el método filter().

// let repositoriosAprendices = [];: Se crea un array vacío llamado repositoriosAprendices que se utilizará para almacenar los repositorios de los aprendices.

// for(const aprendiz of aprendices) {: Se inicia un bucle for...of para iterar sobre cada objeto aprendiz en el array
// aprendices.

// const respuestaGithub = await fetch(https://api.github.com/users/${aprendiz.user}/repos`);`: Se realiza una solicitud
// para obtener los repositorios públicos del usuario aprendiz en GitHub. Se utiliza la interpolación de cadenas (${})
// para incluir el nombre de usuario del aprendiz en la URL de la solicitud.
    
// const repositorios = await respuestaGithub.json();: Los datos de la respuesta de GitHub se convierten a formato JSON
// utilizando el método json().
    
// Dentro del bucle, se realizan una serie de operaciones similares para filtrar, ordenar y procesar los repositorios
// de cada aprendiz.

// return repositoriosAprendices;: Se devuelve el array repositoriosAprendices, que contiene todos los repositorios de lo
// aprendices.
    
// } catch (error) {: Si ocurre un error dentro del bloque try, el código dentro del bloque catch se ejecutará.

// console.error('Error:', error);: Se imprime un mensaje de error en la consola, indicando el tipo de error que ocurrió.

// return[];: Se devuelve un array vacío en caso de error.

// const repositorios = await obtenerRepositorios();: Se llama a la función obtenerRepositorios() utilizando await, lo
// que detiene la ejecución del código hasta que la promesa devuelta por la función se resuelva.

// console.log('Todos los repositorios:');: Se imprime un mensaje indicando que se van a mostrar todos los repositorios
// en la consola.

// console.table(repositorios);: Se muestra en la consola una tabla con todos los repositorios obtenidos.La función
// console.table() muestra datos tabulares basados en un array de objetos.

// Filtrar los repositorios con menos de 5 elementos:
// const repositoriosMenosDe5 = repositorios.filter(repo => repo.public_repos < 5);
// console.log(`Repositorios de ${aprendiz.name} con menos de 5 repositorios:`);
// console.table(repositoriosMenosDe5);
// En esta parte, se utiliza el método filter() para crear un nuevo array repositoriosMenosDe5 que contiene solo los
// repositorios que tienen menos de 5 elementos (repo.public_repos representa la cantidad de repositorios públicos del
// usuario). Luego, se imprime en la consola el nombre del aprendiz y los repositorios filtrados en una tabla.

// Filtrar los repositorios que contienen la palabra JavaScript en su nombre:
// const repositoriosJavaScript = repositorios.filter(repo => repo.name.toLowerCase().includes('javascript'));
// console.log(`Repositorios de ${aprendiz.name} con la palabra "JavaScript" en su nombre:`);
// console.table(repositoriosJavaScript);
// Aquí, se utiliza filter() de nuevo para crear un nuevo array repositoriosJavaScript que contiene solo los repositorios
// cuyo nombre (convertido a minúsculas para hacer una comparación insensible a mayúsculas/minúsculas) contiene la palabra
// "JavaScript". Se imprime en la consola el nombre del aprendiz y los repositorios filtrados en una tabla.

// Ordenar los repositorios de menor a mayor según el nombre:
// repositorios.sort((a, b) => a.name.localeCompare(b.name));
// console.log(`Repositorios de ${aprendiz.name} ordenados alfabéticamente:`);
// console.table(repositorios);
// Aquí, se utiliza el método sort() para ordenar los repositorios alfabéticamente según el nombre. Se imprime en la
// consola el nombre del aprendiz y los repositorios ordenados en una tabla.

// Filtrar los repositorios que tienen más de cinco letras en su nombre:
// const repositoriosMasDe5Letras = repositorios.filter(repo => repo.name.length > 5);
// console.log(`Repositorios de ${aprendiz.name} con nombres que tienen más de cinco letras:`);
// console.table(repositoriosMasDe5Letras);
// En esta parte, nuevamente se utiliza filter() para crear un nuevo array repositoriosMasDe5Letras que contiene solo los
// repositorios cuyo nombre tiene más de cinco letras. Se imprime en la consola el nombre del aprendiz y los repositorios
// filtrados en una tabla.