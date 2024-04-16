class UsuariosDAO{

    constructor(db){
        this.db = db;
    }

    getAll(){
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM usuarios', (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log({ rows });
                resolve(rows);
            });
        });
    }

    getUser(id){
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM usuarios WHERE id = ?', [id],(err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    insert(usuario, callback) {
        const sql = `
        INSERT INTO usuarios (tipo, nome, cpf, telefone, email) VALUES (?, ?, ?, ?, ?)`;
        this.db.run(sql, [usuario.tipo, usuario.nome, usuario.cpf, usuario.telefone, usuario.email], function(err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, this.lastID);
        });
    }

    delete(usuario, callback) {
        const sql = `
        DELETE FROM usuarios WHERE id = ?`;
    
        this.db.run(sql, [usuario.id], function(err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    }

    edit(usuario, callback) {
        const sql = `
            UPDATE usuarios
                SET tipo = ?, nome = ?, cpf = ?, telefone = ?, email = ?
                WHERE id = ?
            `;
        
        const parametros = [usuario.tipo, usuario.nome, usuario.cpf, usuario.telefone, usuario.email, usuario.id];
        
        this.db.run(sql, parametros, function(err) {
             if (err) {
                callback(err);
                return;
            }
            
            callback(null, this.changes);
        });
    }
}

module.exports = {UsuariosDAO};