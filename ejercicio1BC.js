// B. Solucione el mismo ejercicio, utilizando solo promesas no async/await.
// C. Describa el paso a paso del ejercicio (comente cada línea de código)



// // Aqui se esta definiendo una funcion de flecha y esta es una funcion expresada, esta tomando un parámetro "x" y verifica si el nombre del objeto "x" es estrictamente igual a "Evaluacion" y devuelve true si el nombre del objeto "x" es "Evaluacion" de lo contrario, devuelve false 
// const filtrar = x => x.name === "Evaluacion";

// // Aqui se realizar la solicitud para obtener el contenido del archivo JSON "user.json"
// fetch('user.json') // la función fetch para realizar una solicitud HTTP GET al archivo user.json, ademas fetch devuelve una promesa que representa la respuesta de la solicitud HTTP.
  
//   .then(response => response.json()) // Aqui se convierte la repuesta a formato JSON, Una vez que la solicitud se complete, se ejecuta esta función de callback. response es el objeto Response que representa la respuesta del servidor. response.json() es un método que devuelve una promesa que se resuelve con los datos en formato JSON de la respuesta. 

//   .then(user => fetch(`https://api.github.com/users/${user.name}/repos`)) //Utilizar el nombre obtenido para hacer una solicitud a la API de GitHub y obtener los repositorios del usuario, Después de que la respuesta se convierte a JSON, se utiliza la información obtenida(user) para construir una URL para hacer una nueva solicitud.Esta línea hace una solicitud a la API de GitHub para obtener los repositorios del usuario cuyo nombre se obtuvo del archivo user.json.
  
//   // ENCADENANDO PROMESAS 

//   .then(respuestaGithub => respuestaGithub.json()) // Aqui lo que va hacer es convertir la repuesta que se obtenio de la APi de Github a formato JSON, se convierte a JSON utilizando el método json() de la respuesta. Esto es necesario para acceder a los datos de la respuesta en un formato que JavaScript pueda manejar fácilmente.

//   .then(usuariogithub => { // Después de que la respuesta de la API de GitHub se convierte a JSON, este bloque de código se ejecuta. usuariogithub es un objeto que representa los repositorios del usuario en GitHub en formato JSON.

//     // Se itera sobre cada repositorio del usuario en GitHub. Si el nombre del repositorio es "Evaluacion", se imprime en la consola
//     usuariogithub.forEach(element => {
//       if (element.name === "Evaluacion") { // Verificar si el nombre del repositorio es estrictamente igual a "Evaluacion"
//         console.log(element); // Imprimir el repositorio si el nombre coincide con "Evaluacion"
//       }
//     });

//     let data = usuariogithub.filter(filtrar); // Filtrar los repositorios para obtener solo aquellos con el nombre "Evaluacion"

//     console.log(data); // Imprimir los repositorios filtrados, Se imprime en la consola los repositorios filtrados.

//     console.log(usuariogithub); // Imprimir todos los repositorios del usuario en GitHub.
//   })
//   .catch(error => { // Manejar cualquier error que ocurra durante el proceso
//   console.error('Error:', error); // Si ocurre algún error durante cualquiera de los pasos anteriores, este bloque de código se ejecutará. error contiene información sobre el error que ocurrió. Aquí se imprime el error en la consola.
// });


const filtrar = x => x.name === "Evaluacion";

fetch('user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}/repos`))
  .then(respuestaGithub => respuestaGithub.json())
  .then(usuariogithub => {
    usuariogithub.forEach(element => {
      if (element.name === "Evaluacion") {
        console.log(element);
      }
    });

    let data = usuariogithub.filter(filtrar);
    console.log(data);
    console.log(usuariogithub);
  })
  .catch(error => {
    console.error('Error:', error); 
});

  









 