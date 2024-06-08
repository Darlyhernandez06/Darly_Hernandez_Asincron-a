// 5. Lea el archivo user.json y transforme todos los nombres a mayúsculas 
// (recorra usuario por usuario) validando que solo se permita ingresar letras mayúsculas (se valida con un proxy) 
// a. Modifique solo los usuarios que tengan el rol aprendiz en true 
// b. Modifique solo los usuarios que más de dos nombres ejemplo (John Becerra) 
// c. Modifique solo los usuarios que contenga la palabra ADSO en su user

// EXPLICACION DEL CODIGO LINEA POR LINEA 

// Función para validar si una cadena contiene solo letras mayúsculas
// Expresión regular que verifica si la cadena contiene solo letras mayúsculas
// Utilizamos el método test() de la expresión regular para verificar si la cadena cumple con el patrón
const esMayuscula = (cadena) => /^[A-Z]+$/.test(cadena);

// Proxy para validar las modificaciones en los objetos
// proxyValidacion: Es el nombre de la variable que almacena el objeto proxy que se va a crear.
// new Proxy({}): Es la sintaxis para crear un nuevo objeto proxy. El primer argumento ({}) especifica el objeto target inicial, que en este caso es un objeto vacío.
const proxyValidacion = new Proxy({}, {
    // set: Es una propiedad del objeto handler que define la acción a realizar cuando se intenta establecer una propiedad en el objeto proxy.
    // function(obj, prop, value): Es una función que toma tres parámetros:
    // obj: Es el objeto envuelto por el proxy, también conocido como target.
    // prop: Es la propiedad que se está intentando establecer en el objeto proxy.
    // value: Es el nuevo valor que se intenta asignar a la propieda
  set: function(obj, prop, value) {
    // Verificar si la propiedad es 'name' y el valor es una cadena de texto

    // if (prop === 'name' && typeof value === "string"): Esta línea verifica dos condiciones:
    // prop === 'name': Verifica si la propiedad que se está intentando establecer es "name". 
    // Esto se hace mediante una comparación de igualdad (===).
    // typeof value === "string": Verifica si el valor asociado a la propiedad es una cadena 
    // de texto. typeof value devuelve el tipo de datos de value, y la condición compara si 
    // es igual a "string".
    // if (!esMayuscula(value)): Dentro del bloque condicional anterior, esta línea llama a 
    // la función esMayuscula(value). Si esta función devuelve false, significa que el valor 
    // no consiste únicamente en letras mayúsculas.
    // console.error('Error: Solo se permiten letras mayúsculas.'): Si el valor no consiste 
    // únicamente en letras mayúsculas, se imprime un mensaje de error en la consola indicando 
    // que solo se permiten letras mayúsculas.
    // return false;: Esta línea devuelve false para indicar que se rechaza el cambio en la 
    // propiedad. Esto significa que la propiedad no se establecerá en el objeto proxy y la
    // operación de asignación se abortará.
    if (prop === 'name' && typeof value === 'string') {
      // Si el valor no es una cadena de letras mayúsculas, mostrar un error y rechazar el cambio
      if (!esMayuscula(value)) {
        console.error('Error: Solo se permiten letras mayúsculas.');
        return false;
      }
    }
    // Permitir la asignación de otras propiedades y valores
    // Reflect.set: Reflect es un objeto incorporado en JavaScript que proporciona métodos para
    // realizar operaciones en objetos. Reflect.set es un método que permite establecer el valor
    // de una propiedad en un objeto.
    // (...arguments): La sintaxis de los parámetros de descanso (...) se utiliza para 
    // representar un número indefinido de argumentos como un array. En este contexto, arguments
    // es un objeto similar a un array que contiene los argumentos pasados a la función actual.
    return Reflect.set(...arguments);
  }
});

