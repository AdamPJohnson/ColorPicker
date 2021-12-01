const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { colors } = require("./models");
app.get("/colors", (req, res) => {
  console.log(req.body);

  res.status(200).send("testing");
});
app.get("/randomColors/:num", (req, res) => {
  const totalColors = 100;
  const { num } = req.params;
  let array = [];
  for (let i = 0; i < num; i++) {
    array.push(Math.floor(Math.random() * totalColors));
  }
  array = [0, 1, 2, 3, 4, 5];
  colors.getRandom(array).then((result) => {
    res.status(200).send(result.rows);
  });
});

module.exports = app;
