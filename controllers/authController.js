const fs = require('fs/promises');
const path = require('path');
const rutaArchivo = path.join(__dirname, '../db/users.json');

const User = require('../models/User');
const mongoose = require('../db/dbmongo');


const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email: email }).exec();

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    // Comparar la contraseña con el hash almacenado
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error al comparar contraseñas' });
      }
      if (!isMatch) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }

      // Si las contraseñas coinciden, devolver los datos del usuario
      const userToReturn = { ...user.toObject(), password: undefined };
      res.json(userToReturn);
    });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = {
  login
}
