// 3. Basado en la solución del punto 2, transforme esta solución utilizando async/await
// a. muestre los repositorios públicos de cada aprendiz en consola.
// b. Una todos los resultados en un solo arreglo
// c. Filtre la consulta con solo los aprendices que tengan el rol de aprendiz, esta solución se deba dar antes de realizar la solicitud al api.

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
            
        // Mostrar los repositorios públicos del aprendiz en consola
        console.log(`Repositorios de ${aprendiz.name}:`); // Respuesta a la parte a)
        console.table(repositorios); // Respuesta a la parte a)
    
        // Agregar los repositorios del aprendiz al arreglo general
        repositoriosAprendices = [...repositoriosAprendices, ...repositorios]; // Respuesta a la parte b)
        }
    
        // Retornar todos los repositorios en un solo arreglo
        return repositoriosAprendices;
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

