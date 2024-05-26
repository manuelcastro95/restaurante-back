const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MesaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  asignadaA: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  estado: {
    type: String,
    enum: ['disponible', 'ocupada'],
    default: 'disponible'
  }
});

module.exports = mongoose.model('Mesa', MesaSchema);
