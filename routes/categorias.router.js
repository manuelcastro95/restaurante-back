const express = require('express')
const router = express.Router();
const categoriasController = require('../controllers/categoriasController.js');

router.get('/', categoriasController.getCategorias);
router.get('/:id', categoriasController.getCategoria)
router.post('/store', categoriasController.storeCategoria)
router.put('/editar/:id', categoriasController.updateCategoria)
router.put('/update-status/:id', categoriasController.updateStatus)

module.exports = router;
