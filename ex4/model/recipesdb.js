const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/recipes.db');

db.getCount = function () {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.all('select count(ID) from recipes', function (err, row) {
            if (err) reject(err);
            else resolve(row[0]['count(ID)']);
        });
    });
};

db.getData = function () {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.all('select * from recipes', (err, row)=>{
            if (err) reject(err);
            else resolve(row);
        });
    });
};

db.getQuery = function (query) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.all('select * from recipes where Description like "%'+ query + '%";', (err, row)=>{
            if (err) reject(err);
            else resolve(row);
        });
    });
};

db.remove = function (id) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.run('delete from recipes where ID = '+ id + ';', (err, row)=>{
            if (err) {resolve(0);}
            else resolve(1);
        });
    });
};

module.exports = class DbController {

    static initDb(){
        db.serialize(function() {
            db.run('create table if not exists recipes (ID integer primary key autoincrement,\ ' +
                'Author TEXT, Description TEXT)');
            db.getCount().then((count)=>{
                if(count === 0){
                    var stmt = db.prepare('insert into recipes(Author,Description) values(?,?)');
                    stmt.run("The Author Of This Magic", "michael shriki & kfir matityahu");
                    stmt.finalize();
                }
            });
        });
    }

    static addRecipe(author, description)
    {
        var stmt = db.prepare('insert into recipes(Author,Description) values(?,?)');
        stmt.run(author, description);
        stmt.finalize();
    }

    static getData(){return db.getData();}
    static removeData(id){return db.remove(id);}
    static getCount(){return db.getCount();}
    static getByQuery(txt){return db.getQuery(txt);}
};