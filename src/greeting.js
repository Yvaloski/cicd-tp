function getGreeting(name) {
  const greeting = `Hello world of dev!`;

  if (name) {
    const wisher = `From ${name}`;

    return `${greeting} ${wisher}`;
  }

  return greeting;
}

module.exports = { getGreeting };