// Leer el archivo users.json y procesar los datos
fetch("user.json")
  // Convertir la respuesta a formato JSON
  // then: Esta función es parte de la Promesa devuelta por la función fetch. Se ejecuta cuando
  // la Promesa se resuelve, lo que significa que se ha recibido una respuesta HTTP del servidor.
  // response => response.json(): Esto es una función de flecha que toma la respuesta obtenida 
  // de la solicitud HTTP (response) y la convierte en formato JSON utilizando el método .json().
  // La respuesta inicialmente está en formato JSON, por lo que necesitamos este paso para convertirla 
  // en un objeto JavaScript que podamos manipular fácilmente.
  .then(response => response.json())
  // Manipular los datos obtenidos
  // .then(): Es un método de las Promesas en JavaScript que se utiliza para manejar el 
  // resultado exitoso de una promesa. En este caso, espera a que la promesa devuelta por 
  // fetch("user.json") se resuelva con éxito.
  // usuarios => { ... }: Es una función de flecha que se pasa como argumento a .then(). Recibe
  // el resultado de la promesa anterior (en este caso, los datos del archivo "user.json") y 
  // realiza alguna operación con esos datos.
  .then(usuarios => {
    // Recorrer cada usuario
    // Itera sobre cada usuario en el arreglo de usuarios obtenido del archivo "user.json".
    // Aquí se define una función anónima que recibe un parámetro llamado "usuario".
    // Esto significa que para cada elemento en el arreglo de usuarios, esta función se ejecutará.
    // El parámetro "usuarios" representa un objeto que contiene información sobre un usuario específico.
    usuarios.forEach(usuario => {
      // a. Modificar solo los usuarios que tengan el rol aprendiz en true
      // Esta línea verifica si la propiedad "aprendiz" del objeto "usuario" tiene un valor verdadero.
      // Si la propiedad "aprendiz" es verdadera, el código dentro de este bloque se ejecutará.
      // De lo contrario, si la propiedad "aprendiz" es falsa o no está definida, este bloque no se ejecutará.
      if (usuario.aprendiz) {
        // b. Modificar solo los usuarios que tengan más de dos nombres
        // Esta línea divide el nombre del usuario en un array utilizando el espacio como delimitador y luego cuenta el número de elementos en ese array.
        // Si el nombre del usuario contiene más de dos palabras (es decir, si el array tiene más de dos elementos), el código dentro de este bloque se ejecutará.
        // De lo contrario, si el nombre del usuario contiene dos palabras o menos, este bloque no se ejecutará.
        // split(' ') se utiliza para dividir una cadena en un array de subcadenas, utilizando un separador especificado.
        if (usuario.name.split(' ').length > 2) {
          // Modificar solo los usuarios que cumplen las condiciones, convirtiendo el nombre a mayúsculas
          usuario.name = new Proxy(usuario.name.toUpperCase(), proxyValidacion);
          // usuario.name.toUpperCase(): Convierte el nombre del usuario a mayúsculas.
          // new Proxy(..., proxyValidacion): Crea un nuevo objeto Proxy alrededor del nombre convertido a mayúsculas.
          // proxyValidacion: Es el Proxy utilizado para validar las modificaciones. Este Proxy tiene un método set que verifica si se están cumpliendo ciertas condiciones antes de permitir la asignación de propiedades.
        }
      }
      // c. Modificar solo los usuarios que contengan la palabra "ADSO" en su user
      // usuario.user.includes('ADSO'): Esta condición verifica si la cadena del nombre de usuario (usuario.user) contiene la subcadena "ADSO". 
      // includes() es un método de cadena que devuelve true si la cadena contiene la subcadena especificada, de lo contrario, devuelve false.
      if (usuario.user.includes('ADSO')) {
        // Modificar solo los usuarios que cumplen las condiciones, convirtiendo el nombre de usuario a mayúsculas
        // usuario.user.toUpperCase(): Convierte el nombre de usuario a mayúsculas utilizando el método toUpperCase(). Esto garantiza uniformidad en el procesamiento y comparaciones de texto.
        //new Proxy(usuario.user.toUpperCase(), proxyValidacion): Crea un nuevo objeto Proxy que envuelve el nombre de usuario convertido a mayúsculas.
        usuario.user = new Proxy(usuario.user.toUpperCase(), proxyValidacion);
      }
    });
    // Mostrar los usuarios modificados en la consola
    console.log(usuarios);
  })
  // Capturar y manejar cualquier error que ocurra durante el proceso
  .catch(error => {
    console.error('Error:', error);
  });

