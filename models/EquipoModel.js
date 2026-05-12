const { getJson } = require('../utils/funciones')

class EquipoModel {
  constructor (id, nombre, apellido, rol, imagen, acercaDe) {
    this.id = id
    this.nombre = nombre
    this.apellido = apellido
    this.rol = rol
    this.imagen = imagen
    this.acerca = acercaDe
  }

  static async obtenerEquipo (ruta) {
    const equipoData = await getJson(ruta)
    return equipoData.map((integrante) => EquipoModel.getIntegranteDeJson(integrante))
  }

  static getIntegranteDeJson (objeto) {
    return new EquipoModel(
      objeto.id,
      objeto.nombre,
      objeto.apellido,
      objeto.rol,
      objeto.imagen,
      objeto.acerca_de
    )
  }
}

module.exports = EquipoModel
