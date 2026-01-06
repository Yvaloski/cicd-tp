const predefinedJokes = [
  // Blagues animales
  "Pourquoi le poulet a-t-il traversé la route ? Pour aller de l'autre côté !",
  "Que dit un poisson quand il rencontre un autre poisson ? 'Salut, ça va ?'",
  "Pourquoi les canards sont toujours de bonne humeur ? Parce qu'ils ont toujours le sourire aux lèvres !",
  "Comment appelle-t-on un chat qui fait du ski ? Un chat-pine !",
  "Pourquoi les vaches regardent-elles toujours vers le sud ? Parce que le nord, c'est trop loin !",
  "Qu'est-ce qu'un lapin qui fait du vélo ? Un lapin qui roule des mécaniques !",
  "Pourquoi les chiens n'aiment pas les ordinateurs ? Parce qu'ils préfèrent les os !",
  "Comment fait un chien pour traverser une rivière ? Il aboie et prend le bateau !",
  "Pourquoi les poules ne traversent-elles jamais en ligne droite ? Parce qu'elles préfèrent faire des zigzags !",
  "Qu'est-ce qu'un chat qui fait du parachutisme ? Un chat qui a les poils en l'air !",

  // Blagues nourriture
  "Pourquoi les pizzas sont-elles toujours en retard ? Parce qu'elles sont livrées à domicile !",
  "Qu'est-ce qu'un burger timide ? Un burger qui rougit quand on le regarde !",
  "Pourquoi les sushis sont-ils si calmes ? Parce qu'ils sont toujours bien roulés !",
  "Comment appelle-t-on un croissant qui fait du sport ? Un croissant qui court !",
  "Pourquoi les pâtes sont-elles toujours en retard ? Parce qu'elles sont toujours al dente !",
  "Qu'est-ce qu'un taco qui fait de la musique ? Un taco qui a du son !",
  "Pourquoi les glaces sont-elles toujours de bonne humeur ? Parce qu'elles sont toujours cool !",
  "Comment fait un burger pour se défendre ? Il met de la moutarde !",
  "Pourquoi les frites sont-elles toujours en groupe ? Parce qu'elles sont meilleures ensemble !",
  "Qu'est-ce qu'une pizza qui fait du théâtre ? Une pizza qui joue la comédie !",

  // Blagues technologie
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
];

function getRandomJoke() {
  return predefinedJokes[Math.floor(Math.random() * predefinedJokes.length)];
}

function getGreeting(name) {
  if (name && name.toLowerCase().includes('blague')) {
    return {
      message: "Voici une blague aléatoire:",
      joke: getRandomJoke()
    };
  }
  return name ? `Hey ${name}! Dis "blague" pour une vanne !` : "Hey world!";
}

module.exports = {
  getGreeting,
  getRandomJoke,
  predefinedJokes
};
