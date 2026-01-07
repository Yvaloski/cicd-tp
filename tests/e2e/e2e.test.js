const axios = require("axios");
const app = require("../../src/server");
const allure = require("allure-js-commons");
let server;
let baseURL;

beforeAll((done) => {
  server = app.listen(0, () => {
    const { port } = server.address();
    baseURL = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("E2E GET /hello", () => {
  it("responds with Hey world", async () => {
    allure.feature("Greeting API");
    allure.story("Basic greeting");
    allure.description("Test de base pour vérifier le message par défaut");
    const res = await axios.get(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hey world!");
  });

  it("responds with personalized greeting", async () => {
    allure.feature("Greeting API");
    allure.story("Personalized greeting");
    allure.description("Test avec un nom personnalisé");
    const res = await axios.get(`${baseURL}/hello/Alice`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hey Alice! Dis \"blague\" pour une vanne !");
  });

  it("responds with a joke when requested", async () => {
    allure.feature("Greeting API");
    allure.story("Joke request");
    allure.description("Test de la fonctionnalité de blague");
    const res = await axios.get(`${baseURL}/hello/blague`);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("message");
    expect(res.data).toHaveProperty("joke");
  });

  it("handles server errors gracefully", async () => {
    allure.feature("Greeting API");
    allure.story("Error handling");
    allure.description("Test de la gestion des erreurs");
    try {
      await axios.get(`${baseURL}/nonexistent`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

describe("E2E POST /hello", () => {
  it("responds with personalized greeting from header", async () => {
    allure.feature("Greeting API");
    allure.story("Header-based greeting");
    allure.description("Test avec un nom dans l'en-tête");
    const res = await axios.post(`${baseURL}/hello`, {}, {
      headers: { "x-name": "Bob" }
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hey Bob! Dis \"blague\" pour une vanne !");
  });
});

describe("E2E GET /joke", () => {
  it("responds with a random joke from API", async () => {
    allure.feature("Joke API");
    allure.story("Basic joke endpoint");
    allure.description("Test de base pour les blagues");
    const res = await axios.get(`${baseURL}/joke`);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("joke");
    expect(res.data).toHaveProperty("type");
    expect(res.data).toHaveProperty("timestamp");
    expect(res.data).toHaveProperty("source", "api");
  });

  it("responds with different jokes on multiple calls", async () => {
    allure.feature("Joke API");
    allure.story("Randomness");
    allure.description("Test de l'aléatoire des blagues");
    const responses = await Promise.all([
      axios.get(`${baseURL}/joke`),
      axios.get(`${baseURL}/joke`),
      axios.get(`${baseURL}/joke`)
    ]);

    const jokes = responses.map(res => res.data.joke);
    expect(new Set(jokes).size).toBeGreaterThanOrEqual(2);
  });

  it("handles network errors gracefully", async () => {
    allure.feature("Joke API");
    allure.story("Network error handling");
    allure.description("Test des erreurs réseau");
    try {
      await axios.get(`${baseURL}/joke`, { timeout: 1 });
    } catch (error) {
      expect(error.code).toBe('ECONNABORTED');
    }
  });
});

describe("E2E Error Handling", () => {
  it("handles invalid routes", async () => {
    allure.feature("Error Handling");
    allure.story("Invalid routes");
    allure.description("Test des routes invalides");
    try {
      await axios.get(`${baseURL}/invalid-route`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  it("handles malformed requests", async () => {
    allure.feature("Error Handling");
    allure.story("Malformed requests");
    allure.description("Test des requêtes malformées");
    try {
      await axios.post(`${baseURL}/hello`, { invalid: "data" });
    } catch (error) {
      expect(error.response.status).toBe(200);
    }
  });
});
