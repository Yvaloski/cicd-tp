async function fetchJokeFromAPI() {
  try {
    const response = await fetch('https://blague-api.vercel.app/api?mode=beauf');
    const data = await response.json();

    // Vérifier que la blague est valide
    if (data && data.blague && data.reponse) {
      return {
        joke: `${data.blague} ${data.reponse}`,
        source: 'api',
        category: 'beauf' // Cette API ne fournit qu'un seul type
      };
    }
    throw new Error('Blague invalide reçue de l\'API');
  } catch (error) {
    console.error('Erreur API blague-api.vercel.app:', error);
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
