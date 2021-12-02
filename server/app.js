const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { colors, associations, words } = require("./models");
app.get("/colors/:word", (req, res) => {
  const { word } = req.params;
  colors
    .byWord(word)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((e) => console.log(e));
});

app.get("/randomColors/:num", (req, res) => {
  const totalColors = 100;
  const { num } = req.params;
  let array = [];
  for (let i = 0; i < num; i++) {
    array.push(Math.floor(Math.random() * totalColors));
  }
  colors
    .getRandom(array)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((e) => console.log(e));
});

app.post("/colors", (req, res) => {
  console.log(req.body);
  const { colorName, color } = req.body;
  let { description } = req.body;
  description = description || "";
  let colorId;
  const newWords = description.split(",").map((e) => e.trim().toLowerCase());

  colors
    .add(colorName, color)
    .then((result) => {
      colorId = result.rows[0].id;
      return Promise.all(
        newWords.map((word) => {
          return words.add(word);
        })
      );
    })
    .then((wordResultArray) => {
      console.log({ wordResultArray });
      const wordIdArray = wordResultArray.map((r) => r.rows[0].id);
      return Promise.all(
        wordIdArray.map((wordId) => {
          return associations.add(colorId, wordId);
        })
      );
    })
    .then((result) => console.log(result))
    .catch((e) => console.log(e));
});

module.exports = app;
