const colors = require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  inquirerPausa,
  leerInput,
  borrarTareas,
  confirmar,
  completarTarea,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");


const main = async () => {
  let opcion = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB.length > 0) {
    tareas.cargarTareas(tareasDB);
  }

  do {
    opcion = await inquirerMenu();
    // console.log(`Opción seleccionada: ${ opcion }`);
    switch (opcion) {
      case "1":
        const descripcion = await leerInput(
          "Ingrese la descripción de la tarea: "
        );
        tareas.agregarTarea(descripcion);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.verTareasCompletadas(true);
        break;

      case "4":
        tareas.verTareasPendientes(false);
        break;

      case "5":
        const ids = await completarTarea(tareas.listadoArray);
        tareas.toggleCompletada(ids);
        // console.log(`Tareas completadas: ${ids}`);
        break;

      case "6":
        const id = await borrarTareas(tareas.listadoArray);
        if (id !== "0") {
          const confirmacion = await confirmar(`¿Esta seguro?`);
          if (confirmacion) {
            tareas.eliminarTarea(id);
            console.log(`Tarea eliminada: ${id}`);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArray);
    await inquirerPausa();
  } while (opcion !== "0");
};

main();
