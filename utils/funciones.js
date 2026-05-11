const fs = require('fs').promises

const getJson = async (ruta) => {
  console.log(new Date().toLocaleString() + ' - Comienzo apertura del JSON')
  const data = await fs.readFile(ruta, 'utf-8')
  console.log(new Date().toLocaleString() + ' - Data obtenida del JSON : ' + data)
  return JSON.parse(data)
}

module.exports = { getJson }
