class Usuarios {
    constructor(id, tipo, nome, cpf, telefone, email){
        this.id = id;
        this.tipo = tipo;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
    }
}

module.exports = { Usuarios};