const { getServicios } = require('./controllers/ServiciosConstroller')
const Server = require('./models/server')
const { getServiciosID } = require('./controllers/ServiciosConstroller')

const servidor = new Server()
servidor.listen()
