// 1. Basados en las imágenes solucionar los siguientes puntos:
// A. Describa el paso a paso del ejercicio (comente cada línea de código).

// EXPLICACION DEL CODIGO LINEA POR LINEA 

// Definición una constante llamada "filtrar" que es una función de flecha que toma un parámetro "x", 
// representa un objeto del array que se va a itera.
// Verifica si la propiedad "name" del objeto "x" es estrictamente igual a "Evaluacion".
// x.name accede a la propiedad name del objeto x.
// En JavaScript, cuando tienes un objeto, puedes acceder a sus propiedades usando la notación de punto (.).
// Si es así, devuelve "true"; de lo contrario, devuelve "false".
// Esta es una función expresada, ya que se define como parte de una expresión de asignación.
// Función expresada: Una función que se asigna a una variable.
const filtrar = x => x.name === "Evaluacion";

// Definición de una función asincrónica anónima autoejecutable usando una función de flecha.
// Las funciones autoejecutables se llaman inmediatamente después de ser definidas.
(async () => {
  // LEER ARCHIVO JSON
  // Declaración de la variable "response" para almacenar la respuesta de la solicitud "fetch".
  // "fetch" se utiliza para realizar una solicitud HTTP (Una solicitud HTTP es una comunicación entre un cliente
  // y un servidor en la web.) y obtener el contenido del archivo JSON "user.json" desde el servidor.
  // Devuelve una promesa que se resuelve con la respuesta de la solicitud.
  // "await" se usa para esperar que la promesa se resuelva antes de continuar con la ejecución del código.

  // esta línea realiza una solicitud HTTP de manera asíncrona para obtener el contenido del archivo JSON 
  // "user.json" y espera a que la solicitud se complete antes de continuar con la ejecución del código. 
  // Una vez que la solicitud se resuelve, la respuesta se asigna a la variable response para su posterior 
  // procesamiento
  let response = await fetch("user.json");
  
  // Declaración de la variable "user" para almacenar el objeto JavaScript resultante de la conversión del JSON.
  // "response.json()"" devuelve una promesa que se resuelve con el objeto JavaScript.
  // "await" se usa nuevamente para esperar la conversión antes de continuar con la ejecución del código.
  // response.json() convierte los datos obtenidos de la respuesta HTTP en un formato que JavaScript puede 
  // manejar fácilmente, es decir, en un objeto JavaScript que se pueda usar en el código.
  // y es el objeto que contiene toda la información de la respuesta de una solicitud HTTP, se utiliza
  // para acceder y manejar los datos de la respuesta en el código JavaScript.
  let user = await response.json();
  
  // CONSULTAR USUARIO GITHUB
  // Declaración de la variable "respuestaGithub" para almacenar la respuesta de la solicitud "fetch".
  // Realiza una solicitud HTTP a la API de GitHub para obtener los repositorios del usuario cuyo nombre se obtiene
  // del JSON anterior.
  // La URL de la solicitud se construye utilizando la propiedad "name" del objeto "user".
  // "await" se usa para esperar que la promesa se resuelva antes de continuar.

  // URL de la API de GitHub: Se utiliza la URL base de la API de GitHub https://api.github.com/users/,
  // seguida del nombre de usuario del usuario que se está solicitando, y luego /repos para obtener la lista 
  // de repositorios del usuario.
  // Interpolación: ${user.name} se sustituye con el nombre de usuario del objeto user.
  // La función fetch() realiza una solicitud HTTP a la URL construida.
  // La función fetch() devuelve una promesa que se resuelve con la respuesta de la solicitud HTTP.
  // Una API es una forma estandarizada de permitir que diferentes aplicaciones se comuniquen entre sí y accedan 
  // a funcionalidades específicas de manera segura y eficiente.
  let respuestaGithub = await fetch(`https://api.github.com/users/${user.name}/repos`);
  
  // Declaración de la variable "usuariogithub" para almacenar el objeto JavaScript resultante de la conversión del JSON.
  // "respuestaGithub.json()"" devuelve una promesa que se resuelve con el objeto JavaScript.
  // "await" se usa para esperar la conversión antes de continuar con la ejecución del código.
  let usuariogithub = await respuestaGithub.json();
  
  // Iteración sobre cada repositorio del usuario de GitHub usando "forEach".
  // "usuariogithub" es un array que contiene los repositorios del usuario.
  // "forEach" es un método de los arrays que ejecuta una función para cada elemento del array.
  // Es un método útil para iterar sobre elementos de un array y realizar acciones específicas para cada elemento.
  usuariogithub.forEach(element => {
    // "element" representa cada repositorio en cada iteración del bucle.
    // "element" es un parámetro de la función de flecha (=>) que toma cada elemento del array "usuariogithub" 
    // durante la iteración.

    // Comprobación si el nombre del repositorio ("element.name") es estrictamente igual a "Evaluacion".
    if (element.name === "Evaluacion") {
      // Si el nombre del repositorio es "Evaluacion", se imprime en la consola.
      console.log(element);
    }
  });

  // Filtramos los repositorios usando la función "filtrar".
  //   let data = usuariogithub.filter(filtrar); // "filter" es un método de los arrays que crea un nuevo array 
  // con todos los elementos que cumple una condicion especifica.
  // En este caso, la función proporcionada es "filtrar", definida anteriormente.
  // El resultado del filtrado se almacena en la variable "data".

  // Imprimimos los repositorios filtrados que cumplen con la condición especificada por la función "filtrar".
  //   console.log(data); // Imprime el contenido de "data" en la consola.

  // Imprimimos todos los repositorios del usuario de GitHub, incluidos los que no cumplen con la condición de 
  // filtrado.
  //   console.log(usuariogithub); // Imprime el contenido de "usuariogithub" en la consola.

})(); // La función asincrónica anónima se ejecuta inmediatamente después de ser definida debido a los paréntesis
// finales `()`.

// Explicación adicional:

// La función asincrónica anónima es útil para encapsular el código asincrónico y ejecutarlo inmediatamente.
// `await` se utiliza dentro de funciones asincrónicas para esperar la resolución de promesas, permitiendo que el
// código asincrónico se escriba de manera más síncrona.

// En una operación sincrónica, el código espera hasta que la tarea se complete antes de continuar. 
// En una operación asincrónica, el código puede continuar ejecutándose mientras espera que la tarea se complete.
// fetch() devuelve una promesa para manejar este tipo de operaciones asincrónicas, permitiendo que el código 
// continúe ejecutándose mientras espera la respuesta de la solicitud HTTP.
  
  
  
  
  
  
  
  
  
  















