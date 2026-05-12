const path = require('path')
const EquipoModel = require('../models/EquipoModel')
const RUTA_JSON_EQUIPO = path.join(__dirname, '../data/equipo.json')

const getEquipo = async (req, res) => {
  try {
    const integrantes = await EquipoModel.obtenerEquipo(RUTA_JSON_EQUIPO)

    if (integrantes.length === 0 || Object.keys(integrantes).length === 0) {
      return res
        .status(404)
        .json({ mensaje: 'No se encontraron integrantes del equipo', equipo: [] })
    }
    console.log(
      new Date().toLocaleString() +
        ' - Integrantes del equipo parseados: ' +
        JSON.stringify(integrantes)
    )
    return res.status(200).json({ equipo: integrantes })
  } catch (error) {
    console.error('Error al obtener el equipo:', error)
    return res.status(500).json({ mensaje: 'Error interno del servidor', equipo: [] })
  }
}

module.exports = { getEquipo }
