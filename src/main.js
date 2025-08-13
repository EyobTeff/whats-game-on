import { createGameCard } from './gameCard.js';

const API_KEY = "123"; 
const LEAGUE_IDS = {
  NBA: 4387,
  NFL: 4391,
  MLB: 4424,
  NHL: 4380
};

let currentSport = "NBA";
let currentTimeFilter = null;

document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded!");

  setupFilterButtons();
  fetchAndDisplayGames(currentSport);
});

function setupFilterButtons() {
  // Sport filter
  document.querySelectorAll("[data-sport]").forEach(btn => {
    btn.addEventListener("click", () => {
      currentSport = btn.dataset.sport;
      setActiveButton("[data-sport]", btn);
      fetchAndDisplayGames(currentSport);
    });
  });

  // Time filter
  document.querySelectorAll("[data-time]").forEach(btn => {
    btn.addEventListener("click", () => {
      currentTimeFilter = btn.dataset.time;
      setActiveButton("[data-time]", btn);
      fetchAndDisplayGames(currentSport, currentTimeFilter);
    });
  });
}

function setActiveButton(selector, activeBtn) {
  document.querySelectorAll(selector).forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

async function fetchAndDisplayGames(sport, timeFilter = null) {
  const gameList = document.getElementById("game-list");
  gameList.innerHTML = "Loading games...";

  try {
    const leagueId = LEAGUE_IDS[sport];
    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/${123}/eventsnextleague.php?id=${leagueId}`);
    const data = await res.json();

    let games = data.events || [];

    // Apply time filter if selected
    if (timeFilter) {
      games = games.filter(game => {
        const gameTime = new Date(`${game.dateEvent}T${game.strTime}`);
        const hour = gameTime.getHours();

        if (timeFilter === "morning") return hour < 12;
        if (timeFilter === "afternoon") return hour >= 12 && hour < 17;
        if (timeFilter === "evening") return hour >= 17;
        return true;
      });
    }

    gameList.innerHTML = ""; // Clear loading

    if (games.length === 0) {
      gameList.textContent = "No games found for this filter.";
      return;
    }

    games.forEach(game => {
      const gameInfo = {
        league: sport,
        homeTeam: game.strHomeTeam,
        awayTeam: game.strAwayTeam
      };
      const card = createGameCard(gameInfo);
      gameList.appendChild(card);
    });

  } catch (error) {
    console.error("Failed to fetch games:", error);
    gameList.innerHTML = "Unable to load game data.";
  }
}
