const Producto = require('../models/Producto')
// const Categoria = require('../models/Categoria')

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
  const nuevoProducto = req.body;

}


const getProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findById(id);

    res.json(producto);

  } catch (error) {
    console.error('Error', error);
  }
}

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

}

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

}

module.exports = {
  getProductos,
  storeProducto,
  getProducto,
  updateProducto,
  updateStatus
}
