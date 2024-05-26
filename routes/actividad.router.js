const express = require('express');
const router = express.Router();
const { getActividadesRecientes } = require('../controllers/actividadesController');

// Ruta para obtener las actividades recientes
router.get('/', getActividadesRecientes);

module.exports = router;
