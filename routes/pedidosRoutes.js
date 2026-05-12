const express = require('express')
const router = express.Router()

const { realizarPedido } = require('../controllers/pedidosController')

router.post('/', realizarPedido)

module.exports = router
