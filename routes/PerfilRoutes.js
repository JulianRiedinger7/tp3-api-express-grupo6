const { Router } = require('express')
const { getPerfil } = require('../controllers/perfilController')

const rutas = Router()

rutas.get('/:id', getPerfil)

module.exports = rutas
