import { Icons, renderIcon } from '../icons.js';
import { renderAdaDialogue } from './AdaDialogue.js';

export function renderPuzzleTerminal({ level, onBack, onSolve }) {
  const container = document.createElement('div');
  container.className = "flex flex-col h-full w-full max-w-5xl mx-auto p-4 md:p-8 z-10 relative font-mono opacity-0 transition-opacity duration-500 scale-95";
  
  setTimeout(() => {
    container.classList.remove('opacity-0', 'scale-95');
    container.classList.add('opacity-100', 'scale-100');
  }, 50);

  container.innerHTML = `
    <div class="flex items-center justify-between mb-8 pb-4 border-b border-panel">
      <button id="btn-abort" class="flex items-center space-x-2 text-text-secondary hover:text-terminal-green transition-colors cursor-pointer">
        ${renderIcon(Icons.ArrowLeft, 'w-4 h-4')}
        <span class="hidden md:inline">ABORT SEQUENCE</span>
      </button>
      <div class="flex items-center space-x-4">
        ${renderIcon(Icons.Terminal, 'w-5 h-5 text-terminal-green animate-pulse')}
        <span class="text-terminal-green tracking-widest text-sm text-glow">TERMINAL_${level.id.toString().padStart(2, '0')}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
      <div class="flex flex-col space-y-6 overflow-y-auto w-full">
        <div class="bg-bg-secondary border border-panel p-6 w-full">
          <h3 class="text-text-secondary text-xs tracking-widest mb-4 flex items-center">
            ${renderIcon(Icons.ShieldAlert, 'w-3 h-3 mr-2')}
            ARCHIVE METADATA
          </h3>
          <p class="whitespace-pre-wrap text-text-primary text-sm leading-relaxed">${level.lore}</p>
        </div>

        <div class="bg-bg-secondary border border-panel p-6 flex-grow flex flex-col w-full">
          <h3 class="text-text-secondary text-xs tracking-widest mb-4 flex items-center">
            ${renderIcon(Icons.Cpu, 'w-3 h-3 mr-2')}
            ADA ASSISTANT
          </h3>
          <div id="ada-dialogue-container" class="flex-grow"></div>
          
          <button id="btn-hint" class="mt-6 text-xs text-terminal-green hover:bg-terminal-green/10 border border-terminal-green/30 px-3 py-2 transition-colors cursor-pointer w-full text-center">
            [ REQUEST ANALYSIS ]
          </button>
        </div>
      </div>

      <div class="lg:col-span-2 flex flex-col w-full">
        <div class="bg-bg-secondary border border-panel p-6 md:p-10 flex-grow flex flex-col justify-between overflow-hidden">
          <div>
            <div class="text-text-secondary text-xs tracking-widest mb-6">ENCRYPTED PAYLOAD</div>
            <div class="font-display text-2xl md:text-4xl text-terminal-green tracking-[0.2em] break-words mb-8 px-4 py-6 bg-black/30 border border-terminal-green/20 text-glow shadow-[inset_0_0_20px_rgba(34,197,94,0.05)] text-center">
              ${level.cipherText}
            </div>
          </div>

          <div class="mt-8" id="form-container">
            <div id="error-msg" class="text-red-400 text-xs mb-4 uppercase hidden"></div>
            <form id="puzzle-form" class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 font-display text-terminal-green z-10 text-xl pointer-events-none">></div>
              <input type="text" id="puzzle-input" placeholder="ENTER PLAINTEXT" 
                class="w-full bg-black/50 border border-terminal-green/50 text-terminal-green text-xl font-display px-12 py-6 focus:outline-none focus:border-terminal-green focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all uppercase" autofocus>
            </form>
            <div id="success-msg" class="hidden text-center p-8 border border-terminal-green bg-terminal-green/10 transform transition-all scale-95 opacity-0 duration-500">
              <div class="text-xl text-terminal-green mb-2 text-glow">DECRYPTION SUCCESSFUL</div>
              <div class="text-text-secondary text-sm">Proceeding to next archive or directory...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    container.querySelector('#btn-abort').addEventListener('click', onBack);

    const adaDialogueContainer = container.querySelector('#ada-dialogue-container');
    let currentAda = renderAdaDialogue({ text: "Waiting for cryptanalyst input...\n\nRequest analysis if assistance is required." });
    adaDialogueContainer.appendChild(currentAda);

    const btnHint = container.querySelector('#btn-hint');
    btnHint.addEventListener('click', () => {
      btnHint.disabled = true;
      btnHint.classList.add('opacity-50', 'cursor-not-allowed');
      if (currentAda.cleanup) currentAda.cleanup();
      adaDialogueContainer.innerHTML = '';
      currentAda = renderAdaDialogue({ text: level.hint });
      adaDialogueContainer.appendChild(currentAda);
    });

    const form = container.querySelector('#puzzle-form');
    const input = container.querySelector('#puzzle-input');
    const errorMsg = container.querySelector('#error-msg');
    const successMsg = container.querySelector('#success-msg');

    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.toUpperCase();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim().toUpperCase();
      if (val === level.plainText) {
        errorMsg.classList.add('hidden');
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
        setTimeout(() => {
          successMsg.classList.remove('scale-95', 'opacity-0');
          successMsg.classList.add('scale-100', 'opacity-100');
        }, 50);

        if (currentAda.cleanup) currentAda.cleanup();

        setTimeout(() => {
          onSolve(level.id);
        }, 3000);
      } else {
        errorMsg.innerText = 'DECRYPTION FAILED. INVALID PLAINTEXT.';
        errorMsg.classList.remove('hidden');
      }
    });

    input.focus();
  }, 0);

  return container;
}
