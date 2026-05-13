const fs = require('fs').promises
const path = require('path')

class PerfilModel {
constructor(id, nombre, mail, fechaRegistro, foto, ultimosPedidos) {
    this.id = id
    this.nombre = nombre
    this.mail = mail
    this.fechaRegistro = fechaRegistro
    this.foto = foto
    this.ultimosPedidos = ultimosPedidos
}

static async getPerfilPorId(id) {
    const ruta = path.join(__dirname, '../data/usuarios.json')
    console.log(new Date().toLocaleString() + ' - Buscando perfil id: ' + id)

    const data = await fs.readFile(ruta, 'utf-8')
    const usuarios = JSON.parse(data)

    const usuario = usuarios.find(u => u.id === Number(id))
    if (!usuario) return null

    return PerfilModel.#crearDesdeJson(usuario)
}

static #crearDesdeJson(obj) {
    return new PerfilModel(
obj.id,
obj.nombre,
obj.mail,
obj.fechaRegistro,
obj.foto,
      obj.pedidos.slice(-3)   // últimos 3 pedidos
    )
}
}

module.exports = PerfilModel