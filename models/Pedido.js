const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  productos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  }],
  mesa: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['procesando', 'listo', 'entregado'],
    default: 'procesando'
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
