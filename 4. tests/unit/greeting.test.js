const { getGreeting, getJoke } = require("../../src/greeting");
const allure = require('allure-commandline');

describe("getGreeting", () => {
  it("returns the hey world message", () => {
    allure.feature('Greeting');
    allure.story('Default greeting');
    expect(getGreeting()).toBe("Hey world!");
  });

  it("returns the hey world message with a name", () => {
    allure.feature('Greeting');
    allure.story('Personalized greeting');
    expect(getGreeting("Alice")).toBe("Hey Alice! Dis \"blague\" pour une vanne !");
  });

  it("returns a joke when name contains 'blague'", () => {
    allure.feature('Greeting');
    allure.story('Joke request');
    const result = getGreeting("blague");
    expect(result).toHaveProperty("message", "Voici une blague aléatoire:");
    expect(result).toHaveProperty("joke");
  });

  it("handles empty string name", () => {
    allure.feature('Greeting');
    allure.story('Edge cases');
    expect(getGreeting("")).toBe("Hey world!");
  });

  it("handles null name", () => {
    allure.feature('Greeting');
    allure.story('Edge cases');
    expect(getGreeting(null)).toBe("Hey world!");
  });

  it("handles undefined name", () => {
    allure.feature('Greeting');
    allure.story('Edge cases');
    expect(getGreeting(undefined)).toBe("Hey world!");
  });

  it("handles name with only spaces", () => {
    allure.feature('Greeting');
    allure.story('Edge cases');
    expect(getGreeting("   ")).toBe("Hey world!");
  });
});

describe("getJoke", () => {
  it("should return a promise that resolves to a joke object", async () => {
    allure.feature('Joke API');
    allure.story('API response');
    const joke = await getJoke();
    expect(joke).toHaveProperty("joke");
    expect(joke).toHaveProperty("source", "api");
    expect(joke).toHaveProperty("category");
  });

  it("should return different jokes on multiple calls", async () => {
    allure.feature('Joke API');
    allure.story('Randomness');
    const joke1 = await getJoke();
    const joke2 = await getJoke();
    const joke3 = await getJoke();
    expect([joke1.joke, joke2.joke, joke3.joke]).not.toEqual([joke1.joke, joke1.joke, joke1.joke]);
  });
});
