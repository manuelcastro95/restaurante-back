const Producto = require('../models/Producto');
const { logCreate, logUpdate, logDelete, logOther } = require('../traits/activityTraits');

const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find({}).populate('categoria');
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
}

const storeProducto = async (req, res) => {
  const {nombre,precio,categoriaId,idUserAuth} = req.body;

  try {
    const producto = new Producto({nombre,precio,categoria:categoriaId});
    await producto.save();
    logCreate(idUserAuth, `Producto creado: ${producto.nombre}`);
    res.status(200).json({ mensaje: 'Producto registrado exitosamente' });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).send('Server error');
  }
}

const getProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findById(id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Server error');
  }
}

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const {nombre,precio,categoriaId,idUserAuth} = req.body;

  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    if (nombre) producto.nombre = nombre;
    if (precio) producto.precio = precio;
    if (categoriaId) producto.categoria = categoriaId;

    await producto.save();
    logUpdate(idUserAuth, `Producto actualizado: ${producto.nombre}`);
    res.json({ mensaje: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el producto' });
  }
}

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado,idUserAuth } = req.body;

  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    producto.estado = estado;
    await producto.save();
    logUpdate(idUserAuth, `Estado del producto actualizado: ${producto.nombre}`);
    res.status(200).json({ mensaje: 'Estado del producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el estado del producto:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el estado del producto' });
  }
}

module.exports = {
  getProductos,
  storeProducto,
  getProducto,
  updateProducto,
  updateStatus
}
