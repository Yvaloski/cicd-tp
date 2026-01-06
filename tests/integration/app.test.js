const request = require("supertest");
const app = require("../../src/server");

describe("GET /hello", () => {
  it("should return Hey world", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey world!");
  });

  it("should return Hey world with a name", async () => {
    const res = await request(app).get("/hello/Alice");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey world! From Alice");
  });
});

describe("POST /hello", () => {
  it("should return Hey world with a name from header", async () => {
    const res = await request(app)
      .post("/hello")
      .set("x-name", "Bob");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hey world! From Bob");
  });
});
