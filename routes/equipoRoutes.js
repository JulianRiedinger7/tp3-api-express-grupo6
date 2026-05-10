const { Router } = require('express')
const { getEquipo } = require('../controllers/equipoController')

const rutas = Router()

rutas.get('/', getEquipo)

module.exports = rutas
