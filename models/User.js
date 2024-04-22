const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  apellido: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  telefono: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: false
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: Number,
    default: 1
  }
});

// Pre-save hook para hashear la contraseña
userSchema.pre('save', function (next) {
  const user = this;

  // Solo hashear la contraseña si ha sido modificada (o es nueva)
  if (!user.isModified('password')) return next();

  // Generar un "salt"
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // Hashear la contraseña usando el nuevo salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // Reemplazar la contraseña ingresada con el hash
      user.password = hash;
      next();
    });
  });
});

// Método para comparar la contraseña ingresada con el hash almacenado
userSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
