const express = require("express");
const path = require("path");
const { getGreeting, getRandomJoke } = require("./greeting");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

app.get("/hello/:name?", (req, res) => {
  const name = req.params.name;
  const result = getGreeting(name);

  if (typeof result === 'object') {
    res.json(result);
  } else {
    res.send(result);
  }
});

app.post("/hello", (req, res) => {
  const name = req.headers["x-name"];
  const result = getGreeting(name);

  if (typeof result === 'object') {
    res.json(result);
  } else {
    res.send(result);
  }
});

// Endpoint unique pour les blagues
app.get("/joke", (req, res) => {
  const type = req.query.type || 'random';
  res.json({
    joke: getRandomJoke(),
    type: type,
    timestamp: new Date().toISOString()
  });
});

// Route pour servir l'interface web
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Endpoints disponibles:`);
    console.log(`- GET /`);
    console.log(`- GET /hello/:name?`);
    console.log(`- POST /hello`);
    console.log(`- GET /joke`);
  });
}

module.exports = app;
