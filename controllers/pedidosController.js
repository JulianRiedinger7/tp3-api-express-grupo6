const fs = require('fs').promises
const path = require('path')
const PedidosModel = require('../models/PedidosModel')

const realizarPedido = async (req, res) => {
  try {
    //Se extraen los datos que mandó el formulario desde el front
    //red.body contiene el JSON que se envía con fetch desde pedidos.html
    const {
      producto,
      nombre,
      apellido,
      email,
      calle,
      numero,
      ciudad,
      CP,
      opciones_de_pago,
      numero_tarjeta,
      vencimiento,
      cvv
    } = req.body
    console.log(`Nuevo pedido recibido de : ${nombre} ${apellido} (${email})`)
    //Validación básica
    if (
      !producto ||
      !nombre ||
      !apellido ||
      !email ||
      !calle ||
      !numero ||
      !ciudad ||
      !CP ||
      !opciones_de_pago ||
      !numero_tarjeta ||
      !vencimiento ||
      !cvv
    ) {
      return res.status(400).json({ error: 'Faltan datos obligatorios.' })
    }
    //Ruta al archivo JSON donde se guardarán los pedidos
    const rutaServicios = path.join(__dirname, '../data/servicios.json')
    //Se lee el archivo JSON para obtener los pedidos
    const contenido = await fs.readFile(rutaServicios, 'utf-8')
    const servicios = JSON.parse(contenido)

    //Se busca el servicio cuyo id coincida con el que mandó el front
    const servicio = servicios.find((s) => s.id === parseInt(producto))
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado.' })
    }
    //Verificamos stock
    if (servicio.stock <= 0) {
      return res
        .status(400)
        .json({ error: 'Sin stock disponible.', servicio: servicio.nombre })
    }

    //Se leen los pedidos existentes
    const rutaPedidosGuardados = path.join(__dirname, '../data/pedidos.json')
    const contenidoPedidos = await fs.readFile(rutaPedidosGuardados, 'utf-8')
    const pedidos = JSON.parse(contenidoPedidos)
    //Nuevo pedido con ID incremental
    const nuevoPedido = new PedidosModel(
      pedidos.length + 1, // id: simplemente el siguiente número
      producto,
      nombre,
      apellido,
      email,
      calle,
      numero,
      ciudad,
      CP,
      opciones_de_pago
    )

    // Se agrega al array y sobreescribe el archivo
    pedidos.push(nuevoPedido)
    await fs.writeFile(rutaPedidosGuardados, JSON.stringify(pedidos, null, 2))

    //Si esta todo OK, se crea el nuevo pedido
    console.log(
      `Pedido recibido: ${servicio.nombre} para ${nombre} ${apellido} (${email})`
    )

    return res.status(200).json({
      mensaje: 'Pedido realizado con éxito.',
      detalle: {
        producto: servicio.nombre,
        precioUnitario: servicio.precio,
        total: servicio.precio,
        cliente: `${nombre} ${apellido}`,
        email: email,
        direccion: `${calle} ${numero}, ${ciudad}, CP: ${CP}`
      }
    })
  } catch (error) {
    console.error('Error al procesar el pedido:', error)
    return res.status(500).json({ error: `Error: ${error.message}` })
  }
}
module.exports = { realizarPedido }
