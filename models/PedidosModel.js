class PedidosModel {
  constructor(
    id,
    producto,
    nombre,
    apellido,
    email,
    calle,
    numero,
    ciudad,
    CP,
    opciones_de_pago
  ) {
    this.id = id
    this.producto = producto
    this.nombre = nombre
    this.apellido = apellido
    this.email = email
    this.calle = calle
    this.numero = numero
    this.ciudad = ciudad
    this.CP = CP
    this.opciones_de_pago = opciones_de_pago
  }

  static getPedidoDeJson(objeto) {
    return new PedidosModel(
      objeto.id,
      objeto.producto,
      objeto.nombre,
      objeto.apellido,
      objeto.email,
      objeto.calle,
      objeto.numero,
      objeto.ciudad,
      objeto.CP,
      objeto.opciones_de_pago
    )
  }
}

module.exports = PedidosModel
