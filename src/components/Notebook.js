import { Icons, renderIcon } from '../icons.js';
import { audioManager } from '../managers/AudioManager.js';

export function renderNotebook({ onBack }) {
  const container = document.createElement('div');
  container.className = "flex flex-col h-full w-full max-w-4xl mx-auto p-8 z-10 relative opacity-0 transition-opacity duration-500 text-text-primary font-mono";
  
  setTimeout(() => container.classList.replace('opacity-0', 'opacity-100'), 50);

  const header = document.createElement('div');
  header.className = "flex items-center justify-between mb-8 pb-4 border-b border-panel";
  header.innerHTML = `
    <button id="btn-back" class="flex items-center space-x-2 text-text-secondary hover:text-terminal-green transition-colors cursor-pointer">
      ${renderIcon(Icons.ArrowLeft, 'w-4 h-4')}
      <span>RETURN TO ROOT</span>
    </button>
    <div class="font-display tracking-widest text-xl text-glow hidden sm:block">
      CRYPTANALYST NOTEBOOK
    </div>
  `;

  const content = document.createElement('div');
  content.className = "grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-0 overflow-hidden";
  
  content.innerHTML = `
    <div class="flex flex-col h-full bg-black/30 border border-panel p-6">
      <h3 class="text-terminal-green mb-4 text-glow">REFERENCE CHARTS</h3>
      <div class="space-y-4 overflow-y-auto custom-scrollbar flex-grow text-sm">
        <div class="border border-panel p-4 bg-bg-secondary text-text-secondary">
          <h4 class="text-text-primary mb-2">MORSE CODE</h4>
          <div class="grid grid-cols-2 gap-2">
            <div>A .-</div><div>N -.</div>
            <div>B -...</div><div>O ---</div>
            <div>C -.-.</div><div>P .--.</div>
            <div>D -..</div><div>Q --.-</div>
            <div>E .</div><div>R .-.</div>
            <div>L .-..</div><div>S ...</div>
            <div>I ..</div><div>H ....</div>
            <div>X -..-</div><div>G --.</div>
            <div>M --</div><div>F ..-.</div>
          </div>
        </div>
        <div class="border border-panel p-4 bg-bg-secondary text-text-secondary">
          <h4 class="text-text-primary mb-2">CAESAR CIPHER (ROT_X)</h4>
          <p class="leading-relaxed text-xs">Standard rotational substitution. Shift the alphabet by a fixed integer. For Enigma intercepts, check rotational variants up to +5.</p>
        </div>
      </div>
    </div>
    
    <div class="flex flex-col h-full bg-black/30 border border-panel p-6">
      <h3 class="text-terminal-green mb-4 text-glow">YOUR NOTES</h3>
      <textarea id="player-notes" class="flex-grow w-full bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-text-primary custom-scrollbar leading-relaxed" placeholder="Enter findings here. Will persist locally..."></textarea>
    </div>
  `;

  container.appendChild(header);
  container.appendChild(content);

  setTimeout(() => {
    container.querySelector('#btn-back').addEventListener('click', () => {
      audioManager.playKeypress();
      onBack();
    });

    const notesArea = container.querySelector('#player-notes');
    notesArea.value = localStorage.getItem('turing_player_notes') || '';
    
    notesArea.addEventListener('input', (e) => {
      localStorage.setItem('turing_player_notes', e.target.value);
    });
  }, 0);

  return container;
}
