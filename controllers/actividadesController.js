const Log = require('../models/Log');

const getActividadesRecientes = async (req, res) => {
  try {
    const actividades = await Log.find({}).populate('userId').sort({ createdAt: -1 }).limit(50);
    res.json(actividades);
  } catch (error) {
    console.error('Error al obtener actividades recientes:', error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getActividadesRecientes
};
