import { createGameCard } from './gameList.js';

console.log("What Game's On app is running...");

document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded!");

  // Set the featured game
  document.getElementById("featured-game").textContent = "🏈 Eagles vs Chiefs at 7:30 PM";

  // Sample games (replace this with fetched API data later)
  const games = [
    { league: "NBA", homeTeam: "Lakers", awayTeam: "Warriors" },
    { league: "MLB", homeTeam: "Yankees", awayTeam: "Red Sox" },
    { league: "NFL", homeTeam: "Eagles", awayTeam: "Cowboys" }
  ];

  const gameList = document.getElementById("game-list");
  gameList.innerHTML = ""; // Clear old content

  // Create and append each game card
  games.forEach(game => {
    const card = createGameCard(game);
    gameList.appendChild(card);
  });
});
