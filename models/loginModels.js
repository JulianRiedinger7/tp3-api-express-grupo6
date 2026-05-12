class UsuarioModel {

    // Constructor
    constructor(id, nombre, mail, contrasena, fechaRegistro, foto, pedidos) {
        this.id = id;
        this.nombre = nombre;
        this.mail = mail;
        this.contrasena = contrasena;
        this.fechaRegistro = fechaRegistro;
        this.foto = foto;
        this.pedidos = pedidos;
    }

    static getUsuarioDeJson(objeto) {
        return new UsuarioModel(
            objeto.id,
            objeto.nombre,
            objeto.mail,
            objeto.contrasena,
            objeto.fechaRegistro,
            objeto.foto,
            objeto.pedidos
        );
    }
}

module.exports = UsuarioModel;