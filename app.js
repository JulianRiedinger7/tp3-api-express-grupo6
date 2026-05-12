const { getServicios, getServiciosID} = require('./controllers/ServiciosConstroller')
const Server = require('./models/server')

const servidor = new Server()
servidor.listen()
