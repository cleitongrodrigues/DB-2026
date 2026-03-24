import sqlite3 from "sqlite3";

sqlite3.verbose();

export const db = new sqlite3.Database(
    "./database.sqlite",
    (err) => {
        if (err){
            console.error("Erro ao conectar ao banco de dados:", err.message);
        } else {
            console.log("Conexão ao banco de dados estabelecida com sucesso.");
        }
    }
);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Generos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL
            );
        `);
});