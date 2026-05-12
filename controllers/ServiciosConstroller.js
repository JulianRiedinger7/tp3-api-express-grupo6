/**
 * Controlador para la administracion de servicios mediante JSON
 */
const ServiciosModel = require('../models/ServiciosModel')
const fs = require('fs').promises
const path = require('path')

// Definicion de constantes
const HTTP_OK = 200
const HTTP_SERVER_ERROR = 500
const HTTP_ERROR_USUARIO = 400
const HTTP_ERROR_NO_ENCONTRADO = 404
const RUTA_JSON_SERVICIOS = path.join(__dirname, '../data/servicios.json')

const getServicios = async (req, res) => {
  console.log(
    new Date().toLocaleString() +
      ` - Busco el json en la ruta: ${RUTA_JSON_SERVICIOS}`
  )
  const servicios = await getJson(RUTA_JSON_SERVICIOS)
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
      servicios: serviciosJson.map((serv) =>
        ServiciosModel.getServicioDeJson(serv)
      )
    }
  } catch (error) {
    salida = { codigo: HTTP_SERVER_ERROR, servicios: [] }
  }
  console.log(new Date().toLocaleString() + ' - Fin de la funcion getJson')
  return salida
}

const getPorNombre = async (req, res) => {
  const { nombre } = req.params
  console.log(new Date().toLocaleString() + ` - Se recibio: ${nombre}`)
  let salida
  if (!nombre || nombre.length < 3) {
    salida = { codigo: HTTP_ERROR_USUARIO, servicios: [] }
  } else {
    try {
      const servicios = await fs.readFile(RUTA_JSON_SERVICIOS, 'utf-8')
      const serviciosJson = JSON.parse(servicios)
      const jsonFiltrado = serviciosJson.filter((ser) =>
        ser.nombre.toLowerCase().includes(nombre.toLowerCase())
      )
      console.log(
        new Date().toLocaleString() +
          ` - jsonFiltrado: ${JSON.stringify(jsonFiltrado)}`
      )
      if (jsonFiltrado.length === 0) {
        console.log(
          new Date().toLocaleString() + ' - ' + HTTP_ERROR_NO_ENCONTRADO
        )
        salida = { codigo: HTTP_ERROR_NO_ENCONTRADO, servicios: [] }
      } else {
        console.log(new Date().toLocaleString() + ' - ' + HTTP_OK)
        salida = {
          codigo: HTTP_OK,
          servicios: jsonFiltrado.map((ser) =>
            ServiciosModel.getServicioDeJson(ser)
          )
        }
      }
    } catch (error) {
      console.log(new Date().toLocaleString() + ' - ' + error)
      salida = { codigo: HTTP_SERVER_ERROR, servicios: [] }
    }
  }
  res.status(salida.codigo).json(salida.servicios)
}

//Matias Ledesma, preguntar porque es igual al de nombre
const getServiciosID = async (req, res) => {
  const { id } = req.params
  console.log(new Date().toLocaleString() + ` - Se recibio: ${id}`)
  let salida
  if (!id || isNaN(id)) {
    salida = { codigo: HTTP_ERROR_NO_ENCONTRADO, servicio:{} } //salida es una caja q pongo lo que le quiero avisar al usaurio
  } else {
    try {
      const servicio = await fs.readFile(RUTA_JSON_SERVICIOS, 'utf-8') //abre el archivo json, definida RURA_JSON_SERVICIOS arriba como cte
      const serviciosJson = JSON.parse(servicio)
      const jsonFiltrado = serviciosJson.find(
        (servicio) => servicio.id === parseInt(id)
      )
      console.log(
        new Date().toLocaleString() +
          ` - jsonFiltrado: ${JSON.stringify(jsonFiltrado)}`
      )
      if (!jsonFiltrado) {
        console.log(
          new Date().toLocaleString() + ' - ' + HTTP_ERROR_NO_ENCONTRADO
        )
        salida = { codigo: HTTP_ERROR_NO_ENCONTRADO, servicio: {} }
      } else {
        console.log(new Date().toLocaleString() + ' - ' + HTTP_OK)
        salida = {
          codigo: HTTP_OK,
          servicio: ServiciosModel.getServicioDeJson(jsonFiltrado)
        }
      }
    } catch (error) {
      console.log(new Date().toLocaleString() + ' - ' + error)
      salida = { codigo: HTTP_SERVER_ERROR, servicio: {} }
    }
  }

  res.status(salida.codigo).json(salida.servicio)
}

module.exports = { getServicios, getPorNombre, getServiciosID }
