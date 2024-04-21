const express = require('express')
const router = express.Router();
const rolesController = require('../controllers/rolesController');

router.get('/', rolesController.getRoles);
router.get('/:id', rolesController.getRole)
router.post('/store', rolesController.storeRole)
router.put('/editar/:id', rolesController.updateRole)
router.put('/update-status/:id', rolesController.updateStatus)

module.exports = router;
