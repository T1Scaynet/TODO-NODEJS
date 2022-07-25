const colors = require("colors");
const { resolve } = require("path");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log(
      "========================================================".green
    );
    console.log("=========== Bienvenido a la aplicación ===============".green);
    console.log(
      "========================================================\n".green
    );

    console.log(`${"1.".green} Crear una nueva tarea`);
    console.log(`${"2.".green} Ver las tareas`);
    console.log(`${"3.".green} Ver las tareas completadas`);
    console.log(`${"4.".green} Ver las tareas pendientes`);
    console.log(`${"5.".green} completar una tarea`);
    console.log(`${"6.".green} Eliminar una tarea`);
    console.log(`${"0.".green} Salir\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Ingrese una opción: ", (opcion) => {
      readline.close();
      resolve(opcion);
    });

  });

};

const pausar = () => {

  return new Promise((resolve) => {

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    readline.question(`\nPresione ${"ENTER".green} para continuar...\n`,(opcion) => {
      readline.close();
      resolve(opcion);
    });

  });
  
};

module.exports = {
  mostrarMenu,
  pausar,
};
