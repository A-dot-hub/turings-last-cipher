import { Icons, renderIcon } from '../icons.js';
import { ACHIEVEMENTS } from '../data/achievements.js';
import { stateManager } from '../managers/StateManager.js';
import { audioManager } from '../managers/AudioManager.js';

export function renderAchievements({ onBack }) {
  const container = document.createElement('div');
  container.className = "flex flex-col h-full w-full max-w-4xl mx-auto p-8 z-10 relative opacity-0 transition-opacity duration-500 text-text-primary font-mono";
  
  setTimeout(() => container.classList.replace('opacity-0', 'opacity-100'), 50);

  const header = document.createElement('div');
  header.className = "flex items-center justify-between mb-12";
  header.innerHTML = `
    <button id="btn-back" class="flex items-center space-x-2 text-text-secondary hover:text-terminal-green transition-colors cursor-pointer">
      ${renderIcon(Icons.ArrowLeft, 'w-4 h-4')}
      <span>RETURN TO ROOT</span>
    </button>
    <div class="font-display text-accent-gold tracking-widest text-xl text-glow-gold hidden sm:block">
      SERVICE RECORD
    </div>
  `;

  const unlocked = stateManager.state.achievements;
  const grid = document.createElement('div');
  grid.className = "grid grid-cols-1 md:grid-cols-2 gap-6";

  ACHIEVEMENTS.forEach((ach, index) => {
    const isUnlocked = unlocked.includes(ach.id);
    const item = document.createElement('div');
    item.className = `p-6 border transition-all duration-300 relative overflow-hidden flex items-start space-x-4
      ${isUnlocked 
        ? 'border-accent-gold/40 bg-accent-gold/5 opacity-100' 
        : 'border-panel bg-panel/20 opacity-50'
      }
    `;

    item.innerHTML = `
      <div class="mt-1">
        ${isUnlocked ? renderIcon(Icons.Unlock, 'w-6 h-6 text-accent-gold') : renderIcon(Icons.Lock, 'w-6 h-6 text-text-secondary')}
      </div>
      <div>
        <h3 class="font-display tracking-wider mb-2 ${isUnlocked ? 'text-accent-gold text-glow-gold' : 'text-text-secondary'}">
          ${ach.title}
        </h3>
        <div class="text-sm text-text-secondary leading-relaxed">
          ${isUnlocked ? ach.description : '???'}
        </div>
      </div>
    `;

    grid.appendChild(item);
  });

  if (unlocked.length === 0) {
    grid.innerHTML = '<div class="col-span-full text-center text-text-secondary py-12">NO RECORDS FOUND</div>';
  }

  container.appendChild(header);
  container.appendChild(grid);

  setTimeout(() => {
    container.querySelector('#btn-back').addEventListener('click', () => {
      audioManager.playKeypress();
      onBack();
    });
  }, 0);

  return container;
}
