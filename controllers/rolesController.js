const Role = require('../models/Role');


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
  const nuevoRole = req.body;

  try {
    const role = new Role(nuevoRole);
    await role.save();
  } catch (error) {
    console.error('Error al crear rol:', error);
  }

  res.status(200).json({ mensaje: 'Rol insertado exitosamente' });
}

const getRole = async (req, res) => {
  const { id } = req.params;

  const role = await Role.findById(id);
  if (role) {
    res.json(role);
  } else {
    res.json({ mensaje: 'Rol no encontrado' });
  }
}

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    if (nombre) role.nombre = nombre;
    if (descripcion) role.descripcion = descripcion;

    await role.save();
    res.json({ mensaje: 'Rol actualizado exitosamente' });

  } catch (error) {
    console.error('Error al crear rol:', error);
    res.json({ mensaje: 'Error al actualizar el rol' + error });
  }
}


const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    if (estado !== undefined) role.estado = estado;
    await role.save();

    res.status(200).json({ mensaje: 'Rol actualizado exitosamente' });

  } catch (error) {
    console.error('Error al actualizar rol:', error);
    res.json({ mensaje: 'Error al actualizar el rol' + error });
  }

}

module.exports = {
  getRoles,
  storeRole,
  getRole,
  updateRole,
  updateStatus
}
