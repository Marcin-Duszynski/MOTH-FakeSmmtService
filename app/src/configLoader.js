exports.load = (env) => {
  let apiKey;

  if (env.smmtKey !== undefined) {
    apiKey = env.smmtKey;
  } else {
    apiKey = 'localApiKey';
  }

  return { apiKey };
};
