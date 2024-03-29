//Kevin Lam - khl225
const db = require('better-sqlite3')('top40.db');
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(
  path.resolve(__dirname, "public")
));


app.get('/artists', (req, res) => {
  const query = db.prepare('SELECT DISTINCT artist FROM songlist');
  const artists = query.all().map(row => row.artist);
  res.json(artists);
});

app.listen(3000, () => console.log("Starting up Top 40 Search"));


