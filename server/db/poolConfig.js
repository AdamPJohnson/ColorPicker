const { Pool } = require("pg");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "colors",
  password: "vicfirthh11",
  port: 5432,
};
const pool = new Pool(credentials);

module.exports = pool;
