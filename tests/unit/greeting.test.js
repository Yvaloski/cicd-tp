const { getGreeting, getJoke } = require("../../src/greeting");

describe("getGreeting", () => {
  it("returns the hey world message", () => {
    expect(getGreeting()).toBe("Hey world!");
  });

  it("returns the hey world message with a name", () => {
    expect(getGreeting("Alice")).toBe("Hey Alice! Dis \"blague\" pour une vanne !");
  });

  it("returns a joke when name contains 'blague'", () => {
    const result = getGreeting("blague");
    expect(result).toHaveProperty("message", "Voici une blague aléatoire:");
    expect(result).toHaveProperty("joke");
  });

  it("handles empty string name", () => {
    expect(getGreeting("")).toBe("Hey world!");
  });

  it("handles null name", () => {
    expect(getGreeting(null)).toBe("Hey world!");
  });

  it("handles undefined name", () => {
    expect(getGreeting(undefined)).toBe("Hey world!");
  });

  it("handles name with only spaces", () => {
    expect(getGreeting("   ")).toBe("Hey world!");
  });
});

describe("getJoke", () => {
  it("should return a promise that resolves to a joke object", async () => {
    const joke = await getJoke();
    expect(joke).toHaveProperty("joke");
    expect(joke).toHaveProperty("source", "api");
    expect(joke).toHaveProperty("category");
  });

  it("should return different jokes on multiple calls", async () => {
    const joke1 = await getJoke();
    const joke2 = await getJoke();
    const joke3 = await getJoke();
    // Les blagues de l'API devraient être différentes
    expect([joke1.joke, joke2.joke, joke3.joke]).not.toEqual([joke1.joke, joke1.joke, joke1.joke]);
  });
});
