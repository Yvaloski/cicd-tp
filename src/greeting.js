const jokeRatings = {};
const jokeHistory = [];

function generateJoke(type = 'random') {
  const jokeTemplates = {
    'animal': () => {
      const animals = ['chien', 'chat', 'poulet', 'vache', 'canard', 'lapin'];
      const animal = animals[Math.floor(Math.random() * animals.length)];
      const verbs = ['traversé', 'couru', 'sauté', 'nagé'];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      return `Pourquoi le ${animal} a ${verb} la route ? Pour prouver qu'il n'était pas un poulet !`;
    },
    'food': () => {
      const foods = ['pizza', 'pâtes', 'burger', 'sushi', 'taco', 'croissant'];
      const food = foods[Math.floor(Math.random() * foods.length)];
      const problems = ['brûlé', 'trop cuit', 'gelé', 'volé', 'perdu'];
      const problem = problems[Math.floor(Math.random() * problems.length)];
      return `Qu'est-ce qui est pire qu'un ${food} ${problem} ? Un ${food} qui vous ${problem} !`;
    },
    'tech': () => {
      const techs = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'];
      const tech = techs[Math.floor(Math.random() * techs.length)];
      const errors = ['erreur 404', 'bug', 'segfault', 'memory leak', 'race condition'];
      const error = errors[Math.floor(Math.random() * errors.length)];
      return `Pourquoi le développeur ${tech} a pleuré ? À cause d'une ${error} dans son code !`;
    },
    'random': () => {
      const templates = ['animal', 'food', 'tech'];
      return jokeTemplates[templates[Math.floor(Math.random() * templates.length)]]();
    }
  };

  return jokeTemplates[type]();
}

function storeJoke(joke) {
  const jokeId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  jokeRatings[jokeId] = {
    id: jokeId,
    joke,
    up: 0,
    down: 0,
    createdAt: new Date()
  };
  jokeHistory.push(jokeId);
  return jokeId;
}

function rateJoke(jokeId, rating) {
  if (jokeRatings[jokeId]) {
    if (rating === 'up') jokeRatings[jokeId].up++;
    else if (rating === 'down') jokeRatings[jokeId].down++;
    return jokeRatings[jokeId];
  }
  return null;
}

function getTopJokes(limit = 5) {
  return Object.values(jokeRatings)
    .sort((a, b) => (b.up - b.down) - (a.up - a.down))
    .slice(0, limit);
}

function getRecentJokes(limit = 5) {
  return jokeHistory
    .slice(-limit)
    .reverse()
    .map(id => jokeRatings[id])
    .filter(Boolean);
}

function getGreeting(name) {
  if (name && name.toLowerCase().includes('blague')) {
    const type = name.split(':')[1] || 'random';
    const joke = generateJoke(type);
    const jokeId = storeJoke(joke);
    return {
      message: `Voici ta blague ${type}:`,
      joke,
      jokeId,
      rating: { up: 0, down: 0 }
    };
  }
  return name ? `Hey ${name}! Dis "blague:[type]" pour une vanne (animal/food/tech)!` : "Hey world!";
}

module.exports = {
  getGreeting,
  generateJoke,
  storeJoke,
  rateJoke,
  getTopJokes,
  getRecentJokes
};
