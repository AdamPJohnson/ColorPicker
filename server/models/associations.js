const pool = require("../db/poolConfig");

module.exports = {
  add: (colorId, wordId) => {
    return pool.query(
      `INSERT INTO associations (word_id, color_id) VALUES (${wordId}, ${colorId}) ON CONFLICT ON CONSTRAINT unique_association DO UPDATE SET word_id='${wordId}' RETURNING id`
    );
  },
  update: (upOrDown) => {
    return pool.query();
  },
};
