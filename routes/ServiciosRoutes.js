const { Router } = require('express')
const {
  getServicios,
  getPorNombre
} = require('../controllers/ServiciosConstroller')

const rutas = Router()

rutas.get('/:nombre', getPorNombre)
rutas.get('/', getServicios)

module.exports = rutas
