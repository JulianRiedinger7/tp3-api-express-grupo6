const fs = require('fs').promises

class ServiciosModel {
  // Constructor de clase
  constructor (id, nombre, descripcion, rutaImagen, puntaje, stock, precio) {
    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
    this.imagen = rutaImagen
    this.puntaje = puntaje
    this.stock = stock
    this.precio = precio
  }

  static async getJson (ruta) {
    console.log(new Date().toLocaleString() + ' - Comienzo apertura del JSON')
    const servicios = await fs.readFile(ruta, 'utf-8')
    console.log(servicios)
    const serviciosJson = JSON.parse(servicios)
    return serviciosJson.map(
      serv => ServiciosModel.#privateGetServicioDeJson(serv))
  }

  static #privateGetServicioDeJson (objeto) {
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
