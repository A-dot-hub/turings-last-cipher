import { Icons, renderIcon } from '../icons.js';
import { stateManager } from '../managers/StateManager.js';
import { audioManager } from '../managers/AudioManager.js';

export function renderMainMenu({ onBegin, onNavigate }) {
  const container = document.createElement('div');
  container.className = "flex flex-col items-center justify-center h-full space-y-12 z-10 relative opacity-0 transform translate-y-[-20px] transition-all duration-1000";
  
  setTimeout(() => {
    container.classList.remove('opacity-0', 'translate-y-[-20px]');
    container.classList.add('opacity-100', 'translate-y-0');
  }, 50);

  const hasProgress = stateManager.state.unlockedLevel > 1;

  container.innerHTML = `
    <div class="text-center">
      ${renderIcon(Icons.ShieldAlert, 'w-16 h-16 text-terminal-green mx-auto mb-6 opacity-80')}
      <h1 class="text-5xl md:text-7xl font-display font-bold text-terminal-green text-glow tracking-widest uppercase mb-4">
        Turing's
      </h1>
      <h2 class="text-3xl md:text-4xl font-display text-text-primary tracking-[0.2em] uppercase text-glow-gold">
        Lost Archive
      </h2>
      <div class="mt-4 font-mono text-xs text-text-secondary tracking-widest uppercase opacity-50">
        Project Enigma II - Offline Operations Only
      </div>
    </div>
    <div id="menu-actions" class="flex flex-col space-y-4 font-mono w-72 opacity-0 transition-opacity duration-1000">
      <button id="btn-begin" class="group relative px-6 py-3 border border-terminal-green/30 bg-terminal-green/5 hover:bg-terminal-green/20 text-terminal-green transition-all duration-300 flex items-center justify-between cursor-pointer">
        <span>[ ${hasProgress ? 'CONTINUE SEQUENCE' : 'BEGIN SEQUENCE'} ]</span>
        ${renderIcon(Icons.Terminal, 'w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity')}
      </button>
      <button id="btn-achievements" class="px-6 py-3 border border-accent-gold/30 bg-accent-gold/5 hover:bg-accent-gold/20 text-accent-gold transition-all duration-300 flex items-center justify-between cursor-pointer">
        <span>[ ACHIEVEMENTS ]</span>
      </button>
      <button id="btn-notebook" class="px-6 py-3 border border-panel bg-panel/30 hover:border-terminal-green/30 hover:text-terminal-green text-text-secondary transition-all duration-300 flex items-center justify-between cursor-pointer">
        <span>[ NOTEBOOK ]</span>
      </button>
      <button id="btn-archive" class="px-6 py-3 border border-panel bg-panel/30 hover:border-terminal-green/30 hover:text-terminal-green text-text-secondary transition-all duration-300 flex items-center justify-between cursor-pointer ${hasProgress ? '' : 'opacity-50 pointer-events-none'}">
        <span>[ ARCHIVE ]</span>
      </button>
    </div>
  `;

  setTimeout(() => {
    const actions = container.querySelector('#menu-actions');
    if (actions) actions.classList.remove('opacity-0');
  }, 1000);

  setTimeout(() => {
    container.querySelector('#btn-begin').addEventListener('click', () => {
      audioManager.playKeypress();
      onBegin();
    });
    container.querySelector('#btn-achievements').addEventListener('click', () => {
      audioManager.playKeypress();
      onNavigate('achievements');
    });
    container.querySelector('#btn-notebook').addEventListener('click', () => {
      audioManager.playKeypress();
      onNavigate('notebook');
    });
    if (hasProgress) {
      container.querySelector('#btn-archive').addEventListener('click', () => {
        audioManager.playKeypress();
        onNavigate('archive');
      });
    }
  }, 0);

  return container;
}
