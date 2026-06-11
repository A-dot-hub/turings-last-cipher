import { Icons, renderIcon } from '../icons.js';
import { LEVELS } from '../data/gameData.js';
import { stateManager } from '../managers/StateManager.js';
import { audioManager } from '../managers/AudioManager.js';

export function renderArchive({ onBack }) {
  const container = document.createElement('div');
  container.className = "flex flex-col h-full w-full max-w-5xl mx-auto p-4 md:p-8 z-10 relative opacity-0 transition-opacity duration-500 text-text-primary font-mono";
  
  setTimeout(() => container.classList.replace('opacity-0', 'opacity-100'), 50);

  const header = document.createElement('div');
  header.className = "flex items-center justify-between mb-8 pb-4 border-b border-panel";
  header.innerHTML = `
    <button id="btn-back" class="flex items-center space-x-2 text-text-secondary hover:text-terminal-green transition-colors cursor-pointer">
      ${renderIcon(Icons.ArrowLeft, 'w-4 h-4')}
      <span>RETURN TO ROOT</span>
    </button>
    <div class="flex items-center space-x-4">
      <span class="text-xs tracking-widest text-accent-blue/80 border border-accent-blue/30 px-2 py-1 rotate-1 sm:rotate-0">DECLASSIFIED</span>
      <div class="font-display tracking-widest text-xl text-glow hidden sm:block">DOCUMENT ARCHIVE</div>
    </div>
  `;

  const unlocked = stateManager.state.unlockedLevel;
  
  const listContainer = document.createElement('div');
  listContainer.className = "space-y-6 overflow-y-auto custom-scrollbar flex-grow pr-4 pb-12";

  LEVELS.forEach((level, index) => {
    if (level.id >= unlocked) return; // Only show solved levels

    const item = document.createElement('div');
    item.className = "p-6 border border-panel bg-black/40 hover:border-terminal-green/30 transition-colors relative overflow-hidden group";
    
    // Add visual watermark
    const watermark = document.createElement('div');
    watermark.className = "absolute -right-4 -top-4 text-[8rem] font-display opacity-[0.02] text-terminal-green pointer-events-none group-hover:opacity-[0.04] transition-opacity";
    watermark.innerText = level.id.toString().padStart(2, '0');
    item.appendChild(watermark);

    const innerContent = document.createElement('div');
    innerContent.className = "relative z-10";
    innerContent.innerHTML = `
      <div class="flex items-center space-x-3 mb-6 border-b border-panel/50 pb-4">
        ${renderIcon(Icons.FileText, 'w-5 h-5 text-terminal-green')}
        <h3 class="font-display tracking-wider text-xl text-terminal-green/90 group-hover:text-terminal-green transition-colors">${level.title}</h3>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1 border border-panel bg-bg-secondary p-4">
          <div class="mb-2 text-xs tracking-widest text-text-secondary/50">CIPHER TYPE:</div>
          <div class="text-accent-blue font-mono mb-4 text-sm uppercase">${level.type}</div>
          
          <div class="mb-2 text-xs tracking-widest text-text-secondary/50">RAW INTERCEPT:</div>
          <div class="text-text-primary font-mono text-sm break-all opacity-70 mb-4 bg-black/50 p-2 border border-panel/50">${level.cipherText}</div>
          
          <div class="mb-2 text-xs tracking-widest text-terminal-green/50">DECRYPTED PAYLOAD:</div>
          <div class="text-terminal-green font-display text-lg px-2 border-l-2 border-terminal-green/50">${level.plainText || level.answerPlaintext || ''}</div>
        </div>
        
        <div class="md:col-span-2 text-text-secondary text-sm leading-relaxed whitespace-pre-wrap pl-4 border-l border-panel/30">
          <div class="mb-3 text-xs tracking-widest text-text-secondary/50 flex items-center"><span class="w-2 h-2 bg-text-secondary/30 rounded-full mr-2"></span> HISTORICAL LOG:</div>
          <div class="mb-2 opacity-90">${level.lore}</div>
        </div>
      </div>
    `;

    item.appendChild(innerContent);
    listContainer.appendChild(item);
  });

  if (unlocked === 1) {
    listContainer.innerHTML = '<div class="text-center text-text-secondary py-12 flex flex-col items-center"><div class="opacity-30 mb-4">' + renderIcon(Icons.Lock, 'w-12 h-12') + '</div><p>NO ENCRYPTED ARCHIVES RECOVERED YET.</p></div>';
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
