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

app.patch("/votes/:colorId/:word/:num", (req, res) => {
  associations
    .vote(req.params)
    .then(() => res.status(200).send())
    .catch((e) => {
      console.log(e);
      res.status(400).send(0);
    });
});

app.get("/randomColors/:num", (req, res) => {
  const totalColors = 100;
  let { num } = req.params;
  num = num || 5;
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
  const { colorName, color } = req.body;
  let { description } = req.body;
  description = description + `, ${colorName}` || colorName;
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
      const wordIdArray = wordResultArray.map((r) => r.rows[0].id);
      return Promise.all(
        wordIdArray.map((wordId) => {
          return associations.add(colorId, wordId);
        })
      );
    })
    .then((result) => {
      res.status(201).send();
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send();
    });
});

module.exports = app;
