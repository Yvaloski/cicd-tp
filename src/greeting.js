async function fetchJokeFromAPI() {
  try {
    const response = await fetch('https://www.blagues-api.fr/api/random');
    const data = await response.json();

    // Vérifier que la blague est valide
    if (data && data.joke && data.answer) {
      return {
        joke: `${data.joke} ${data.answer}`,
        source: 'api',
        category: data.type || 'random'
      };
    }
    throw new Error('Blague invalide reçue de l\'API');
  } catch (error) {
    console.error('Erreur API blagues-api.fr:', error);
    throw new Error('Impossible de récupérer une blague de l\'API');
  }
}

async function getJoke() {
  return await fetchJokeFromAPI();
}

function getGreeting(name) {
  if (name && name.toLowerCase().includes('blague')) {
    return {
      message: "Voici une blague aléatoire:",
      joke: "Une blague de l'API sera générée"
    };
  }
  return name ? `Hey ${name}! Dis "blague" pour une vanne !` : "Hey world!";
}

module.exports = {
  getGreeting,
  getJoke
};
