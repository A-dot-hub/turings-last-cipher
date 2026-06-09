import { Icons, renderIcon } from '../icons.js';
import { LEVELS } from '../data/gameData.js';
import { stateManager } from '../managers/StateManager.js';
import { audioManager } from '../managers/AudioManager.js';

export function renderArchive({ onBack }) {
  const container = document.createElement('div');
  container.className = "flex flex-col h-full w-full max-w-4xl mx-auto p-8 z-10 relative opacity-0 transition-opacity duration-500 text-text-primary font-mono";
  
  setTimeout(() => container.classList.replace('opacity-0', 'opacity-100'), 50);

  const header = document.createElement('div');
  header.className = "flex items-center justify-between mb-8";
  header.innerHTML = `
    <button id="btn-back" class="flex items-center space-x-2 text-text-secondary hover:text-terminal-green transition-colors cursor-pointer">
      ${renderIcon(Icons.ArrowLeft, 'w-4 h-4')}
      <span>RETURN TO ROOT</span>
    </button>
    <div class="font-display tracking-widest text-xl text-glow hidden sm:block">
      DOCUMENT ARCHIVE
    </div>
  `;

  const unlocked = stateManager.state.unlockedLevel;
  
  const listContainer = document.createElement('div');
  listContainer.className = "space-y-4 overflow-y-auto custom-scrollbar flex-grow pr-4";

  LEVELS.forEach((level, index) => {
    if (level.id >= unlocked) return; // Only show solved levels

    const item = document.createElement('div');
    item.className = "p-6 border border-panel bg-black/30 hover:border-terminal-green/30 transition-colors";
    
    item.innerHTML = `
      <div class="flex items-center space-x-3 mb-4 text-terminal-green">
        ${renderIcon(Icons.FileText, 'w-5 h-5')}
        <h3 class="font-display tracking-wider text-lg">${level.title}</h3>
      </div>
      <div class="text-text-secondary text-sm leading-relaxed pl-8 border-l border-panel ml-2">
        <div class="mb-4 text-xs tracking-widest text-text-secondary/50">DECRYPTED PAYLOAD:</div>
        <div class="text-terminal-green font-display mb-6">${level.plainText || level.answerPlaintext || ''}</div>
        <div class="mb-2 text-xs tracking-widest text-text-secondary/50">HISTORICAL LOG:</div>
        <p class="whitespace-pre-wrap">${level.lore}</p>
      </div>
    `;

    listContainer.appendChild(item);
  });

  if (unlocked === 1) {
    listContainer.innerHTML = '<div class="text-center text-text-secondary py-12">NO ENCRYPTED ARCHIVES RECOVERED YET.</div>';
  }

  container.appendChild(header);
  container.appendChild(listContainer);

  setTimeout(() => {
    container.querySelector('#btn-back').addEventListener('click', () => {
      audioManager.playKeypress();
      onBack();
    });
  }, 0);

  return container;
}
