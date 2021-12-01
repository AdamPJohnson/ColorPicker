const pool = require("../db/poolConfig");

module.exports = {
  getRandom: (array) => {
    let string = "(";
    array.forEach((e) => (string += e + ","));
    string = string.slice(0, -1) + ")";
    console.log(string);
    return pool.query(`SELECT * FROM colors WHERE id in ${string}`);
  },
};
