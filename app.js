//Kevin Lam - khl225
const db = require('better-sqlite3')('words.db');
const express = require("express");
const path = require("path");
const { off } = require('process');
const app = express();

app.use(express.static(
  path.resolve(__dirname, "public")
));

// query to get the artists from db
// Function to fetch a random word from the database
function getRandomWord() {
  const query = "SELECT * FROM wordslist ORDER BY RANDOM() LIMIT 1";
  const word = db.prepare(query).get(); // Fetch a single random row
  return word;
}

// Route to fetch a random word
app.get('/random-word', (req, res) => {
  const word = getRandomWord(); // Get the random word
  res.json(word); // Return the word as JSON
});



app.listen(3000, () => console.log("Starting up Hangman"));
