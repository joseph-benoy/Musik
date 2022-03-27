const sqllit3 = window.require("sqlite3");

const db = new sqllit3.Database("./musik.db");
db.run('CREATE TABLE IF NOT EXISTS ALL_SONGS(TITLE TEXT,URL TEXT,UNIQUE(TITLE,URL))');
db.run('CREATE TABLE IF NOT EXISTS FAV(TITLE TEXT,URL TEXT,UNIQUE(TITLE,URL))');
//db.run("DROP TABLE ALL_SONGS");
export default db;