const { getGreeting, getRandomJoke, predefinedJokes } = require("../../src/greeting");

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
    expect(predefinedJokes).toContain(result.joke);
  });

  it("returns a joke with specific type when requested", () => {
    const result = getGreeting("blague:animal");
    expect(result).toHaveProperty("message", "Voici une blague aléatoire:");
    expect(result).toHaveProperty("joke");
    expect(predefinedJokes).toContain(result.joke);
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

describe("getRandomJoke", () => {
  it("returns a random joke from predefined list", () => {
    const joke = getRandomJoke();
    expect(predefinedJokes).toContain(joke);
  });

  it("returns different jokes on multiple calls", () => {
    const joke1 = getRandomJoke();
    const joke2 = getRandomJoke();
    const joke3 = getRandomJoke();
    // With 30 jokes, probability of all 3 being same is very low
    expect([joke1, joke2, joke3]).not.toEqual([joke1, joke1, joke1]);
  });

  it("always returns a string", () => {
    const joke = getRandomJoke();
    expect(typeof joke).toBe("string");
    expect(joke.length).toBeGreaterThan(0);
  });
});

describe("predefinedJokes", () => {
  it("contains exactly 30 jokes", () => {
    expect(predefinedJokes).toHaveLength(30);
  });

  it("contains only string jokes", () => {
    predefinedJokes.forEach(joke => {
      expect(typeof joke).toBe("string");
      expect(joke.length).toBeGreaterThan(0);
    });
  });

  it("contains no duplicate jokes", () => {
    const uniqueJokes = new Set(predefinedJokes);
    expect(uniqueJokes.size).toBe(predefinedJokes.length);
  });

  it("all jokes contain proper punctuation", () => {
    predefinedJokes.forEach(joke => {
      // Each joke should end with proper punctuation
      expect(joke.endsWith('!') || joke.endsWith('?') || joke.endsWith('.')).toBe(true);
    });
  });
});
