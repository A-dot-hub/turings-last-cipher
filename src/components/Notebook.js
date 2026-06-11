import { Icons, renderIcon } from '../icons.js';
import { audioManager } from '../managers/AudioManager.js';

export function renderNotebook({ onBack }) {
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
      <span class="text-xs tracking-widest text-red-500/80 border border-red-500/30 px-2 py-1 rotate-1 sm:rotate-0">TOP SECRET</span>
      <div class="font-display tracking-widest text-xl text-glow hidden sm:block">CRYPTANALYST NOTEBOOK</div>
    </div>
  `;

  const content = document.createElement('div');
  content.className = "grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-0 overflow-hidden";
  
  content.innerHTML = `
    <div class="flex flex-col h-full bg-black/30 border border-panel p-4 md:p-6 overflow-hidden relative">
      <h3 class="text-terminal-green mb-4 text-glow flex items-center">
        ${renderIcon(Icons.BookOpen, 'w-4 h-4 mr-2')}
        REFERENCE CHARTS
      </h3>
      <div class="space-y-4 overflow-y-auto custom-scrollbar flex-grow text-sm pr-2">
        <div class="border border-panel p-4 bg-bg-secondary text-text-secondary hover:border-terminal-green/30 transition-colors">
          <h4 class="text-text-primary mb-3 font-display tracking-widest border-b border-panel pb-1">MORSE CODE STANDARD</h4>
          <div class="grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-xs">
            <div class="flex justify-between"><span>A</span><span class="text-accent-gold">.-</span></div>
            <div class="flex justify-between"><span>N</span><span class="text-accent-gold">-.</span></div>
            <div class="flex justify-between"><span>B</span><span class="text-accent-gold">-...</span></div>
            <div class="flex justify-between"><span>O</span><span class="text-accent-gold">---</span></div>
            <div class="flex justify-between"><span>C</span><span class="text-accent-gold">-.-.</span></div>
            <div class="flex justify-between"><span>P</span><span class="text-accent-gold">.--.</span></div>
            <div class="flex justify-between"><span>D</span><span class="text-accent-gold">-..</span></div>
            <div class="flex justify-between"><span>Q</span><span class="text-accent-gold">--.-</span></div>
            <div class="flex justify-between"><span>E</span><span class="text-accent-gold">.</span></div>
            <div class="flex justify-between"><span>S</span><span class="text-accent-gold">...</span></div>
            <div class="flex justify-between"><span>H</span><span class="text-accent-gold">....</span></div>
            <div class="flex justify-between"><span>T</span><span class="text-accent-gold">-</span></div>
            <div class="flex justify-between"><span>L</span><span class="text-accent-gold">.-..</span></div>
            <div class="flex justify-between"><span>M</span><span class="text-accent-gold">--</span></div>
            <div class="flex justify-between"><span>I</span><span class="text-accent-gold">..</span></div>
            <div class="flex justify-between"><span>Y</span><span class="text-accent-gold">-.--</span></div>
          </div>
        </div>

        <div class="border border-panel p-4 bg-bg-secondary text-text-secondary hover:border-terminal-green/30 transition-colors">
          <h4 class="text-text-primary mb-2 font-display tracking-widest border-b border-panel pb-1">CAESAR SHIFT (ROT_X)</h4>
          <p class="leading-relaxed text-xs">Standard substitution. Shift the alphabet by integer N. Find N by checking frequency of E, T, A, O, I, N.</p>
        </div>

        <div class="border border-panel p-4 bg-bg-secondary text-text-secondary hover:border-terminal-green/30 transition-colors">
          <h4 class="text-text-primary mb-2 font-display tracking-widest border-b border-panel pb-1">VIGENÈRE CIPHER</h4>
          <p class="leading-relaxed text-xs mb-2">Polyalphabetic substitution. The key letter dictates the shift for that specific column.</p>
          <div class="font-mono text-xs text-accent-blue bg-black/50 p-2 rounded border border-panel">
            KEY:  A(+0) B(+1) C(+2) D(+3)<br/>
            TXT:  H     E     L     L<br/>
            CYP:  H(H)  F(E+1)N(L+2)O(L+3)
          </div>
        </div>

        <div class="border border-panel p-4 bg-bg-secondary text-text-secondary hover:border-terminal-green/30 transition-colors">
          <h4 class="text-text-primary mb-2 font-display tracking-widest border-b border-panel pb-1">BINARY TO ASCII</h4>
          <p class="leading-relaxed text-xs mb-2">8-bit computer strings mapping to standard characters.</p>
          <div class="grid grid-cols-2 gap-2 text-xs text-terminal-green font-mono bg-black/50 p-2 border border-panel mt-2">
            <div>01000001 = A</div>
            <div>01000101 = E</div>
            <div>01001001 = I</div>
            <div>01001111 = O</div>
            <div>01010101 = U</div>
          </div>
        </div>

      </div>
    </div>
    
    <div class="flex flex-col h-full bg-black/30 border border-panel p-4 md:p-6 overflow-hidden">
      <h3 class="text-terminal-green mb-4 text-glow flex items-center">
        ${renderIcon(Icons.Edit2, 'w-4 h-4 mr-2')}
        CLASSIFIED FINDINGS
      </h3>
      <textarea id="player-notes" class="flex-grow w-full bg-black/40 border border-panel p-4 resize-none focus:outline-none focus:border-terminal-green focus:shadow-[inset_0_0_10px_rgba(34,197,94,0.1)] text-text-primary custom-scrollbar leading-relaxed font-mono transition-all" placeholder="[ DOCUMENT YOUR ANALYSIS HERE ]\n\nLocal storage active. Observations persist between sessions."></textarea>
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
