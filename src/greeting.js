const jokeRatings = {};
const jokeHistory = [];

const predefinedJokes = {
  'animal': [
    "Pourquoi le poulet a-t-il traversé la route ? Pour prouver qu'il n'était pas une poule !",
    "Que dit un poisson philosophe ? 'Je pense, donc je nage'",
    "Pourquoi les canards sont toujours de bonne humeur ? Parce qu'ils ont toujours le sourire aux lèvres !",
    "Comment appelle-t-on un chat qui fait du ski ? Un chat-pine !",
    "Pourquoi les vaches regardent-elles toujours vers le sud ? Parce que le nord, c'est trop loin !",
    "Qu'est-ce qu'un lapin qui fait du vélo ? Un lapin qui roule des mécaniques !",
    "Pourquoi les chiens n'aiment pas les ordinateurs ? Parce qu'ils préfèrent les os !",
    "Comment fait un chien pour traverser une rivière ? Il aboie et prend le bateau !",
    "Pourquoi les poules ne traversent-elles jamais en ligne droite ? Parce qu'elles préfèrent faire des zigzags !",
    "Qu'est-ce qu'un chat qui fait du parachutisme ? Un chat qui a les poils en l'air !"
  ],
  'food': [
    "Pourquoi les pizzas sont-elles toujours en retard ? Parce qu'elles sont livrées à domicile !",
    "Qu'est-ce qu'un burger timide ? Un burger qui rougit quand on le regarde !",
    "Pourquoi les sushis sont-ils si calmes ? Parce qu'ils sont toujours bien roulés !",
    "Comment appelle-t-on un croissant qui fait du sport ? Un croissant qui court !",
    "Pourquoi les pâtes sont-elles toujours en retard ? Parce qu'elles sont toujours al dente !",
    "Qu'est-ce qu'un taco qui fait de la musique ? Un taco qui a du son !",
    "Pourquoi les glaces sont-elles toujours de bonne humeur ? Parce qu'elles sont toujours cool !",
    "Comment fait un burger pour se défendre ? Il met de la moutarde !",
    "Pourquoi les frites sont-elles toujours en groupe ? Parce qu'elles sont meilleures ensemble !",
    "Qu'est-ce qu'une pizza qui fait du théâtre ? Une pizza qui joue la comédie !"
  ],
  'tech': [
    "Pourquoi le développeur a-t-il traversé la route ? Pour aller de l'autre côté (du code) !",
    "Qu'est-ce qu'un bug qui fait du sport ? Un bug qui court en boucle !",
    "Pourquoi JavaScript et moi on s'entend bien ? Parce qu'on a tous les deux des promesses !",
    "Comment appelle-t-on un développeur qui fait du jardinage ? Un développeur qui plante des bugs !",
    "Pourquoi les ordinateurs n'aiment-ils pas l'hiver ? Parce qu'ils ont peur des windows !",
    "Qu'est-ce qu'un programmeur qui fait de la musique ? Un programmeur qui a du code !",
    "Pourquoi les développeurs préfèrent-ils le noir ? Parce que la lumière attire les bugs !",
    "Comment fait un développeur pour se détendre ? Il fait du debug !",
    "Pourquoi les serveurs sont-ils toujours en retard ? Parce qu'ils ont trop de requêtes !",
    "Qu'est-ce qu'un algorithme qui fait du sport ? Un algorithme qui court en O(n) !"
  ]
};

function generateJoke(type = 'random') {
  const jokeTemplates = {
    'animal': () => {
      const animals = ['chien', 'chat', 'poulet', 'vache', 'canard', 'lapin'];
      const animal = animals[Math.floor(Math.random() * animals.length)];
      const actions = ['traverse', 'court', 'saute', 'nage'];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const reasons = [
        'pour aller chez le vétérinaire',
        'pour échapper au fermier',
        'parce qu\'il a vu un os',
        'pour rejoindre ses amis',
        'parce qu\'il a entendu un bruit',
        'pour attraper un papillon'
      ];
      const reason = reasons[Math.floor(Math.random() * reasons.length)];
      return `Pourquoi le ${animal} ${action}-t-il la route ? ${reason} !`;
    },
    'food': () => {
      const foods = ['pizza', 'pâtes', 'burger', 'sushi', 'taco', 'croissant'];
      const food = foods[Math.floor(Math.random() * foods.length)];
      const problems = ['brûlé', 'trop cuit', 'gelé', 'volé', 'perdu'];
      const problem = problems[Math.floor(Math.random() * problems.length)];
      const reactions = ['pleurer', 'crier', 's\'énerver', 'appeler le livreur', 'demander un remboursement'];
      const reaction = reactions[Math.floor(Math.random() * reactions.length)];
      return `Qu'est-ce qui fait ${reaction} un ${food} ${problem} ? Un cuisinier qui a oublié de régler le four !`;
    },
    'tech': () => {
      const techs = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'];
      const tech = techs[Math.floor(Math.random() * techs.length)];
      const errors = ['erreur 404', 'bug', 'segfault', 'memory leak', 'race condition'];
      const error = errors[Math.floor(Math.random() * errors.length)];
      const solutions = ['redémarrer l\'ordinateur', 'relire le code', 'boire un café', 'appeler un collègue', 'pleurer dans un coin'];
      const solution = solutions[Math.floor(Math.random() * solutions.length)];
      return `Comment résoudre une ${error} en ${tech} ? En ${solution} !`;
    },
    'random': () => {
      const templates = ['animal', 'food', 'tech'];
      return jokeTemplates[templates[Math.floor(Math.random() * templates.length)]]();
    }
  };

  // 70% de chances d'avoir une blague pré-écrite, 30% de génération
  if (Math.random() < 0.7 && predefinedJokes[type]) {
    return predefinedJokes[type][Math.floor(Math.random() * predefinedJokes[type].length)];
  }
  return jokeTemplates[type]();
}

function storeJoke(joke) {
  const jokeId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  jokeRatings[jokeId] = {
    id: jokeId,
    joke,
    up: 0,
    down: 0,
    createdAt: new Date(),
    type: joke.includes('animal') ? 'animal' :
          joke.includes('food') ? 'food' :
          joke.includes('tech') ? 'tech' : 'random'
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
  return name ? `Hey ${name}! Dis "blague:[animal/food/tech]" pour une vanne !` : "Hey world!";
}

module.exports = {
  getGreeting,
  generateJoke,
  storeJoke,
  rateJoke,
  getTopJokes,
  getRecentJokes,
  predefinedJokes // Exporté pour les tests
};
