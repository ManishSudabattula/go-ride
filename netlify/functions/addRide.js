const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const ride = JSON.parse(event.body);

    const apiUrl = "https://api.github.com/repos/ManishSudabattula/go-ride/contents/rides.json";

    // Fetch current rides.json
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    });
    const fileData = await res.json();
    const rides = JSON.parse(Buffer.from(fileData.content, 'base64').toString());

    // Add new ride
    rides.push(ride);

    // Commit new rides.json
    await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Add new ride",
        content: Buffer.from(JSON.stringify(rides, null, 2)).toString('base64'),
        sha: fileData.sha
      })
    });

    return { statusCode: 200, body: JSON.stringify({ message: "Ride added!" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
