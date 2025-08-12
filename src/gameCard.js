// src/gameCard.js

// Centralized league logo imports
import nbaLogo from './assets/logos/nba.svg.png';
import nflLogo from './assets/logos/nfl.svg.png';
import mlbLogo from './assets/logos/mlb.svg.png';
import nhlLogo from './assets/logos/nhl.svg.png';

// Map each league to its logo
const leagueLogos = {
  NBA: nbaLogo,
  NFL: nflLogo,
  MLB: mlbLogo,
  NHL: nhlLogo
};

/**
 * Creates a game card element.
 * @param {Object} game - The game data.
 * @param {string} game.league - The league name (NBA, NFL, etc.).
 * @param {string} game.homeTeam - Home team name.
 * @param {string} game.awayTeam - Away team name.
 * @param {string} [game.time] - Optional game time.
 * @returns {HTMLElement} - The constructed game card.
 */
export function createGameCard({ league, homeTeam, awayTeam, time }) {
  const card = document.createElement("div");
  card.classList.add("game-card");

  // League logo
  const logo = document.createElement("img");
  logo.src = leagueLogos[league] || '';
  logo.alt = `${league} logo`;
  logo.classList.add("league-logo");

  // Game info container
  const info = document.createElement("div");
  info.classList.add("game-info");

  const title = document.createElement("h3");
  title.textContent = `${homeTeam} vs ${awayTeam}`;

  const timeEl = document.createElement("p");
  timeEl.textContent = time || "";

  // Append elements
  info.appendChild(title);
  if (time) info.appendChild(timeEl);
  card.appendChild(logo);
  card.appendChild(info);

  return card;
}
