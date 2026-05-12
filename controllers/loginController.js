const fs = require('fs/promises');

//importo modelo de usuario
const UsuarioModel = require('../models/loginModels');

const login = async (req, res) => {

    //obtengo datos del front
    const { email, contrasena } = req.body;

    //verifico que no esten vacios
    if (!email || !contrasena) {
        return res.status(400).json({
            message: 'Email y contraseña son obligatorios'
        });
    }

    try {

        // leo archivo
        const contenido = await fs.readFile('./data/usuarios.json', 'utf-8');

        // parseo json
        const usuariosJson = JSON.parse(contenido);

        // convierto a instancias de UsuarioModel
        const usuarios = usuariosJson.map(usuario =>
            UsuarioModel.getUsuarioDeJson(usuario)
        );

        // busco usuario
        const usuario = usuarios.find(u => u.mail === email);

        //si no existe o contraseña incorrecta,  devuelvo 401
        if (!usuario) {
            return res.status(401).json({
                message: 'Usuario no encontrado'
            });
        }

        if (usuario.contrasena !== contrasena) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        //si todo salio ok, devuelvo datos de usuario 
        return res.status(200).json({
            id: usuario.id,
            email: usuario.mail,
            nombre: usuario.nombre,
            message: 'Login exitoso'
        });

    } catch (error) {

        console.error(error); //muestro error en consola

        return res.status(500).json({ //devuelvo error al cliente
            message: 'Error interno del servidor'
        });
    }
};

module.exports = { login };
