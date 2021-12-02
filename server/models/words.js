const pool = require("../db/poolConfig");

module.exports = {
  add: (word) => {
    console.log(word);
    return pool.query(
      `INSERT INTO words (word) VALUES('${word.toLowerCase()}') ON CONFLICT ON CONSTRAINT unique_word DO UPDATE SET word='${word.toLowerCase()}' RETURNING id `
    );
  },
};
