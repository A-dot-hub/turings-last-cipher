import { Icons, renderIcon } from '../icons.js';

export function renderMainMenu({ onBegin }) {
  const container = document.createElement('div');
  container.className = "flex flex-col items-center justify-center h-full space-y-12 z-10 relative opacity-0 transform translate-y-[-20px] transition-all duration-1000";
  
  setTimeout(() => {
    container.classList.remove('opacity-0', 'translate-y-[-20px]');
    container.classList.add('opacity-100', 'translate-y-0');
  }, 50);

  container.innerHTML = `
    <div class="text-center">
      ${renderIcon(Icons.ShieldAlert, 'w-16 h-16 text-terminal-green mx-auto mb-6 opacity-80')}
      <h1 class="text-5xl md:text-7xl font-display font-bold text-terminal-green text-glow tracking-widest uppercase mb-4">
        Turing's
      </h1>
      <h2 class="text-3xl md:text-4xl font-display text-text-primary tracking-[0.2em] uppercase">
        Last Cipher
      </h2>
      <div class="mt-4 font-mono text-xs text-text-secondary tracking-widest uppercase opacity-50">
        Project Enigma II - Authorized Personnel Only
      </div>
    </div>
    <div id="menu-actions" class="flex flex-col space-y-4 font-mono w-64 opacity-0 transition-opacity duration-1000">
      <button id="btn-begin" class="group relative px-6 py-3 border border-terminal-green/30 bg-terminal-green/5 hover:bg-terminal-green/20 text-terminal-green transition-all duration-300 flex items-center justify-between cursor-pointer">
        <span>[ BEGIN SEQUENCE ]</span>
        ${renderIcon(Icons.Terminal, 'w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity')}
      </button>
      <button disabled class="px-6 py-3 border border-panel bg-panel/30 text-text-secondary cursor-not-allowed flex items-center justify-between opacity-50">
        <span>[ LOAD ARCHIVE ]</span>
      </button>
    </div>
  `;

  setTimeout(() => {
    const actions = container.querySelector('#menu-actions');
    if (actions) actions.classList.remove('opacity-0');
  }, 1000);

  setTimeout(() => {
    container.querySelector('#btn-begin').addEventListener('click', onBegin);
  }, 0);

  return container;
}
