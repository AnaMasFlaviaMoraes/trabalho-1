const db = require("../db-config/db-connection");
const {Usuarios} = require("../models/Usuarios");
const {UsuariosDAO} = require("../models/UsuariosDAO");

class UsuariosController{

    constructor(){
        this.usuariosDAO = new UsuariosDAO(db);
    }

    async listarUsuarios(req, res){
        try {
            const usuarios = await this.usuariosDAO.getAll();
            console.log({usuarios});
            res.send(usuarios);
        } catch (err) {
            // Handle error
            console.error(err);
            res.status(500).send("Ocorreu um erro ao buscar os usuários");
        }
    }
}

module.exports = UsuariosController;