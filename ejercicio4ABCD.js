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
