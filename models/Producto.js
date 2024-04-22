
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  precio: {
    type: Number,
    required: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: false
  },
  estado: {
    type: Number,
    default: 1
  }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
