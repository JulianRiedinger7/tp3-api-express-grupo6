const fs = require('fs/promises');
const path = require('path');

const login = async (req, res) => {
    console.log(req.body)
    const { email, contrasena } = req.body;

    // valido datos recibidos
    if (!email || !contrasena) {
        return res.status(400).json({
            message: 'Email y contraseña son obligatorios'
        });
    }

    try {

        // leo archivo
        const contenido = await fs.readFile('./data/usuarios.json', 'utf-8');
        const usuarios = JSON.parse(contenido);

        // busco usuario
        const usuario = usuarios.find(u => u.mail === email);

        // valido usuario
        if (!usuario) {
            return res.status(401).json({
                message: 'Usuario no encontrado'
            });
        }

        // valido contraseña
        if (usuario.contrasena !== contrasena) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        // si todo ok, devuelvo datos de usuario 
        return res.status(200).json({
            id: usuario.id,
            email: usuario.mail,
            nombre: usuario.nombre,
            message: 'Login exitoso'
        });

    } catch (error) {
        console.error('Error en login:', error);

        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

module.exports = { login };