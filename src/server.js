const express = require("express");
const { getGreeting, generateJoke, storeJoke, rateJoke, getTopJokes, getRecentJokes } = require("./greeting");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
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

// Nouveaux endpoints pour les blagues
app.get("/joke", (req, res) => {
  const type = req.query.type || 'random';
  const joke = generateJoke(type);
  const jokeId = storeJoke(joke);
  res.json({
    id: jokeId,
    joke,
    type,
    rating: { up: 0, down: 0 },
    createdAt: new Date()
  });
});

app.get("/joke/:type", (req, res) => {
  const joke = generateJoke(req.params.type);
  const jokeId = storeJoke(joke);
  res.json({
    id: jokeId,
    joke,
    type: req.params.type,
    rating: { up: 0, down: 0 },
    createdAt: new Date()
  });
});

app.post("/joke/:id/rate", (req, res) => {
  const { rating } = req.body;
  if (!['up', 'down'].includes(rating)) {
    return res.status(400).json({ error: "Rating must be 'up' or 'down'" });
  }
  const result = rateJoke(req.params.id, rating);
  if (!result) {
    return res.status(404).json({ error: "Blague non trouvée" });
  }
  res.json(result);
});

app.get("/joke/top", (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  res.json(getTopJokes(limit));
});

app.get("/joke/recent", (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  res.json(getRecentJokes(limit));
});

app.get("/joke/:id", (req, res) => {
  const joke = Object.values(require('./greeting').jokeRatings || {}).find(j => j.id === req.params.id);
  if (!joke) {
    return res.status(404).json({ error: "Blague non trouvée" });
  }
  res.json(joke);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Endpoints disponibles:`);
    console.log(`- GET /hello/:name?`);
    console.log(`- POST /hello`);
    console.log(`- GET /joke?type=[animal|food|tech|random]`);
    console.log(`- GET /joke/[type]`);
    console.log(`- POST /joke/:id/rate`);
    console.log(`- GET /joke/top`);
    console.log(`- GET /joke/recent`);
    console.log(`- GET /joke/:id`);
  });
}

module.exports = app;
