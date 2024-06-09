// 5. Lea el archivo user.json y transforme todos los nombres a mayúsculas 
// (recorra usuario por usuario) validando que solo se permita ingresar letras mayúsculas (se valida con un proxy) 
// a. Modifique solo los usuarios que tengan el rol aprendiz en true 
// b. Modifique solo los usuarios que más de dos nombres ejemplo (John Becerra) 
// c. Modifique solo los usuarios que contenga la palabra ADSO en su user

// EXPLICACION DEL CODIGO LINEA POR LINEA 

// Función para validar si una cadena contiene solo letras mayúsculas.
// Expresión regular que verifica si la cadena contiene solo letras mayúsculas.
// Utilizamos el método test() de la expresión regular para verificar si la cadena cumple con el patrón.
// ^: Indica el inicio de la cadena
// [ ]: Define un conjunto de caracteres permitidos.
// A-Z: Dentro del conjunto, indica que se permiten todas las letras mayúsculas del alfabeto (de la A a la Z).
// \s: Representa cualquier espacio en blanco (incluyendo espacios, tabulaciones, saltos de línea, etc.).
// +: Un cuantificador que indica que el conjunto definido debe aparecer al menos una vez, pero puede repetirse indefinidamente (una o más veces).
// $: Indica el final de la cadena. Esta parte asegura que la cadena termine con los caracteres especificados en el patrón.
const esMayuscula = (cadena) => /^[A-Z\s]+$/.test(cadena);

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
  .then(data => {
    // Array.isArray() se utiliza para determinar si un valor es un arreglo en JavaScript. Si data.users no es un arreglo, es decir, si no contiene múltiples usuarios como 
    // se espera, entonces se lanza un error utilizando throw new Error().
    if (!Array.isArray(data.users)) {
      throw new Error("El contenido del archivo JSON no es un arreglo de usuarios");
    }

    // Arreglos para almacenar usuarios modificados según cada caso
    const usuariosAprendiz = [];
    const usuariosMasDeDosNombres = [];
    const usuariosConPalabraADSO = [];

    // Recorrer cada usuario
    data.users.forEach(usuario => {
      // a. Modificar solo los usuarios que tengan el rol aprendiz en true 
      // Esta línea verifica si la propiedad "aprendiz" del objeto "usuario" tiene un valor verdadero.
      // Si la propiedad "aprendiz" es verdadera, el código dentro de este bloque se ejecutará.
      // De lo contrario, si la propiedad "aprendiz" es falsa o no está definida, este bloque no se ejecutará.
      if (usuario.aprendiz) {
        // Aquí estamos convirtiendo el nombre del usuario a mayúsculas utilizando el método toUpperCase() de JavaScript. Esto asegura que independientemente de cómo esté 
        // escrito el nombre en el archivo JSON, se convierta a mayúsculas.
        let nuevoNombre = usuario.name.toUpperCase();
        //  Creamos un objeto proxy llamado validacionNombre que envuelve un objeto con una propiedad llamada name cuyo valor es el nuevo nombre en mayúsculas que acabamos de obtener.
        // proxyValidacion es el objeto proxy que hemos definido previamente para realizar la validación. Este proxy nos permite interceptar la asignación de valores a la propiedad name 
        // y aplicar nuestra lógica de validación.
        let validacionNombre = new Proxy({ name: nuevoNombre }, proxyValidacion);
        // Asignamos el valor validado de validacionNombre.name de vuelta a usuario.name.
        // Esta línea asegura que si el nuevo nombre no cumple con la validación (por ejemplo, si no son solo letras mayúsculas), 
        // se rechazará el cambio y no se modificará el nombre del usuario.
        usuario.name = validacionNombre.name;
        // Agregamos el usuario modificado al arreglo usuariosAprendiz, que se utilizará más adelante para imprimir la tabla separada de usuarios con el rol de aprendiz.
        usuariosAprendiz.push(usuario);
      }

      // b. Modificar solo los usuarios que tengan más de dos nombres
      // Esta línea verifica si el nombre del usuario contiene más de dos palabras. Utiliza el método split(' ') para dividir el nombre en un array utilizando el espacio como
      // delimitador y luego verifica si la longitud de ese array es mayor que 2.
      if (usuario.name.split(' ').length > 2) {
        // Si el nombre del usuario tiene más de dos palabras, entonces se convierte a mayúsculas utilizando el método toUpperCase().
        let nuevoNombre = usuario.name.toUpperCase();
        // Se crea un objeto proxy llamado validacionNombre que envuelve un objeto con una propiedad llamada name cuyo valor es el nuevo nombre en mayúsculas que acabamos de obtener.
        // proxyValidacion es el objeto proxy que hemos definido previamente para realizar la validación.
        let validacionNombre = new Proxy({ name: nuevoNombre }, proxyValidacion);
        // Se asigna el valor validado de validacionNombre.name de vuelta a usuario.name. Esto asegura que el nuevo nombre cumpla con la validación (en este caso, que esté en mayúsculas) 
        // utilizando el proxy definido anteriormente.
        usuario.name = validacionNombre.name;
        // l usuario modificado se agrega al arreglo usuariosMasDeDosNombres, que se utilizará más adelante para imprimir la tabla separada de usuarios con más de dos nombres.
        usuariosMasDeDosNombres.push(usuario);
      }

      // c. Modificar solo los usuarios que contengan la palabra "ADSO" en su user
      // Esta línea verifica si el nombre de usuario contiene la subcadena "ADSO". Utiliza el método includes('ADSO') para comprobar si la cadena del nombre de usuario contiene la subcadena
      // especificada.
      if (usuario.user.includes('ADSO')) {
        // Si el nombre de usuario contiene la palabra "ADSO", entonces se convierte a mayúsculas utilizando el método toUpperCase().
        let nuevoUser = usuario.user.toUpperCase();
        // Se crea un objeto proxy llamado validacionUser que envuelve un objeto con una propiedad llamada user cuyo valor es el nuevo nombre de usuario en mayúsculas que acabamos de obtener.
        // proxyValidacion es el objeto proxy que hemos definido previamente para realizar la validación.
        let validacionUser = new Proxy({ user: nuevoUser }, proxyValidacion);
        // Se asigna el valor validado de validacionUser.user de vuelta a usuario.user. Esto asegura que el nuevo nombre de usuario cumpla con la validación 
        // (en este caso, que esté en mayúsculas) utilizando el proxy definido anteriormente.
        usuario.user = validacionUser.user;
        // el usuario modificado se agrega al arreglo usuariosConPalabraADSO, que se utilizará más adelante para imprimir la tabla separada de usuarios que contienen la palabra "ADSO".
        usuariosConPalabraADSO.push(usuario);
      }
    });

    // Imprimir tablas separadas para cada caso
    console.log("Usuarios con rol de aprendiz:");
    console.table(usuariosAprendiz);

    console.log("Usuarios con más de dos nombres:");
    console.table(usuariosMasDeDosNombres);

    console.log("Usuarios con 'ADSO' en su nombre de usuario:");
    console.table(usuariosConPalabraADSO);
  })
  // Capturar y manejar cualquier error que ocurra durante el proceso
  .catch(error => {
    console.error('Error:', error);
  });
