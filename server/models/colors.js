const pool = require("../db/poolConfig");

module.exports = {
  getRandom: (array) => {
    let string = "(";
    array.forEach((e) => (string += e + ","));
    string = string.slice(0, -1) + ")";

    return pool.query(`SELECT * FROM colors WHERE id in ${string}`);
  },
  byWord: (word) => {
    return pool.query(
      `select * from colors where id in (select color_id from associations where word_id=(select id from words where word='${word.toLowerCase()}') ORDER BY RANDOM() LIMIT 5) ;`
    );
  },
  add: (colorName, color) => {
    return pool.query(
      `INSERT INTO colors (name, hex) VALUES ('${colorName}','${color}') ON CONFLICT ON CONSTRAINT unique_color DO UPDATE SET hex='${color}' RETURNING id `
    );
  },
};
