const {Router} = require('express');

const router = Router();

const UsuariosController = require('../controllers/usuarios-controller');

const usuariosController = new UsuariosController();

router.get('/', (req, res) => usuariosController.listarUsuarios(req, res));
router.get('/adicionar', (req, res) => usuariosController.showAddPage(req, res));
router.post('', (req, res) => usuariosController.cadastraUsuario(req, res));
router.get('/editar/:id', (req, res) => usuariosController.showEditPage(req, res));
router.post('/:id', (req, res) => usuariosController.editaUsuario(req, res));
router.get('/confirm-delete/:id', (req, res) => usuariosController.confirmaUsuario(req, res));
router.get('/deletar/:id', (req, res) => usuariosController.deletaUsuario(req, res));
router.get('/relatorio', (req, res) => usuariosController.relatorioUsuarios(req, res));
router.get('/:id', (req, res) => usuariosController.mostraUsuario(req, res));

module.exports = router;