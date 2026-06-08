import { Icons, renderIcon } from '../icons.js';

export function renderLevelSelect({ unlockedLevel, levels, onBack, onSelect }) {
  const container = document.createElement('div');
  container.className = "flex flex-col h-full w-full max-w-4xl mx-auto p-8 z-10 relative opacity-0 transition-opacity duration-500 text-text-primary";
  
  setTimeout(() => container.classList.replace('opacity-0', 'opacity-100'), 50);

  const header = document.createElement('div');
  header.className = "flex items-center justify-between mb-12";
  header.innerHTML = `
    <button id="btn-back" class="flex items-center space-x-2 text-text-secondary hover:text-terminal-green transition-colors font-mono cursor-pointer">
      ${renderIcon(Icons.ArrowLeft, 'w-4 h-4')}
      <span>RETURN TO ROOT</span>
    </button>
    <div class="font-display text-terminal-green tracking-widest text-xl text-glow hidden sm:block">
      ARCHIVE DIRECTORY
    </div>
  `;

  const grid = document.createElement('div');
  grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  levels.forEach((level, index) => {
    const isUnlocked = level.id <= unlockedLevel;
    const btn = document.createElement('button');
    btn.className = `p-6 border text-left transition-all duration-300 relative overflow-hidden group opacity-0 transform translate-y-[10px]
      ${isUnlocked 
        ? 'border-terminal-green/40 bg-bg-secondary hover:bg-terminal-green/5 hover:border-terminal-green cursor-pointer' 
        : 'border-panel bg-panel/20 opacity-50 cursor-not-allowed'
      }
    `;
    
    setTimeout(() => {
      btn.classList.remove('opacity-0', 'translate-y-[10px]');
      btn.classList.add('opacity-100', 'translate-y-0');
    }, 100 * index + 100);

    btn.innerHTML = `
      <div class="flex justify-between items-start mb-4">
        <span class="font-mono text-xs text-text-secondary tracking-widest">
          FILE_${level.id.toString().padStart(3, '0')}
        </span>
        ${isUnlocked ? renderIcon(Icons.Unlock, 'w-4 h-4 text-terminal-green') : renderIcon(Icons.Lock, 'w-4 h-4 text-text-secondary')}
      </div>
      <h3 class="font-display tracking-wider mb-2 ${isUnlocked ? 'text-text-primary' : 'text-text-secondary'}">
        ${isUnlocked ? level.title : 'CLASSIFIED'}
      </h3>
      <div class="text-xs font-mono text-text-secondary">
        CLASS: ${isUnlocked ? level.type.toUpperCase() : 'UNKNOWN'}
      </div>
      ${isUnlocked ? `<div class="absolute top-0 right-0 w-16 h-16 bg-terminal-green/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>` : ''}
    `;

    if (isUnlocked) {
      btn.addEventListener('click', () => onSelect(level.id));
    }
    grid.appendChild(btn);
  });

  container.appendChild(header);
  container.appendChild(grid);

  setTimeout(() => {
    container.querySelector('#btn-back').addEventListener('click', onBack);
  }, 0);

  return container;
}
