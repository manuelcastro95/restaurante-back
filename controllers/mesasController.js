const Mesa = require('../models/Mesa');
const { logCreate, logUpdate } = require('../traits/activityTraits');

const listarMesas = async (req, res) => {
  try {
    const mesas = await Mesa.find({});
    res.status(200).json(mesas);
  } catch (error) {
    console.error('Error al listar mesas:', error);
    res.status(500).send('Server error');
  }
};

const asignarMesa = async (req, res) => {
  const { id, idUserAuth } = req.params;

  try {
    const mesa = await Mesa.findById(id);
    if (!mesa) {
      return res.status(404).json({ mensaje: 'Mesa no encontrada' });
    }

    mesa.asignadaA = userId;
    mesa.estado = 'ocupada';
    await mesa.save();
    logUpdate(idUserAuth, `Mesa ${mesa.nombre} asignada a usuario ${userId}`);
    res.status(200).json({ mensaje: 'Mesa asignada exitosamente' });
  } catch (error) {
    console.error('Error al asignar mesa:', error);
    res.status(500).send('Server error');
  }
};

const liberarMesa = async (req, res) => {
  const { id } = req.params;

  try {
    const mesa = await Mesa.findById(id);
    if (!mesa) {
      return res.status(404).json({ mensaje: 'Mesa no encontrada' });
    }

    mesa.asignadaA = null;
    mesa.estado = 'disponible';
    await mesa.save();
    res.status(200).json({ mensaje: 'Mesa liberada exitosamente' });
  } catch (error) {
    console.error('Error al liberar mesa:', error);
    res.status(500).send('Server error');
  }
};

const crearMesa = async (req, res) => {
  const { nombre, estado,idUserAuth } = req.body;

  try {
    const nuevaMesa = new Mesa({ nombre, estado });
    await nuevaMesa.save();
    logCreate(idUserAuth, `Mesa ${nombre} creada`);
    res.status(201).json({ mensaje: 'Mesa creada exitosamente' });
  } catch (error) {
    console.error('Error al crear mesa:', error);
    res.status(500).send('Server error');
  }
};

const actualizarMesa = async (req, res) => {
  const { id } = req.params;
  const { nombre, estado,idUserAuth } = req.body;

  try {
    const mesa = await Mesa.findById(id);
    if (!mesa) {
      return res.status(404).json({ mensaje: 'Mesa no encontrada' });
    }

    mesa.nombre = nombre;
    mesa.estado = estado;
    await mesa.save();
    logUpdate(idUserAuth, `Mesa ${nombre} actualizada`);
    res.status(200).json({ mensaje: 'Mesa actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar mesa:', error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  listarMesas,
  asignarMesa,
  liberarMesa,
  crearMesa,
  actualizarMesa
};
