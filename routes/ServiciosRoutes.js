const { Router } = require('express')
const {
  getServicios,
  getPorNombre
} = require('../controllers/ServiciosConstroller')

const rutas = Router()

rutas.get('/servicios/:nombre', getPorNombre)
rutas.get('/servicios', getServicios)

module.exports = rutas
