//Kevin Lam - khl225
const db = require('better-sqlite3')('morewords.db');
const express = require("express");
const path = require("path");
const { off } = require('process');
const app = express();

app.use(express.static(
  path.resolve(__dirname, "public")
));


// Route to fetch a random word
app.get('/random-word', (req, res) => {
  const category = req.query.category; // Get the random word
  let query = `SELECT * from morewords where category = '${category}' ORDER BY RANDOM() LIMIT 1`;
  const words = db.prepare(query).get();
  res.json(words);
});

app.listen(3000, () => console.log("Starting up Hangman"));
