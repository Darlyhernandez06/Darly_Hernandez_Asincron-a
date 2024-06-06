// B. Solucione el mismo ejercicio, utilizando solo promesas no async/await.
// C. Describa el paso a paso del ejercicio (comente cada línea de código)



// // Aquí se está definiendo una función de flecha que es una función expresada. Esta toma un parámetro "x" y verifica si el nombre del objeto "x" es estrictamente igual a "Evaluacion". Devuelve true si el nombre del objeto "x" es "Evaluacion"; de lo contrario, devuelve false.
const filtrar = x => x.name === "Evaluacion";

fetch("user.json") // La función fetch realiza una solicitud HTTP GET al archivo user.json. Además, fetch devuelve una promesa que representa la respuesta de la solicitud HTTP.
  .then(response => response.json()) // Aquí se convierte la respuesta a formato JSON. Una vez que la solicitud se completa, se ejecuta esta función de callback. response es el objeto Response que representa la respuesta del servidor. response.json() es un método que devuelve una promesa que se resuelve con los datos en formato JSON de la respuesta.
  .then(data => {
    // Iterar sobre todos los usuarios
    data.users.forEach(user => {
      fetch(`https://api.github.com/users/${user.user}/repos`) // Utilizar el nombre obtenido para hacer una solicitud a la API de GitHub y obtener los repositorios del usuario. Después de que la respuesta se convierte a JSON, se utiliza la información obtenida (user) para construir una URL para hacer una nueva solicitud. Esta línea hace una solicitud a la API de GitHub para obtener los repositorios del usuario cuyo nombre se obtuvo del archivo user.json.
        .then(respuestaGithub => respuestaGithub.json()) // Aquí se convierte la respuesta obtenida de la API de GitHub a formato JSON, utilizando el método json() de la respuesta. Esto es necesario para acceder a los datos de la respuesta en un formato que JavaScript pueda manejar fácilmente.
        .then(usuariogithub => { // Después de que la respuesta de la API de GitHub se convierte a JSON, este bloque de código se ejecuta. usuariogithub es un objeto que representa los repositorios del usuario en GitHub en formato JSON.

          // Se itera sobre cada repositorio del usuario en GitHub. Si el nombre del repositorio es "Evaluacion", se imprime en la consola.
          usuariogithub.forEach(element => {
            if (element.name === "Evaluacion") { // Verificar si el nombre del repositorio es estrictamente igual a "Evaluacion".
              console.log(element); // Imprimir el repositorio si el nombre coincide con "Evaluacion".
            }
          });

          let data = usuariogithub.filter(filtrar); // Filtrar los repositorios para obtener solo aquellos con el nombre "Evaluacion".

          console.table(data); // Imprimir los repositorios filtrados. Se imprime en la consola los repositorios filtrados.

          console.table(usuariogithub); // Imprimir todos los repositorios del usuario en GitHub.
        })
        .catch(error => { // Manejar cualquier error que ocurra durante el proceso.
          console.error('Error:', error); // Si ocurre algún error durante cualquiera de los pasos anteriores, este bloque de código se ejecutará. error contiene información sobre el error que ocurrió. Aquí se imprime el error en la consola.
        });
    });
})
