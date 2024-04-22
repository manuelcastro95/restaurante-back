const Categoria = require('../models/Categoria');


const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find({});
    res.json(categorias);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
}


const storeCategoria = async (req, res) => {
  const nuevoCategoria = req.body;

  try {
    const categoria = new Categoria(nuevoCategoria);
    await categoria.save();
  } catch (error) {
    console.error('Error al crear categoria:', error);
  }

  res.status(200).json({ mensaje: 'Categoria insertado exitosamente' });
}

const getCategoria = async (req, res) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id);
  if (categoria) {
    res.json(categoria);
  } else {
    res.json({ mensaje: 'Categoria no encontrado' });
  }
}

const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  try {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoria no encontrado' });
    }

    if (nombre) categoria.nombre = nombre;

    await categoria.save();
    res.json({ mensaje: 'Categoria actualizado exitosamente' });

  } catch (error) {
    console.error('Error al crear categoria:', error);
    res.json({ mensaje: 'Error al actualizar el categoria' + error });
  }
}


const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoria no encontrado' });
    }

    if (estado !== undefined) categoria.estado = estado;
    await categoria.save();

    res.status(200).json({ mensaje: 'Categoria actualizado exitosamente' });

  } catch (error) {
    console.error('Error al actualizar categoria:', error);
    res.json({ mensaje: 'Error al actualizar el categoria' + error });
  }

}

module.exports = {
  getCategorias,
  storeCategoria,
  getCategoria,
  updateCategoria,
  updateStatus
}
