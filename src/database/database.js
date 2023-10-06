const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/banco/database.db');

async function createTablePost(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    data TEXT NOT NULL,
    userID INTEGER NOT NULL,
    likes,
    comentarios
    )`);
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    verificado TEXT,
    usuario TEXT,
    nome TEXT,
    senha TEXT,
    email TEXT,
    seguidores INT,
    seguindo INT,
    posts INT
    )`);
  db.run(`
  CREATE TABLE IF NOT EXISTS seguir (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_seguidor INT,
  id_seguido INT
  )`)
}

function openDatabase() {
  return new sqlite3.Database('./database/banco/database.db')
}

function initialize() {
  db.serialize(async () => {
    await createTablePost(db);
    db.close()
  })
}
initialize();

module.exports = {
  db,
  initialize,
  openDatabase
}