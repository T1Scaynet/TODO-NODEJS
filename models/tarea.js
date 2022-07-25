const { v4: uuidv4 } = require("uuid");

class Tarea {
  constructor(descripcion) {
    this.id = uuidv4();
    // this.titulo = titulo;
    this.descripcion = descripcion;
    // this.fecha = fecha;
    this.completadoEn = null;
  }
}

module.exports = Tarea;
