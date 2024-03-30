//Kevin Lam - khl225
const db = require('better-sqlite3')('top40.db');
const express = require("express");
const path = require("path");
const { off } = require('process');
const app = express();

app.use(express.static(
  path.resolve(__dirname, "public")
));

// query to get the artists from db
app.get('/artists', (req, res) => {
  const query = db.prepare('SELECT DISTINCT artist FROM songlist');
  const artists = query.all().map(row => row.artist);
  res.json(artists);
});

// Endpoint to fetch songs based on search criteria
app.get('/songs', (req, res) => {
  const { artist, keyword, displayPerPage, pageNum } = req.query;
  const offset = (pageNum - 1) * displayPerPage;
  let query = 'SELECT * FROM songlist';

  if (artist || keyword) {
    query += ' WHERE ';
    if (artist) {
      query += `artist = '${artist}'`;
      if (keyword) query += ' AND ';
    }
    if (keyword) {
      query += `title LIKE '%${keyword}%'`;
    }
  }
  // Count total number of matching songs
  let totalCount = db.prepare(query).all().length;
  query += ` LIMIT ${displayPerPage} OFFSET ${offset}`;
  const songs = db.prepare(query).all();
  res.json({ songs, totalCount });

});



app.listen(3000, () => console.log("Starting up Top 40 Search"));
