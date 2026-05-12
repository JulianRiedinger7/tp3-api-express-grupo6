const { Router } = require('express')
const {
  getServicios,
  getPorNombre,
  getServiciosID
} = require('../controllers/ServiciosConstroller')

const rutas = Router()

rutas.get('/servicios/:nombre', getPorNombre)
rutas.get('/servicios', getServicios)
rutas.get('/servicios/id/:id', getServiciosID) // tuve que caambiar la direccion de la ruta, porque el id lo tomaba como string y caia a nombre
// express nunca mira de q tipo es el dato. ¿Lo vimos con el profe esto en algun momento?

module.exports = rutas
