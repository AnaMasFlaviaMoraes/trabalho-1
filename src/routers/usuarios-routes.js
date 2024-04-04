const {Router} = require('express');

const router = Router();

const UsuariosController = require('../controllers/usuarios-controller');

const usuariosController = new UsuariosController();

router.get('/', (req, res) => usuariosController.listarUsuarios(req, res));

module.exports = router;