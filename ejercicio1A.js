// 1. Basados en las imágenes solucionar los siguientes puntos:
// A. Describa el paso a paso del ejercicio (comente cada línea de código).



// Aqui se esta definiendo una funcion de flecha y esta es una funcion expresada, esta tomando un parámetro "x" y verifica si el nombre del objeto "x" es estrictamente igual a "Evaluacion" y devuelve true si el nombre del objeto "x" es "Evaluacion" de lo contrario, devuelve false
const filtrar = x => x.name === "Evaluacion";

// Aqui esta definiendo una funcion Asincrona anonima autoejecutable utilizando una funcion de flecha, esta funcion se esta utilizando para el proceso de obtencion de datos de manera asincrona
(async () => {
  // LEER ARCHIVO JSON
  let response = await fetch("user.json") // En el codigo vemos un "fetch" y este se esta utilizando para obtener recursos de la red, como lo son los archivos json, desde un servidor web y aqui es para obtener el contenido del archivo JSON "user.json" desde el servidor, La función "fetch" devuelve una promesa que resuelve en una respuesta a la solicitud, Se utiliza "await" para esperar la respuesta de la solicitud antes de continuar con la ejecución del código, Después, se utiliza el método .json()' para convertir la respuesta en un objeto JavaScript que representa los datos del archivo JSON, La respuesta se almacena en la variable 'response', que representa la respuesta de la solicitud.

  let user = await response.json(); // "response.json()'"" devuelve otra promesa que resuelve en el objeto JavaScript con los datos del archivo JSON, Se utiliza 'await' nuevamente para esperar la conversión antes de continuar con la ejecución del código, El objeto JavaScript resultante se almacena en la variable 'user', que contiene los datos del archivo JSON.
  
  // CONSULTAR USUARIO GITHUB
  let respuestaGithub = await fetchfetch(`https://api.github.com/users/${user.name}/repos`); // Se esta utilizando una funcion "fetch" para hacer una solicitud HTTP a la API de Github y obtener los repositorios del usuario, La URL de la solicitud se construye utilizando el nombre de usuario obtenido previamente del archivo JSON, La palabra "await" se utiliza para esperar la respuesta de la solicitud antes de continuar con la ejecución del código, La respuesta se almacena en la variable "respuestaGithub", que representa la respuesta de la solicitud.

  let usuariogithub = await respuestaGithub.json(); // Después de obtener la respuesta, se utiliza el método ".json()"" para convertir la respuesta en un objeto JavaScript y aqui nuevamente, se utiliza "await" para esperar que la conversión se complete antes de continuar, el objeto JavaScript resultante se almacena en la variable "usuariogithub", que contiene los repositorios del usuario en formato JavaScript.

  // Aqui se va iterar sobre cada repositorio del usuario de GitHub
  usuariogithub.forEach(element => { // Se utiliza un bucle forEach para iterar sobre cada repositorio en "usuariogithub", "element" representa cada repositorio en cada iteracion del bucle.

    //Aqui con la condicional esta comprobando si el nombre el repositorio es estrictamente igual a "Evaluacion" y se compara el nombre con cada repositorio 
    if (element.name === "Evaluacion") { // Si el nombre del repositorio es "Evaluacion", se ejecuta el bloque de código dentro del condicional.
    
      // Imprimir el repositorio si cumple la condicion 
      console.log(element) // Se imprime el repositorio que cumple con la condicion 
    }
  });

  // Filtrar los repositorios usando la función `filtrar`
  // let data = usuariogithub.filter(filtrar) // Se utiliza el método 'filter()' en el array 'usuariogithub' para filtrar los repositorios utilizando la función 'filtrar' definida anteriormente, El resultado del filtrado se almacena en la variable 'data'.

  // Imprimir los repositorios filtrados
  // console.log(data) //Se imprime en la consola los repositorios filtrados que cumplen con la condición especificada por la función "filtrar".

  // Imprimir todos los repositorios del usuario de GitHub
  // console.log(usuariogithub) // Se imprime en la consola todos los repositorios del usuario de GitHub, incluidos los que no cumplen con la condición de filtrado.

})();
// La función Asincrona anonima autoejecutable, se ejecuta inmediatamente después de ser definida debido a los paréntesis finales "()"".

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  















