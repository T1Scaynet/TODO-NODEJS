const fs = require('fs');

const guardarDB = ( data ) => {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync('./db/data.json', dataJSON);
}

const leerDB = () => {
  try {
    const dataJSON = fs.readFileSync('./db/data.json');
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
}

module.exports = {
  guardarDB,
  leerDB
}