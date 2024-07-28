import config from "../scripts/config.js";
const apiKey = config.apiKey;

// JavaScript for mobile menu toggle
document.getElementById("navbar-toggle").addEventListener("click", () => {
  const menu = document.getElementById("navbar-menu");
  menu.classList.toggle("active");
});

const baseUrl = "https://www.thesportsdb.com/api/v1/json/";

// Fetch teams function
const fetchTeams = async (league) => {
  try {
    const response = await fetch(
      `${baseUrl}${apiKey}/search_all_teams.php?l=${league}`
    );
    const data = await response.json();
    console.log(`${league} Teams Data:`, data); // Log data for debugging
    if (data.teams) {
      displayTeams(data.teams);
    } else {
      console.error(`No ${league} teams data found`);
    }
  } catch (error) {
    console.error(`Error fetching ${league} teams:`, error);
  }
};

// Function to truncate description to 30 words
const truncateDescription = (description, wordLimit = 30) => {
  const words = description.split(" ");
  if (words.length <= wordLimit) return description;
  return words.slice(0, wordLimit).join(" ") + "...";
};

// Display teams in a grid
const displayTeams = (teams) => {
  const teamsGrid = document.getElementById("teams-grid");
  teamsGrid.innerHTML = ""; // Clear previous teams

  // Create grid items
  teams.forEach((team) => {
    const teamDiv = document.createElement("div");
    teamDiv.classList.add("team");

    // Create and set up the team name
    const teamName = document.createElement("div");
    teamName.textContent = team.strTeam || "Unknown Team"; // Default name if missing
    teamName.classList.add("team-name");

    // Create and set up the description
    const teamDescription = document.createElement("p");
    const truncatedDescription = truncateDescription(
      team.strDescriptionEN || "No description available"
    );
    teamDescription.textContent = truncatedDescription;
    teamDescription.classList.add("team-description");

    // Create and set up the "Read More" button
    const readMoreButton = document.createElement("button");
    readMoreButton.textContent = "Read More";
    readMoreButton.classList.add("read-more-button");

    // Add click event to show full description in modal
    readMoreButton.addEventListener("click", () => {
      document.getElementById("modal-team-name").textContent =
        team.strTeam || "Unknown Team";
      document.getElementById("modal-team-description").textContent =
        team.strDescriptionEN || "No description available";
      document.getElementById("modal-team-founded").textContent = `Founded: ${
        team.intFormedYear || "Unknown"
      }`;
      document.getElementById("modal-team-stadium").textContent = `Stadium: ${
        team.strStadium || "Unknown"
      }`;
      document.getElementById("modal").style.display = "block";
    });

    // Create and set up the year formed
    const yearFormed = document.createElement("p");
    yearFormed.textContent = `Founded: ${team.intFormedYear || "Unknown"}`;
    yearFormed.classList.add("team-year");

    // Create and set up the stadium
    const stadium = document.createElement("p");
    stadium.textContent = `Stadium: ${team.strStadium || "Unknown"}`;
    stadium.classList.add("team-stadium");

    // Append elements to the teamDiv
    teamDiv.appendChild(teamName);
    teamDiv.appendChild(teamDescription);
    teamDiv.appendChild(readMoreButton);
    teamDiv.appendChild(yearFormed);
    teamDiv.appendChild(stadium);

    // Append teamDiv to the grid
    teamsGrid.appendChild(teamDiv);
  });
};

// Modal close event
const closeModal = () => {
  document.getElementById("modal").style.display = "none";
};

// Add close event to modal
document.querySelector(".close").addEventListener("click", closeModal);
window.addEventListener("click", (event) => {
  if (event.target === document.getElementById("modal")) {
    closeModal();
  }
});

// Initialize fetching of teams based on the page title
const pageTitle = document.title.toLowerCase();
if (pageTitle.includes("nba")) {
  fetchTeams("NBA");
} else if (pageTitle.includes("nfl")) {
  fetchTeams("NFL");
} else if (pageTitle.includes("nhl")) {
  fetchTeams("NHL");
} else if (pageTitle.includes("epl")) {
  fetchTeams("English Premier League");
} else if (pageTitle.includes("euroleague")) {
  fetchTeams("EuroLeague Basketball");
} else if (pageTitle.includes("acb")) {
  fetchTeams("Spanish Liga ACB");
} else if (pageTitle.includes("nbl")) {
  fetchTeams("Australian NBL");
} else if (pageTitle.includes("xfl")) {
  fetchTeams("XFL");
} else if (pageTitle.includes("gfl")) {
  fetchTeams("GFL");
} else if (pageTitle.includes("ufl")) {
  fetchTeams("UFL");
} else if (pageTitle.includes("cfl")) {
  fetchTeams("CFL");
} else if (pageTitle.includes("finnish")) {
  fetchTeams("Finnish Liiga");
} else if (pageTitle.includes("german")) {
  fetchTeams("German DEL");
} else if (pageTitle.includes("swiss")) {
  fetchTeams("Swiss National League");
} else if (pageTitle.includes("la liga")) {
  fetchTeams("Spanish La Liga");
} else if (pageTitle.includes("serie")) {
  fetchTeams("Italian Serie A");
} else if (pageTitle.includes("mls")) {
  fetchTeams("American Major League Soccer");
}
