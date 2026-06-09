import { audioManager } from '../managers/AudioManager.js';

export function renderBootSequence({ onComplete }) {
  const container = document.createElement('div');
  container.className = "flex flex-col h-full w-full max-w-4xl mx-auto p-8 z-10 relative text-terminal-green font-mono text-sm leading-relaxed overflow-hidden";
  
  const content = document.createElement('div');
  container.appendChild(content);

  const lines = [
    "BIOS STARDATE 15.02.1954",
    "INITIALIZING KERNEL...",
    "MOUNTING ENCRYPTED VOLUMES... OK.",
    "LOADING MEMORY SECTORS [|||||||||||||||||| 100%]",
    "CONNECTING TO SECURE MAINFRAME...",
    "ESTABLISHING DECRYPTION PROTOCOLS...",
    "WARNING: UNAUTHORIZED ACCESS DETECTED.",
    "BYPASSING SECURITY MEASURES...",
    "ACCESS GRANTED.",
    "WAKING ADA..."
  ];

  let currentLine = 0;

  const typeLine = () => {
    if (currentLine >= lines.length) {
      setTimeout(() => {
        container.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
        setTimeout(onComplete, 1000);
      }, 1000);
      return;
    }

    const lineWrapper = document.createElement('div');
    content.appendChild(lineWrapper);
    
    const text = lines[currentLine];
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < text.length) {
        lineWrapper.innerHTML = text.substring(0, charIndex + 1) + '<span class="typing-cursor"></span>';
        if (Math.random() > 0.5) audioManager.playTone(400 + Math.random()*100, 'square', 0.02, 0.1);
        charIndex++;
        setTimeout(typeChar, Math.random() * 30 + 10);
      } else {
        lineWrapper.innerHTML = text; // Remove cursor from completed line
        currentLine++;
        setTimeout(typeLine, Math.random() * 400 + 100);
      }
    };

    typeChar();
  };

  setTimeout(typeLine, 500);

  return container;
}
