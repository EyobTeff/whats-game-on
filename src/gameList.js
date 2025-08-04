// 🔼 Top of the file: Import local SVGs from /assets/logos/
import nbaLogo from '../assets/logos/nba.svg';
import nflLogo from '../assets/logos/nfl.svg';
import mlbLogo from '../assets/logos/mlb.svg';
import nhlLogo from '../assets/logos/nhl.svg';

// Function to create a game card
export function createGameCard(game) {
  const card = document.createElement("div");
  card.classList.add("game-card");

  const logo = document.createElement("img");
  logo.classList.add("league-logo");

  // Assign the correct logo based on the league
  switch (game.league) {
    case "NBA":
      logo.src = nbaLogo;
      logo.alt = "NBA Logo";
      break;
    case "NFL":
      logo.src = nflLogo;
      logo.alt = "NFL Logo";
      break;
    case "MLB":
      logo.src = mlbLogo;
      logo.alt = "MLB Logo";
      break;
    case "NHL":
      logo.src = nhlLogo;
      logo.alt = "NHL Logo";
      break;
    default:
      logo.alt = "League Logo";
  }

  card.appendChild(logo);

  const title = document.createElement("h3");
  title.textContent = `${game.homeTeam} vs ${game.awayTeam}`;
  card.appendChild(title);

  return card;
}
