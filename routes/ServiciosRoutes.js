const { Router } = require('express')
const {
  getServicios,
  getPorNombre,
  getServiciosID
} = require('../controllers/ServiciosConstroller')

const rutas = Router()

rutas.get('/servicios/:nombre', getPorNombre)
rutas.get('/servicios', getServicios)
rutas.get('/servicios/:id', getServiciosID) //no es lo mismo que arriba?? sino con ID

module.exports = rutas
