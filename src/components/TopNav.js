export function renderTopNav({ currentChapter }) {
  const container = document.createElement('header');
  container.className = "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-[#0B1120]/90 backdrop-blur-sm border-b border-terminal-green/30";
  
  container.innerHTML = `
    <div class="text-terminal-green font-display tracking-widest text-sm">PROJECT ENIGMA II</div>
    
    <nav class="hidden md:flex items-center space-x-6 text-terminal-green/70 font-mono text-xs tracking-widest">
      <button id="nav-dossier" class="hover:text-terminal-green transition-colors hover:shadow-[0_0_5px_rgba(34,197,94,0.5)]">DOSSIER</button>
      <span class="text-terminal-green/30">|</span>
      <button id="nav-turing" class="hover:text-terminal-green transition-colors hover:shadow-[0_0_5px_rgba(34,197,94,0.5)]">TURING</button>
      <span class="text-terminal-green/30">|</span>
      <button id="nav-settings" class="hover:text-terminal-green transition-colors hover:shadow-[0_0_5px_rgba(34,197,94,0.5)]">SETTINGS</button>
    </nav>
    
    <div class="text-terminal-green/80 font-mono text-xs tracking-widest">
      CHAPTER ${currentChapter.toString().padStart(2, '0')}
    </div>
  `;

  // Helper to open modal
  const openModal = (title, content) => {
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300";
    modal.innerHTML = `
      <div class="bg-[#0B1120] border border-terminal-green/30 p-8 max-w-lg w-full shadow-[0_0_20px_rgba(34,197,94,0.2)]">
        <h2 class="text-2xl font-display text-terminal-green mb-6 text-glow">${title}</h2>
        <div class="text-text-primary text-sm leading-relaxed mb-8">${content}</div>
        <button id="btn-close-modal" class="w-full py-2 bg-terminal-green/10 border border-terminal-green text-terminal-green hover:bg-terminal-green/20 transition-colors">CLOSE</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.replace('opacity-0', 'opacity-100'), 50);

    modal.querySelector('#btn-close-modal').addEventListener('click', () => {
      modal.classList.replace('opacity-100', 'opacity-0');
      setTimeout(() => modal.remove(), 300);
    });
  };

  container.querySelector('#nav-dossier').addEventListener('click', () => {
    openModal('MISSION BRIEFING', `
      <p class="mb-4">Welcome, Cryptanalyst.</p>
      <p class="mb-4">You have gained access to a restricted archive containing encrypted messages linked to Alan Turing's final research.</p>
      <ul class="list-disc pl-5 mb-4">
        <li>Decrypt messages.</li>
        <li>Unlock classified files.</li>
        <li>Complete the final imitation test.</li>
      </ul>
      <p>Current Progress: 40%</p>
    `);
  });

  container.querySelector('#nav-turing').addEventListener('click', () => {
    openModal('ABOUT ALAN TURING', `
      <p class="mb-4">Alan Turing (1912-1954) was a brilliant mathematician, logician, and computer scientist.</p>
      <ul class="list-disc pl-5 mb-4">
        <li>Father of theoretical computer science and AI.</li>
        <li>Led the Enigma codebreaking effort at Bletchley Park during WWII.</li>
        <li>Proposed the Turing Test as a benchmark for artificial intelligence.</li>
      </ul>
    `);
  });

  container.querySelector('#nav-settings').addEventListener('click', () => {
    openModal('SYSTEM SETTINGS', `
      <div class="space-y-4">
        <label class="flex items-center justify-between"><input type="checkbox" checked> Music</label>
        <label class="flex items-center justify-between"><input type="checkbox" checked> Sound Effects</label>
        <label class="flex items-center justify-between"><input type="checkbox" checked> CRT Effects</label>
        <label class="flex items-center justify-between"><input type="checkbox" checked> Scanlines</label>
      </div>
    `);
  });

  return container;
}
