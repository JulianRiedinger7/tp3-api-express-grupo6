/**
 * Controlador para la administracion de servicios mediante JSON
 */
const ServiciosModel = require('../models/ServiciosModel')
const path = require('path')

// Definicion de constantes
const HTTP_OK = 200
const HTTP_SERVER_ERROR = 500
const HTTP_ERROR_USUARIO = 400
const HTTP_ERROR_NO_ENCONTRADO = 404
const RUTA_JSON_SERVICIOS = path.join(__dirname, '../data/servicios.json')

const getServicios = async (req, res) => {
  console.log(new Date().toLocaleString() + ` - Busco el json en la ruta: ${RUTA_JSON_SERVICIOS}`)
  let servicios = {}
  try {
    servicios = {
      codigo: HTTP_OK,
      servicios: await ServiciosModel.getJson(RUTA_JSON_SERVICIOS)
    }
  } catch (error) {
    servicios = {
      codigo: HTTP_SERVER_ERROR,
      servicios: error
    }
  }

  console.log(new Date().toLocaleString() + ` - Codigo: ${servicios.codigo}`)
  res.status(servicios.codigo).json(servicios.servicios)
}

const getPorNombre = async (req, res) => {
  const { nombre } = req.params
  console.log(new Date().toLocaleString() + ` - Se recibio: ${nombre}`)
  let salida
  if (!nombre || nombre.length < 3) {
    salida = { codigo: HTTP_ERROR_USUARIO, servicios: [] }
  } else {
    try {
      const serviciosJson = await ServiciosModel.getJson(RUTA_JSON_SERVICIOS)
      const jsonFiltrado = serviciosJson.filter(ser => ser.nombre.toLowerCase().includes(nombre.toLowerCase()))
      console.log(new Date().toLocaleString() + ` - jsonFiltrado: ${JSON.stringify(jsonFiltrado)}`)
      if (jsonFiltrado.length === 0) {
        console.log(new Date().toLocaleString() + ' - ' + HTTP_ERROR_NO_ENCONTRADO)
        salida = { codigo: HTTP_ERROR_NO_ENCONTRADO, servicios: [] }
      } else {
        console.log(new Date().toLocaleString() + ' - ' + HTTP_OK)
        salida = {
          codigo: HTTP_OK,
          servicios: jsonFiltrado
        }
      }
    } catch (error) {
      console.log(new Date().toLocaleString() + ' - ' + error)
      salida = { codigo: HTTP_SERVER_ERROR, servicios: [] }
    }
  }
  res.status(salida.codigo).json(salida.servicios)
}

module.exports = { getServicios, getPorNombre }
