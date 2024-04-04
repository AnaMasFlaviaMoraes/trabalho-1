const db = require("../db-config/db-connection");
const {Usuarios} = require("../models/Usuarios");
const {UsuariosDAO} = require("../models/UsuariosDAO");

class UsuariosController{

    constructor(){
        this.usuariosDAO = new UsuariosDAO(db);
    }

    listarUsuarios(req, res){
        this.usuariosDAO.getAll((err, rows) => {
            if(err){
                console.log(err);
                return res.status(400).json(err);
            }
            const usuarios = rows.map(row => new Usuarios(row.id, row.tipo, row.nome, row.cpf));
            res.json(usuarios);
        }); 
    }
}

module.exports = UsuariosController;