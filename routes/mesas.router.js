const express = require('express');
const router = express.Router();
const mesasController = require('../controllers/mesasController');

router.get('/', mesasController.listarMesas);
router.put('/asignar/:id/:userId', mesasController.asignarMesa);
router.put('/liberar/:id', mesasController.liberarMesa);
router.post('/store', mesasController.crearMesa);
router.put('/editar/:id', mesasController.actualizarMesa);

module.exports = router;
