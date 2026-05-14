const PerfilModel = require('../models/PerfilModel')
const path = require('path')

const HTTP_OK = 200
const HTTP_SERVER_ERROR = 500
const HTTP_ERROR_USUARIO = 400
const HTTP_ERROR_NO_ENCONTRADO = 404
const RUTA_JSON_USUARIOS = path.join(__dirname, '../data/usuarios.json')

const getPerfil = async (req, res) => {
  console.log(new Date().toLocaleString() + ` - Busco el json en la ruta: ${RUTA_JSON_USUARIOS}`)
  const { id } = req.params
  console.log(new Date().toLocaleString() + ` - Se recibio: ${id}`)
  let salida = {}

  if (!id || isNaN(id)) {
    salida = { codigo: HTTP_ERROR_USUARIO, perfil: {} }
  } else {
    try {
      const perfil = await PerfilModel.getPerfilPorId(id, RUTA_JSON_USUARIOS)
      if (!perfil) {
        salida = { codigo: HTTP_ERROR_NO_ENCONTRADO, perfil: {} }
      } else {
        salida = { codigo: HTTP_OK, perfil }
      }
    } catch (error) {
      console.log(new Date().toLocaleString() + ' - ' + error)
      salida = { codigo: HTTP_SERVER_ERROR, perfil: {} }
    }
  }

  res.status(salida.codigo).json(salida.perfil)
}

module.exports = { getPerfil }
