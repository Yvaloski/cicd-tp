const request = require("supertest");
const app = require("../../src/server");

describe("GET /hello", () => {
  it("should return Hey world", async () => {
    allure.feature('API Endpoints');
    allure.story('Default greeting');
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey world!");
  });

  it("should return personalized greeting with name", async () => {
    allure.feature('API Endpoints');
    allure.story('Personalized greeting');
    const res = await request(app).get("/hello/Alice");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey Alice! Dis \"blague\" pour une vanne !");
  });

  it("should return a joke when name contains 'blague'", async () => {
    allure.feature('API Endpoints');
    allure.story('Joke request');
    const res = await request(app).get("/hello/blague");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Voici une blague aléatoire:");
    expect(res.body).toHaveProperty("joke");
  });

  it("should handle special characters in name", async () => {
    allure.feature('API Endpoints');
    allure.story('Special characters');
    const res = await request(app).get("/hello/Jean-François");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey Jean-François! Dis \"blague\" pour une vanne !");
  });

  it("should handle very long names", async () => {
    allure.feature('API Endpoints');
    allure.story('Edge cases');
    const longName = "A".repeat(100);
    const res = await request(app).get(`/hello/${longName}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Hey " + longName);
  });
});

describe("POST /hello", () => {
  it("should return Hey world with a name from header", async () => {
    allure.feature('API Endpoints');
    allure.story('POST greeting');
    const res = await request(app)
      .post("/hello")
      .set("x-name", "Bob");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey Bob! Dis \"blague\" pour une vanne !");
  });

  it("should return a joke when header contains 'blague'", async () => {
    allure.feature('API Endpoints');
    allure.story('Joke request via POST');
    const res = await request(app)
      .post("/hello")
      .set("x-name", "blague");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Voici une blague aléatoire:");
    expect(res.body).toHaveProperty("joke");
  });

  it("should handle missing x-name header", async () => {
    allure.feature('API Endpoints');
    allure.story('Missing header');
    const res = await request(app)
      .post("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey world!");
  });

  it("should handle empty x-name header", async () => {
    allure.feature('API Endpoints');
    allure.story('Empty header');
    const res = await request(app)
      .post("/hello")
      .set("x-name", "");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey world!");
  });
});

describe("GET /joke", () => {
  it("should return a random joke from API", async () => {
    allure.feature('Joke API');
    allure.story('Random joke');
    const res = await request(app).get("/joke");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("joke");
    expect(res.body).toHaveProperty("type", "random");
    expect(res.body).toHaveProperty("timestamp");
    expect(res.body).toHaveProperty("source", "api");
  });

  it("should handle type parameter", async () => {
    allure.feature('Joke API');
    allure.story('Joke with type');
    const res = await request(app).get("/joke?type=animal");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("type", "animal");
  });

  it("should return valid timestamp", async () => {
    allure.feature('Joke API');
    allure.story('Timestamp validation');
    const res = await request(app).get("/joke");
    expect(res.statusCode).toBe(200);
    expect(new Date(res.body.timestamp)).toBeInstanceOf(Date);
  });
});

describe("GET /", () => {
  it("should serve the HTML interface", async () => {
    allure.feature('Frontend');
    allure.story('Homepage');
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
    expect(res.text).toContain("Blague du Jour");
  });
});
