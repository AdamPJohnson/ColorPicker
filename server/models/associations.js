const pool = require("../db/poolConfig");

module.exports = {
  add: (colorId, wordId) => {
    return pool.query(
      `INSERT INTO associations (word_id, color_id) VALUES (${wordId}, ${colorId})`
    );
  },
  update: (upOrDown) => {
    return pool.query();
  },
};
