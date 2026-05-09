const { Router } = require('express')
const {
  getServicios
} = require('../controllers/ServiciosConstroller')

const rutas = Router()

rutas.get('/servicios', getServicios)

module.exports = rutas
