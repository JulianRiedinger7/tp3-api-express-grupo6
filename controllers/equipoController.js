const path = require('path')
const EquipoModel = require('../models/EquipoModel')
const { getJson } = require('../utils/funciones')
const RUTA_JSON_EQUIPO = path.join(__dirname, '../data/equipo.json')

const getEquipo = async (req, res) => {
  try {
    const equipo = await getJson(RUTA_JSON_EQUIPO)

    if (equipo.length === 0 || Object.keys(equipo).length === 0) {
      res.status(400).json({ mensaje: 'No se encontraron integrantes del equipo', equipo })
    }
    const integrantes = equipo.map((integrante) => EquipoModel.getIntegranteDeJson(integrante))
    console.log(
      new Date().toLocaleString() +
        ' - Integrantes del equipo parseados: ' +
        JSON.stringify(integrantes)
    )
    res.status(200).json({ equipo: integrantes })
  } catch (error) {
    console.error('Error al obtener el equipo:', error)
    res.status(500).json({ mensaje: 'Error interno del servidor', equipo: [] })
  }
}

module.exports = { getEquipo }
