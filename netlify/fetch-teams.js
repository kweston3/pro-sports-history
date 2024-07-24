const fetch = require("node-fetch"); // Make sure to install node-fetch if needed

exports.handler = async function (event, context) {
  const league = event.queryStringParameters.league;
  const apiKey = process.env.API_KEY; // Use the environment variable
  const baseUrl = "https://www.thesportsdb.com/api/v1/json/";

  try {
    const response = await fetch(
      `${baseUrl}${apiKey}/search_all_teams.php?l=${league}`
    );
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching teams data" }),
    };
  }
};
