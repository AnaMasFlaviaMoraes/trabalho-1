class UsuariosDAO{

    constructor(db){
        this.db = db;
    }

    getAll(callback){
        this.db.all("SELECT * FROM usuarios", [], (err, rows) => {
            if(err){
                return callback(err);
            }
            callback(null, rows);
        })

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