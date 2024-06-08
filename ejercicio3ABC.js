// 3. Basado en la solución del punto 2, transforme esta solución utilizando async/await
// a. muestre los repositorios públicos de cada aprendiz en consola.
// b. Una todos los resultados en un solo arreglo
// c. Filtre la consulta con solo los aprendices que tengan el rol de aprendiz, esta solución se deba dar antes de realizar la solicitud al api.

// EXPLICACION DEL CODIGO LINEA POR LINEA 

// Define una función de flecha expresada que es asíncrona.
const obtenerRepositorios = async () => {
    // el código está dentro de un bloque try-catch para manejar cualquier error que pueda
    // ocurrir durante el proceso
    try {
        // Hacer una solicitud para obtener el contenido del archivo users.json
        const response = await fetch("user.json"); 
        // La función fetch realiza una solicitud HTTP GET al archivo user.json.
        // La palabra clave await se utiliza para esperar la respuesta de la solicitud 
        // antes de continuar con la ejecución del código. La función fetch() devuelve 
        // una promesa que eventualmente se resolverá con la respuesta del servidor.
        // El resultado de la solicitud es almacenado en la variable response.

        const data = await response.json(); 
        // Se convierte la respuesta a formato JSON.
        // El método json() es un método del objeto Response que devuelve una promesa que
        // eventualmente se resuelve con los datos de la respuesta en formato JSON.
        // Esto se hace utilizando el método json() del objeto Response.
        // El operador await se utiliza para esperar a que esta promesa se resuelva, 
        // lo que significa que la ejecución del código se detiene hasta que la conversión
        // a JSON se complete.
        // Los datos convertidos a JSON son almacenados en la variable data.

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
        const aprendices = data.users.filter(user => user.aprendiz); // Respuesta a la parte c)
        // Se filtran los usuarios que son aprendices.
        // Esto se hace utilizando el método filter() en el array de usuarios (data.users).
        // La función de filtrado comprueba si la propiedad "aprendiz" de cada usuario es verdadera.
        // El resultado del filtrado se asigna a la variable aprendices.

        // Crear un arreglo para almacenar los repositorios de cada aprendiz.
        // La variable "repositoriosAprendices" se inicializa como un arreglo vacío.
        let repositoriosAprendices = [];

        // Iterar sobre cada aprendiz.
        // Este bucle for se utiliza para iterar sobre cada aprendiz almacenado en el 
        // array aprendices. La variable aprendiz representará a cada uno de los aprendices
        // en cada iteración del bucle.
        for (const aprendiz of aprendices) {
            // Hacer una solicitud para obtener los repositorios públicos del aprendiz en GitHub.
            const respuestaGithub = await fetch(`https://api.github.com/users/${aprendiz.user}/repos`);
            // Se hace una solicitud HTTP GET a la API de GitHub para obtener los repositorios públicos del aprendiz.
            // La URL de la solicitud se construye utilizando el nombre de usuario del aprendiz (aprendiz.user).
            // Dentro del bucle, se utiliza la función fetch() para hacer una solicitud HTTP GET a la
            // API de GitHub. La URL de la solicitud se construye utilizando el nombre de usuario del aprendiz (aprendiz.user), 
            // que se espera que sea el nombre de usuario de GitHub. La palabra clave await se utiliza para esperar la respuesta de la 
            // solicitud antes de continuar con la ejecución del código.

            const repositorios = await respuestaGithub.json();
            // Se convierte la respuesta a formato JSON.
            // Esto se hace utilizando el método json() del objeto Response.
            // El método json() es un método del objeto Response que devuelve una promesa que eventualmente se 
            // resuelve con los datos de la respuesta en formato JSON.
            // El operador await se utiliza para esperar a que esta promesa se resuelva, lo que significa que la 
            // ejecución del código se detiene hasta que la conversión a JSON se complete.
            // Los datos convertidos a JSON se asignan a la variable repositorios.

            // Mostrar los repositorios públicos del aprendiz en consola.
            // Esto inserta dinámicamente el nombre del aprendiz actual en el mensaje de la consola
            console.log(`Repositorios de ${aprendiz.name}:`); // Respuesta a la parte a)
            // Se imprime el nombre del aprendiz.
            console.table(repositorios); // Respuesta a la parte a)
            // Se imprime una tabla con los repositorios del aprendiz.

            // Agregar los repositorios del aprendiz al arreglo general.
            // repositoriosAprendices: Esta variable almacena todos los repositorios de los aprendices. 
            repositoriosAprendices = [...repositoriosAprendices, ...repositorios]; // Respuesta a la parte b)
            // Se utilizan los operadores de propagación (...) para agregar los repositorios del aprendiz al arreglo general.
            // Asigna el nuevo array resultante de la concatenación de repositorios a la variable repositoriosAprendices. Esto asegura que 
            // repositoriosAprendices contenga todos los repositorios de todos los aprendices iterados hasta el momento.
        }

        // Retornar todos los repositorios en un solo arreglo.
        return repositoriosAprendices;
        // Se retorna el arreglo con todos los repositorios de los aprendices.
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante el proceso.
        console.error('Error:', error);
        // Se imprime cualquier error que ocurra.
        return [];
        // Devolver un arreglo vacío en caso de error.
    }
};

// Llamar a la función obtenerRepositorios y utilizar async/await para manejar la respuesta, función flecha autoinvocada asíncrona.
(async () => {
    // Esperar a que se resuelva la función obtenerRepositorios y almacenar el resultado en la variable repositorios.
    const repositorios = await obtenerRepositorios();
    // Se llama a la función obtenerRepositorios y se espera su resolución.
    // Los repositorios obtenidos se almacenan en la variable repositorios.

    // Imprimir en la consola todos los repositorios obtenidos.
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

