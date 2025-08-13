import { games as mockGames, createGameCard } from './gameCard.js';

const API_KEY = "123"; // replace with your key
const LEAGUE_IDS = { NBA: 4387, NFL: 4391, MLB: 4424, NHL: 4380 };

let currentSport = null;
let currentTimeFilter = null;

document.addEventListener('DOMContentLoaded', () => {
  setupFilterButtons();
  setupTimeButtons();
  fetchAndDisplayGames();
});

function setupFilterButtons() {
  document.querySelectorAll('[data-sport]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentSport = btn.dataset.sport;
      setActiveButton('[data-sport]', btn);
      fetchAndDisplayGames();
    });
  });
}

function setupTimeButtons() {
  document.querySelectorAll('[data-time]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTimeFilter = btn.dataset.time;
      setActiveButton('[data-time]', btn);
      fetchAndDisplayGames();
    });
  });
}

function setActiveButton(selector, activeBtn) {
  document.querySelectorAll(selector).forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}

async function fetchAndDisplayGames() {
  const container = document.getElementById('game-container');
  container.innerHTML = 'Loading games...';

  let gamesToDisplay = [];

  if (currentSport) {
    try {
      const leagueId = LEAGUE_IDS[currentSport];
      const res = await fetch(`https://www.thesportsdb.com/api/v1/json/${123}/eventsnextleague.php?id=${leagueId}`);
      const data = await res.json();

      if (data.events) {
        gamesToDisplay = data.events.map(game => ({
          league: currentSport,
          homeTeam: game.strHomeTeam,
          awayTeam: game.strAwayTeam,
          time: game.strTime
        }));
      } else {
        gamesToDisplay = mockGames.filter(g => g.league === currentSport);
      }
    } catch (error) {
      console.warn('API fetch failed, using mock data:', error);
      gamesToDisplay = mockGames.filter(g => g.league === currentSport);
    }
  } else {
    gamesToDisplay = mockGames;
  }

  // Apply time-of-day filter
  if (currentTimeFilter) {
    gamesToDisplay = gamesToDisplay.filter(game => {
      const [hourStr] = game.time.split(':');
      const hour = parseInt(hourStr);
      if (currentTimeFilter === 'morning') return hour < 12;
      if (currentTimeFilter === 'afternoon') return hour >= 12 && hour < 17;
      if (currentTimeFilter === 'evening') return hour >= 17;
      return true;
    });
  }

  container.innerHTML = '';
  if (gamesToDisplay.length === 0) {
    container.textContent = 'No games found for this filter.';
    return;
  }

  gamesToDisplay.forEach(game => {
    const card = createGameCard(game);
    container.appendChild(card);
  });
}
