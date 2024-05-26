const Role = require('../models/Role');
const { logCreate, logUpdate, logDelete, logOther } = require('../traits/activityTraits');

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.json(roles);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
}

const storeRole = async (req, res) => {
  const {nombre, descripcion,idUserAuth} = req.body;

  try {
    const role = new Role({nombre, descripcion});
    await role.save();
    logCreate(idUserAuth, `Rol creado: ${role.nombre}`);
    res.status(200).json({ mensaje: 'Rol registrado exitosamente' });
  } catch (error) {
    console.error('Error al crear rol:', error);
    res.status(500).send('Server error');
  }
}

const getRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findById(id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ mensaje: 'Rol no encontrado' });
    }
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
}

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion,idUserAuth } = req.body;

  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    if (nombre) role.nombre = nombre;
    if (descripcion) role.descripcion = descripcion;

    await role.save();
    logUpdate(idUserAuth, `Rol actualizado: ${role.nombre}`);
    res.json({ mensaje: 'Rol actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el rol' });
  }
}

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado,idUserAuth } = req.body;

  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    if (estado !== undefined) role.estado = estado;
    await role.save();
    logUpdate(idUserAuth, `Estado del rol actualizado: ${role.nombre}`);
    res.status(200).json({ mensaje: 'Estado del rol actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el rol' });
  }
}

module.exports = {
  getRoles,
  storeRole,
  getRole,
  updateRole,
  updateStatus
}
