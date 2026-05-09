class ServiciosModel {
  // Constructor
  constructor (id, nombre, descripcion, rutaImagen, puntaje, stock, precio) {
    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
    this.imagen = rutaImagen
    this.puntaje = puntaje
    this.stock = stock
    this.precio = precio
  }

  static getServicioDeJson (objeto) {
    return new ServiciosModel(
      objeto.id,
      objeto.nombre,
      objeto.descripcion,
      objeto.imagen,
      objeto.puntaje,
      objeto.stock,
      objeto.precio
    )
  }
}

module.exports = ServiciosModel
