const axios = require("axios");
const app = require("../../src/server");
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

  it("responds with Hey world and a name", async () => {
    const res = await axios.get(`${baseURL}/hello/Alice`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hey world! From Alice");
  });
});

describe("E2E POST /hello", () => {
  it("responds with Hey world and a name from header", async () => {
    const res = await axios.post(`${baseURL}/hello`, {}, {
      headers: { "x-name": "Bob" }
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hey world! From Bob");
  });
});
