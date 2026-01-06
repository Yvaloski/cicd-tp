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

  it("should handle special characters in name", async () => {
    const res = await request(app).get("/hello/Jean-François");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey Jean-François! Dis \"blague\" pour une vanne !");
  });

  it("should handle very long names", async () => {
    const longName = "A".repeat(100);
    const res = await request(app).get(`/hello/${longName}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Hey " + longName);
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

  it("should handle missing x-name header", async () => {
    const res = await request(app)
      .post("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey world!");
  });

  it("should handle empty x-name header", async () => {
    const res = await request(app)
      .post("/hello")
      .set("x-name", "");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey world!");
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
    expect(new Set(jokes).size).toBeGreaterThanOrEqual(2);
  });

  it("should handle type parameter", async () => {
    const res = await request(app).get("/joke?type=animal");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("type", "animal");
  });

  it("should handle invalid type parameter", async () => {
    const res = await request(app).get("/joke?type=invalid");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("type", "invalid");
    expect(predefinedJokes).toContain(res.body.joke);
  });

  it("should return valid timestamp", async () => {
    const res = await request(app).get("/joke");
    expect(res.statusCode).toBe(200);
    expect(new Date(res.body.timestamp)).toBeInstanceOf(Date);
  });
});

describe("GET /", () => {
  it("should serve the HTML interface", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
    expect(res.text).toContain("Blague du Jour");
  });
});
