/**
 * Controlador para la administracion de servicios mediante JSON
 */
const ServiciosModel = require('../models/ServiciosModel')
const fs = require('fs').promises
const path = require('path')

// Definicion de constantes
const HTTP_OK = 200
const HTTP_SERVER_ERROR = 500

const getServicios = async (req, res) => {
  console.log(new Date().toLocaleString() + ` - Busco el json en la ruta: ${path.join(__dirname, '../data/servicios.json')}`)
  const servicios = await getJson(path.join(__dirname, '../data/servicios.json'))
  console.log(new Date().toLocaleString() + ` - Codigo: ${servicios.codigo}`)
  res.status(servicios.codigo).json(servicios.servicios)
}
const getJson = async (ruta) => {
  let salida
  try {
    console.log(new Date().toLocaleString() + ' - Comienzo apertura del JSON')
    const servicios = await fs.readFile(ruta, 'utf-8')
    const serviciosJson = JSON.parse(servicios)
    salida = {
      codigo: HTTP_OK,
      servicios: serviciosJson.map(
        serv => ServiciosModel.getServicioDeJson(serv))
    }
  } catch (error) {
    salida = { codigo: HTTP_SERVER_ERROR, servicios: [] }
  }
  console.log(new Date().toLocaleString() + ' - Fin de la funcion getJson')
  return salida
}

module.exports = { getServicios }
