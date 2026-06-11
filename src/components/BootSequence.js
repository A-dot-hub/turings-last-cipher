import { audioManager } from "../managers/AudioManager.js";

export function renderBootSequence({ onComplete }) {
  const container = document.createElement("div");
  container.className =
    "flex flex-col h-full w-full max-w-4xl mx-auto p-8 z-10 relative text-terminal-green font-mono text-sm leading-relaxed overflow-hidden";

  // Matrix Canvas
  const canvas = document.createElement("canvas");
  canvas.className = "fixed inset-0 z-0 opacity-40";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width, height, columns, drops;

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / 20);
    drops = Array(columns).fill(1);

    // Clear canvas when resizing
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
  };
  window.addEventListener("resize", resize);
  resize();

  const cleanup = () => {
    window.removeEventListener("resize", resize);
    clearInterval(interval);
  };

  const draw = () => {
    if (!width || !height) return;
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#22c55e";
    ctx.font = "15px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = Math.random() > 0.5 ? "0" : "1";
      ctx.fillText(text, i * 20, drops[i] * 20);
      if (drops[i] * 20 > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  };
  const interval = setInterval(draw, 50);

  const content = document.createElement("div");
  content.className = "relative z-10";
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
    "WAKING ADA...",
  ];

  let currentLine = 0;

  const typeLine = () => {
    if (currentLine >= lines.length) {
      setTimeout(() => {
        cleanup();
        canvas.remove(); // Remove canvas explicitly
        container.classList.add(
          "opacity-0",
          "transition-opacity",
          "duration-1000",
        );
        setTimeout(onComplete, 1000);
      }, 1000);
      return;
    }

    const lineWrapper = document.createElement("div");
    content.appendChild(lineWrapper);

    const text = lines[currentLine];
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < text.length) {
        lineWrapper.innerHTML =
          text.substring(0, charIndex + 1) +
          '<span class="typing-cursor"></span>';
        if (Math.random() > 0.5)
          audioManager.playTone(400 + Math.random() * 100, "square", 0.02, 0.1);
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
