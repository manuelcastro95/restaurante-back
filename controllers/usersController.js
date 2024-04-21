const Role = require('../models/Role');
const User = require('../models/User');
const bcrypt = require('bcrypt');


const listarUsuarios = async (req, res) => {
  try {
    const users = await User.find({}).populate('role_id');
    res.json(users);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
}


const storeUser = async (req, res) => {
  const { nombre, apellido, email, telefono, password, roleId } = req.body;

  try {
    const role = await Role.findById(roleId);

    const user = new User({ nombre, apellido, email, telefono, password, role_id: role._id });
    await user.save();
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }

  res.status(200).json({ mensaje: 'Usuario insertado exitosamente' });
}

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (user) {
    res.json(user);
  } else {
    res.json({ mensaje: 'Usuario no encontrado' });
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono, password, rol, estado } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (nombre) user.nombre = nombre;
    if (apellido) user.apellido = apellido;
    if (email) user.email = email;
    if (telefono) user.telefono = telefono;
    if (rol) user.rol = rol;

    if (password && await bcrypt.compare(password, user.password) === false) {
      user.password = password;
    }

    await user.save();
    res.json({ mensaje: 'Usuario actualizado exitosamente' });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.json({ mensaje: 'Error al actualizar el usuario' + error });
  }
}


const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (estado !== undefined) user.estado = estado;
    await user.save();

    res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.json({ mensaje: 'Error al actualizar el usuario' + error });
  }

}

module.exports = {
  listarUsuarios,
  storeUser,
  getUser,
  updateUser,
  updateStatus
}
