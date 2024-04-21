const express = require('express')
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.get('/', ventasController.listarVentas);
router.post('/registrar-venta', ventasController.registrarVenta);

module.exports = router;
