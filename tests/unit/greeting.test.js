const { getGreeting } = require("../../src/greeting");

describe("getGreeting", () => {
  it("returns the hey world message", () => {
    expect(getGreeting()).toBe("Hey world!");
  });

  it("returns the hey world message with a name", () => {
    expect(getGreeting("Alice")).toBe("Hey world! From Alice");
  });
});
