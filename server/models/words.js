const pool = require("../db/poolConfig");

module.exports = {
  add: (word) => {
    return pool.query(
      `INSERT INTO words (word) VALUES('${word}') ON CONFLICT ON CONSTRAINT unique_word DO UPDATE SET word='${word}' RETURNING id `
    );
  },
};
