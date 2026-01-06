const axios = require("axios");
const app = require("../../src/server");
const { predefinedJokes } = require("../../src/greeting");
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
    const res = await axios.get(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hey world!");
  });

  it("responds with personalized greeting", async () => {
    const res = await axios.get(`${baseURL}/hello/Alice`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hey Alice! Dis \"blague\" pour une vanne !");
  });

  it("responds with a joke when requested", async () => {
    const res = await axios.get(`${baseURL}/hello/blague`);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("message");
    expect(res.data).toHaveProperty("joke");
    expect(predefinedJokes).toContain(res.data.joke);
  });
});

describe("E2E POST /hello", () => {
  it("responds with personalized greeting from header", async () => {
    const res = await axios.post(`${baseURL}/hello`, {}, {
      headers: { "x-name": "Bob" }
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hey Bob! Dis \"blague\" pour une vanne !");
  });
});

describe("E2E GET /joke", () => {
  it("responds with a random joke", async () => {
    const res = await axios.get(`${baseURL}/joke`);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("joke");
    expect(res.data).toHaveProperty("type");
    expect(res.data).toHaveProperty("timestamp");
    expect(predefinedJokes).toContain(res.data.joke);
  });

  it("responds with different jokes on multiple calls", async () => {
    const responses = await Promise.all([
      axios.get(`${baseURL}/joke`),
      axios.get(`${baseURL}/joke`),
      axios.get(`${baseURL}/joke`)
    ]);

    const jokes = responses.map(res => res.data.joke);
    expect(new Set(jokes).size).toBeGreaterThanOrEqual(2);
  });
});
