const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

let notes = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/create', (req, res) => {
  const noteId = uuidv4();
  notes[noteId] = req.body.content;
  res.redirect(`/note/${noteId}`);
});

app.get('/note/:id', (req, res) => {
  const noteId = req.params.id;
  if (notes[noteId]) {
    res.send(`
      <html>
      <head>
        <title>Note ${noteId}</title>
      </head>
      <body>
        <h1>Note ID: ${noteId}</h1>
        <p>${notes[noteId]}</p>
        <a href="/">Create another note</a>
      </body>
      </html>
    `);
  } else {
    res.status(404).send('Note not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
