// B. Solucione el mismo ejercicio, utilizando solo promesas no async/await.
// C. Describa el paso a paso del ejercicio (comente cada línea de código)

// EXPLICACION DEL CODIGO LINEA POR LINEA 

// Aquí se está definiendo una función de flecha que es una función expresada.
// Esta toma un parámetro "x" y verifica si el nombre del objeto "x" es estrictamente igual a "Evaluacion".
// Devuelve true si el nombre del objeto "x" es "Evaluacion"; de lo contrario, devuelve false.
// lo mismo que la explicacion anterior
const filtrar = x => x.name === "Evaluacion";

// La función fetch realiza una solicitud HTTP GET al archivo user.json.
// Además, fetch devuelve una promesa que representa la respuesta de la solicitud HTTP.
fetch("user.json")
  // Aquí se convierte la respuesta a formato JSON.
  // Una vez que la solicitud se completa, se ejecuta esta función de callback.
  // "response" es el objeto Response que representa la respuesta del servidor.
  // response.json() es un método que devuelve una promesa que se resuelve con los datos en formato JSON de la 
  // respuesta.

  // .then(response => response.json()): Este método se encadena después de la llamada a fetch("user.json"). 
  // Cuando la promesa devuelta por fetch() se resuelve (es decir, cuando se recibe la respuesta HTTP del servidor)
  // esta línea se ejecuta. Toma la respuesta HTTP (response) y utiliza el método json() para convertir los datos
  // de la respuesta en formato JSON. La función de flecha response => response.json() se proporciona como 
  // argumento a .then(). Esto significa que response.json() se ejecutará una vez que response esté disponible.
  
  // .then(data => { ... }: Después de que se resuelve la promesa devuelta por .then(response => response.json()), 
  // este método .then() se encadena. Recibe los datos convertidos a JSON (data) que se obtuvieron en el paso 
  // anterior. La función de flecha data => { ... } se proporciona como argumento a .then().
  .then(response => response.json())
  .then(data => {
    // Iterar sobre todos los usuarios
    // data.users: Hace referencia a la matriz de usuarios dentro del objeto data. Esto asume que la respuesta 
    // JSON tiene una estructura donde hay una propiedad llamada users que contiene una matriz de usuarios.
    // .forEach(user => { ... }): Utiliza el método forEach() para iterar sobre cada elemento de la matriz de 
    // usuarios. En cada iteración, se ejecuta una función de flecha que toma un parámetro user, que representa 
    // cada usuario en la matriz.
    // { ... }: El código dentro de estas llaves representa lo que se ejecutará en cada iteración del bucle 
    // forEach().
    data.users.forEach(user => {
      // Utilizar el nombre obtenido para hacer una solicitud a la API de GitHub y obtener los repositorios del
      // usuario.
      // Después de que la respuesta se convierte a JSON, se utiliza la información obtenida (user) para construir 
      // una URL para hacer una nueva solicitud.
      // Esta línea hace una solicitud a la API de GitHub para obtener los repositorios del usuario cuyo nombre se
      // obtuvo del archivo user.json.
      fetch(`https://api.github.com/users/${user.user}/repos`)
        // Aquí se convierte la respuesta obtenida de la API de GitHub a formato JSON,
        // utilizando el método json() de la respuesta.
        // Esto es necesario para acceder a los datos de la respuesta en un formato que JavaScript pueda manejar 
        // fácilmente.
        .then(respuestaGithub => respuestaGithub.json())
        // Después de que la respuesta de la API de GitHub se convierte a JSON, este bloque de código se ejecuta.
        // "usuariogithub" es un objeto que representa los repositorios del usuario en GitHub en formato JSON.
        .then(usuariogithub => {
          // Se itera sobre cada repositorio del usuario en GitHub.
          // Si el nombre del repositorio es "Evaluacion", se imprime en la consola.
          // Iteración sobre cada repositorio del usuario de GitHub usando "forEach".
          // "usuariogithub" es un array que contiene los repositorios del usuario.
          // "forEach" es un método de los arrays que ejecuta una función para cada elemento del array.
          // Es un método útil para iterar sobre elementos de un array y realizar acciones específicas para cada 
          // elemento.
          usuariogithub.forEach(element => {
             // "element" representa cada repositorio en cada iteración del bucle.
             // "element" es un parámetro de la función de flecha (=>) que toma cada elemento del array "usuariogithub" 
            // durante la iteración.
            if (element.name === "Evaluacion") {
              // Verificar si el nombre del repositorio es estrictamente igual a "Evaluacion".
              console.log(element); // Imprimir el repositorio si el nombre coincide con "Evaluacion".
            }
          });

          // Filtrar los repositorios para obtener solo aquellos con el nombre "Evaluacion".
          let data = usuariogithub.filter(filtrar);
          // Imprimir los repositorios filtrados.
          // Se imprime en la consola los repositorios filtrados.
          console.table(data);

          // Imprimir todos los repositorios del usuario en GitHub.
          console.table(usuariogithub);
        })
        // Manejar cualquier error que ocurra durante el proceso.
        .catch(error => {
          // Si ocurre algún error durante cualquiera de los pasos anteriores, este bloque de código se ejecutará.
          // "error" contiene información sobre el error que ocurrió.
          // Aquí se imprime el error en la consola.
          console.error('Error:', error);
        });
    });
})
