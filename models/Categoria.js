const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  estado: {
    type: Number,
    default: 1
  }
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
