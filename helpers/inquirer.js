const inquirer = require("inquirer");
const colors = require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Seleccione una opción:",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear una nueva tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Ver las tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Ver las tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Ver las tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar una tarea`,
      },
      {
        value: "6",
        name: `${"6.".green} Eliminar una tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("========================================================".green);
  console.log("=========== Bienvenido a la aplicación =================".green);
  console.log("========================================================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const inquirerPausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar...`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "opcion",
      message,
      validate(value) {
        if (value.length) {
          return true;
        } else {
          return "Por favor ingrese una opción";
        }
      },
    },
  ];

  const { opcion } = await inquirer.prompt(question);
  return opcion;
};

const borrarTareas = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.descripcion}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Salir",
  });


  const question = [
    {
      type: "list",
      name: "id",
      message: "Eliminar:",
      choices
    },
  ];

  const { id } = await inquirer.prompt(question);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
}

const completarTarea = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.descripcion} ${tarea.completadoEn ? "✓" : "✗"}`,
      checked: (tarea.completadoEn) ? true : false
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione las tareas a completar:",
      choices
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
}

module.exports = {
  inquirerMenu,
  inquirerPausa,
  leerInput,
  borrarTareas,
  confirmar,
  completarTarea
};
