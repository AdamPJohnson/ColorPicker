const pool = require("../db/poolConfig");

module.exports = {
  add: (colorId, wordId) => {
    return pool.query(
      `INSERT INTO associations (word_id, color_id) VALUES (${wordId}, ${colorId}) ON CONFLICT ON CONSTRAINT unique_association DO UPDATE SET word_id='${wordId}' RETURNING id`
    );
  },
  vote: (params) => {
    const { colorId, word, num } = params;

    return pool.query(
      `UPDATE associations set vote_score = vote_score + ${num} WHERE color_id=${colorId} and word_id=(SELECT id FROM words WHERE word='${word.toLowerCase()}')`
    );
  },
};
