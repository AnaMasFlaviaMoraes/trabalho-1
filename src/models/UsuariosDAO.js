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
                console.log({ rows });
                resolve(rows);
            });
        });
    }

    insert(usuario, callback) {
        // Preparando o comando SQL para inserir os dados
        const sql = `
        INSERT INTO usuarios (tipo, nome, cpf, telefone, email) VALUES (?, ?, ?, ?, ?)`;
    
        // Executando a consulta SQL
        this.db.run(sql, [usuario.tipo, usuario.nome, usuario.cpf, usuario.telefone, usuario.email], function(err) {
            if (err) {
                // Caso ocorra algum erro, o callback é chamado com o erro
                callback(err);
                return;
            }
            // Se a inserção for bem-sucedida, o callback é chamado sem erro e com o ID do registro inserido
            // 'this' refere-se ao statement que acabou de ser executado. 'this.lastID' contém o ID do último registro inserido
            callback(null, this.lastID);
        });
    }

    delete(usuario, callback) {
        // Preparando o comando SQL para deletar os dados
        const sql = `
        DELETE FROM usuarios WHERE id = ?`;
    
        // Executando a consulta SQL
        this.db.run(sql, [usuario.id], function(err) {
            if (err) {
                // Caso ocorra algum erro, o callback é chamado com o erro
                callback(err);
                return;
            }
            // Se a deleção for bem-sucedida, o callback é chamado sem erro
            callback(null);
        });
    }

    edit(usuario, callback) {
    
     // Definindo a instrução SQL para atualizar os dados do usuário
        const sql = `
            UPDATE usuarios
                SET tipo = ?, nome = ?, cpf = ?, telefone = ?, email = ?
                WHERE id = ?
            `;
        
        // Parâmetros para a query SQL, incluindo os novos valores para 'tipo', 'nome', e 'cpf', além do 'id' do usuário que está sendo editado
        const parametros = [usuario.tipo, usuario.nome, usuario.cpf, usuario.telefone, usuario.email, usuario.id];
        
        // Executando a instrução SQL
        this.db.run(sql, parametros, function(err) {
             if (err) {
                callback(err);
                return;
            }
            // Se a atualização for bem-sucedida, 'this.changes' contém o número de linhas afetadas
            callback(null, this.changes);
        });
    }
}

module.exports = {UsuariosDAO};