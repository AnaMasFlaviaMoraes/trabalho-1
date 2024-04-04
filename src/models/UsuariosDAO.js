class UsuariosDAO{

    constructor(db){
        this.db = db;
    }

    getAll(){
        console.log("aqui", this.db);
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

    /*
    
    function buscarDB(){
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM usuarios", (err, rows) => {
            if(err){
                console.log(err);
            }
            console.log({rows});
        });
    });
}

const usuarios = buscarDB();
console.log({usuarios});
    */
}

module.exports = {UsuariosDAO};