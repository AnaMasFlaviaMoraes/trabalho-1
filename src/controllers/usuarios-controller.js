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
            //res.send(usuarios);
            res.render("../views/usuarios", {usuarios: usuarios, ...estado});
        } catch (err) {
            // Handle error
            console.error(err);
            res.status(500).send("Ocorreu um erro ao buscar os usuários");
        }
    }

    showAddPage(req, res) {
        res.render('../views/add-usuario');
    }

    cadastraUsuario(req, res) {
        const { tipo, nome, cpf } = req.body;
        const usuario = new Usuarios(null, tipo, nome, cpf);
        const result = this.usuariosDAO.insert(usuario, (err, lastId) => {
            if (err) {
                // Tratando o erro, possivelmente enviando uma resposta HTTP 500
                res.status(500).send({ message: "Erro ao inserir usuário no banco de dados", error: err.message });
                return;
            }
    
            // // Se tudo ocorreu bem, envia uma resposta de sucesso.
            // res.status(201).send({ message: "Usuário inserido com sucesso", id: lastId });

            this.listarUsuarios(req, res, { cadastroSucesso: true });
        });
        // res.send(result);
    }

    async mostraUsuario(req, res) {
        try {
            const usuario = await this.usuariosDAO.getUser(req.params.id);
            console.log({usuario});
            //res.send(usuarios);
            res.render("../views/show-usuario", {usuario: usuario});
        } catch (err) {
            // Handle error
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
            // Handle error
            console.error(err);
            res.status(500).send("Ocorreu um erro ao buscar o usuário");
        }
    }

    async deletaUsuario(req, res){
        try {
            const usuario = await this.usuariosDAO.getUser(req.params.id);
            this.usuariosDAO.delete(usuario, (err) => {
                if (err) {
                    // Tratando o erro, possivelmente enviando uma resposta HTTP 500
                    res.status(500).send({ message: "Erro ao deletar usuário no banco de dados", error: err.message });
                    return;
                }
        
                // Se tudo ocorreu bem, envia uma resposta de sucesso.
                res.status(201).send({ message: "Usuário excluído com sucesso"});
            });
        } catch (err) {
            // Handle error
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
            // Handle error
            console.error(err);
            res.status(500).send("Ocorreu um erro ao buscar o usuário");
        }
    }

    editaUsuario(req, res) {
        const { tipo, nome, cpf } = req.body;
        const usuario = new Usuarios(req.params.id, tipo, nome, cpf);
        console.log("Usuario a ser editado: ", usuario);
        const result = this.usuariosDAO.edit(usuario, (err, lastId) => {
            if (err) {
                // Tratando o erro, possivelmente enviando uma resposta HTTP 500
                res.status(500).send({ message: "Erro ao atualizar usuário no banco de dados", error: err.message });
                return;
            }
    
            // // Se tudo ocorreu bem, envia uma resposta de sucesso.
            // res.status(201).send({ message: "Usuário editado com sucesso" });
        });
        this.listarUsuarios(req, res, { editaSucesso: true });
    }

    async relatorioUsuarios(req, res){
        const users = await this.usuariosDAO.getAll();
        const csv = parse(users, ['id', 'tipo', 'nome','email', 'telefone','cpf']);
    
        // Define o cabeçalho para indicar o download de um arquivo
        res.header('Content-Type', 'text/csv');
        res.attachment('usuarios.csv');
        
        // Envia o conteúdo CSV como resposta
        res.send(csv);
    }
        
}

module.exports = UsuariosController;