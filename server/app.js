const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { colors } = require("./models");
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

module.exports = app;
