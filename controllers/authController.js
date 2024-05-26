const User = require('../models/User');
const mongoose = require('../db/dbmongo');
const { logOther } = require('../traits/activityTraits');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('role').exec();

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    // Comparar la contraseña con el hash almacenado
    const isMatch = await user.comparePassword(password);  // Modificado para usar async/await
    if (!isMatch) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const userToReturn = {
      ...user.toObject(),
      password: undefined
    };

    logOther(user._id, 'incio sesion', 'el usuario ha iniciado sesion correctamente');
    res.json(userToReturn);
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  login
}
