const sqllit3 = window.require("sqlite3");

const db = new sqllit3.Database("./musik.db");
db.run('CREATE TABLE IF NOT EXISTS ALL_SONGS(URL)');

export default db;