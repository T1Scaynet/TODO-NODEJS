const Tarea = require("./tarea");

class Tareas {
  get listadoArray() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }
  // Cargar tareas del DB
  cargarTareas(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  // Crear una nueva tarea
  agregarTarea(descripcion) {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  //Ver las tareas
  listadoCompleto() {
    console.log();
    this.listadoArray.forEach((tarea, id) => {
      const idx = `${id + 1}`.green;
      const { descripcion, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      console.log(`${idx} ${descripcion} (${estado})`);
    });
  }

  // Ver las tareas completadas
  verTareasCompletadas() {
    console.log();
    this.listadoArray.forEach((tarea, id) => {
      const idx = `${id + 1}`.green;
      const { descripcion, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      if (completadoEn) {
        console.log(`${idx} ${descripcion} (${estado})`);
      }
    });
  }

  // Ver las tareas pendientes
  verTareasPendientes() {
    console.log();
    this.listadoArray.forEach((tarea, id) => {
      const idx = `${id + 1}`.green;
      const { descripcion, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      if (!completadoEn) {
        console.log(`${idx} ${descripcion} (${estado})`);
      }
    });
  }

  // Completar tarea
  toggleCompletada(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArray.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }

  // Eliminar tarea
  eliminarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
}

module.exports = Tareas;
