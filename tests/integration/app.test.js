const request = require("supertest");
const app = require("../../src/server");
const { predefinedJokes } = require("../../src/greeting");

describe("GET /hello", () => {
  it("should return Hey world", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey world!");
  });

  it("should return personalized greeting with name", async () => {
    const res = await request(app).get("/hello/Alice");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey Alice! Dis \"blague\" pour une vanne !");
  });

  it("should return a joke when name contains 'blague'", async () => {
    const res = await request(app).get("/hello/blague");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Voici une blague aléatoire:");
    expect(res.body).toHaveProperty("joke");
    expect(predefinedJokes).toContain(res.body.joke);
  });
});

describe("POST /hello", () => {
  it("should return Hey world with a name from header", async () => {
    const res = await request(app)
      .post("/hello")
      .set("x-name", "Bob");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey Bob! Dis \"blague\" pour une vanne !");
  });

  it("should return a joke when header contains 'blague'", async () => {
    const res = await request(app)
      .post("/hello")
      .set("x-name", "blague");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Voici une blague aléatoire:");
    expect(res.body).toHaveProperty("joke");
    expect(predefinedJokes).toContain(res.body.joke);
  });
});

describe("GET /joke", () => {
  it("should return a random joke", async () => {
    const res = await request(app).get("/joke");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("joke");
    expect(res.body).toHaveProperty("type", "random");
    expect(res.body).toHaveProperty("timestamp");
    expect(predefinedJokes).toContain(res.body.joke);
  });

  it("should return different jokes on multiple calls", async () => {
    const responses = await Promise.all([
      request(app).get("/joke"),
      request(app).get("/joke"),
      request(app).get("/joke")
    ]);

    const jokes = responses.map(res => res.body.joke);
    // With 30 jokes, probability of all 3 being same is very low
    expect(new Set(jokes).size).toBeGreaterThanOrEqual(2);
  });
});
