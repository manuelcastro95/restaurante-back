const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  descripcion: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  estado: {
    type: Number,
    default: 1
  }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
