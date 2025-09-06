const fetch = require("node-fetch");

exports.handler = async () => {
  try {
    const res = await fetch("https://raw.githubusercontent.com/ManishSudabattula/go-ride/main/rides.json");
    const rides = await res.json();
    return { statusCode: 200, body: JSON.stringify(rides) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
