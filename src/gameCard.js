// src/gameCard.js

import nbaLogo from './assets/logos/nba.svg';
import nflLogo from './assets/logos/nfl.svg';
import mlbLogo from './assets/logos/mlb.svg';
import nhlLogo from './assets/logos/nhl.svg';

const leagueLogos = { NBA: nbaLogo, NFL: nflLogo, MLB: mlbLogo, NHL: nhlLogo };

// Mock games for fallback
export const games = [
  { league: 'NBA', homeTeam: 'Philadelphia 76ers', awayTeam: 'New York Knicks', time: '07:00' },
  { league: 'NFL', homeTeam: 'Buffalo Bills', awayTeam: 'Miami Dolphins', time: '13:00' },
  { league: 'MLB', homeTeam: 'Yankees', awayTeam: 'Red Sox', time: '18:30' },
  { league: 'NHL', homeTeam: 'Maple Leafs', awayTeam: 'Canadiens', time: '20:00' }
];

/**
 * Creates a game card element.
 */
export function createGameCard({ league, homeTeam, awayTeam, time }) {
  const card = document.createElement('div');
  card.classList.add('game-card');

  const logo = document.createElement('img');
  logo.src = leagueLogos[league] || '';
  logo.alt = `${league} logo`;
  logo.classList.add('league-logo');

  const info = document.createElement('div');
  info.classList.add('game-info');

  const title = document.createElement('h3');
  title.textContent = `${homeTeam} vs ${awayTeam}`;

  const timeEl = document.createElement('p');
  timeEl.textContent = time ? `Time: ${time}` : '';

  info.appendChild(title);
  if (time) info.appendChild(timeEl);

  card.appendChild(logo);
  card.appendChild(info);

  return card;
}
