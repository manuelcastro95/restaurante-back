// controllers/pedidosController.js
const Pedido = require('../models/Pedido');
const { logCreate, logUpdate, logDelete } = require('../traits/activityTraits');

const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({}).populate('productos');
    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al listar pedidos:', error);
    res.status(500).send('Server error');
  }
}

const listarPedidosCocina = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ estado: 'procesando' }).populate('productos');
    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al listar pedidos de cocina:', error);
    res.status(500).send('Server error');
  }
}

const storePedido = async (req, res) => {
  const { productos, mesa, idUserAuth } = req.body;

  try {
    const nuevoPedido = new Pedido({ productos, mesa });
    await nuevoPedido.save();
    logCreate(idUserAuth, `Pedido creado: Mesa ${mesa}`);
    res.status(200).json({ mensaje: 'Pedido enviado exitosamente' });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).send('Server error');
  }
}

const getPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await Pedido.findOne({ mesa: id, estado: 'listo' }).populate('productos');
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).send('Server error');
  }
}

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado, idUserAuth } = req.body;

  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    pedido.estado = estado;
    await pedido.save();
    logUpdate(idUserAuth, `Estado del pedido actualizado: Mesa ${pedido.mesa}`);
    res.status(200).json({ mensaje: 'Estado del pedido actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    res.status(500).send('Server error');
  }
}

module.exports = {
  listarPedidos,
  listarPedidosCocina,
  storePedido,
  getPedido,
  updateStatus
}
