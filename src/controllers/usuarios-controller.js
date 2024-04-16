const db = require("../db-config/db-connection");
const { Usuarios } = require("../models/Usuarios");
const { UsuariosDAO } = require("../models/UsuariosDAO");
const { parse } = require('json2csv');

class UsuariosController{

    constructor(){
        this.usuariosDAO = new UsuariosDAO(db);
    }

    async listarUsuarios(req, res, estado = {}){
        try {
            const usuarios = await this.usuariosDAO.getAll();
            console.log({usuarios});
            res.render("../views/usuarios", {usuarios: usuarios, ...estado});
        } catch (err) {
            console.error(err);
            res.status(500).send("Ocorreu um erro ao buscar os usuários");
        }
    }

    showAddPage(req, res) {
        res.render('../views/add-usuario');
    }

    cadastraUsuario(req, res) {
        const { tipo, nome, cpf, telefone, email } = req.body;
        const usuario = new Usuarios(null, tipo, nome, cpf, telefone, email);
        const result = this.usuariosDAO.insert(usuario, (err, lastId) => {
            if (err) {
                res.status(500).send({ message: "Erro ao inserir usuário no banco de dados", error: err.message });
                return;
            }

            this.listarUsuarios(req, res, { cadastroSucesso: true });
        });
    }

    async mostraUsuario(req, res) {
        try {
            const usuario = await this.usuariosDAO.getUser(req.params.id);
            console.log("Usuário encontrado: ", {usuario});
            res.render("../views/show-usuario", {usuario: usuario});
        } catch (err) {
            console.error(err);
            res.status(500).send("Ocorreu um erro ao buscar o usuário");
        }
    }

    async confirmaUsuario(req, res) {
        try{
            const usuario = await this.usuariosDAO.getUser(req.params.id);
            console.log("Usuario encontrado: ", usuario);
            res.render('../views/modal-confirm', {usuario: usuario});
        } catch (err) {
            console.error(err);
            res.status(500).send("Ocorreu um erro ao buscar o usuário");
        }
    }

    async deletaUsuario(req, res){
        try {
            const usuario = await this.usuariosDAO.getUser(req.params.id);
            this.usuariosDAO.delete(usuario, (err) => {
                if (err) {
                    res.status(500).send({ message: "Erro ao deletar usuário no banco de dados", error: err.message });
                    return;
                }
                this.listarUsuarios(req, res, { deleteSucesso: true });
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Ocorreu um erro ao buscar o usuário");
        }
    }

    async showEditPage(req, res) {
        try{
            const usuario = await this.usuariosDAO.getUser(req.params.id);
            console.log("Usuario encontrado: ", usuario);
            res.render('../views/edit-user', {usuario: usuario});
        } catch (err) {
            console.error(err);
            res.status(500).send("Ocorreu um erro ao buscar o usuário");
        }
    }

    editaUsuario(req, res) {
        const { tipo, nome, cpf, telefone, email } = req.body;
        const usuario = new Usuarios(req.params.id, tipo, nome, cpf, telefone, email);
        console.log("Usuario a ser editado: ", usuario);
        const result = this.usuariosDAO.edit(usuario, (err, lastId) => {
            if (err) {
                res.status(500).send({ message: "Erro ao atualizar usuário no banco de dados", error: err.message });
                return;
            }
        });
        this.listarUsuarios(req, res, { editaSucesso: true });
    }

    async relatorioUsuarios(req, res){
        const users = await this.usuariosDAO.getAll();
        const csv = parse(users, ['id', 'tipo', 'nome','email', 'telefone','cpf']);
    
        res.header('Content-Type', 'text/csv');
        res.attachment('usuarios.csv');
        res.send(csv);
    }
        
}

module.exports = UsuariosController;