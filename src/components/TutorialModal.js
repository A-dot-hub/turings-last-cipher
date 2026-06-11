export function renderTutorialModal({ onComplete }) {
  const container = document.createElement("div");
  container.className =
    "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300";

  setTimeout(() => container.classList.replace("opacity-0", "opacity-100"), 50);

  const modal = document.createElement("div");
  modal.className =
    "bg-bg-secondary border border-terminal-green/30 p-8 max-w-lg w-full shadow-[0_0_20px_rgba(34,197,94,0.1)]";

  modal.innerHTML = `
    <h2 class="text-2xl font-display text-terminal-green mb-6 text-glow">SYSTEM BOOT: OPERATOR GUIDE</h2>
    <div class="space-y-4 text-text-primary text-sm leading-relaxed mb-8">
      <p>Welcome, Operator. You are accessing the Turing Archive. Your primary objective is to decrypt restricted communications.</p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Use the <strong>Terminal</strong> to input decryption commands.</li>
        <li>Refer to your <strong>Notebook</strong> to save and track key findings.</li>
        <li>Access the <strong>Document Archive</strong> to review decrypted logs.</li>
      </ul>
      <p class="text-terminal-green/70">Good luck. Every packet counts.</p>
    </div>
    <button id="btn-close-tutorial" class="w-full py-3 bg-terminal-green/10 border border-terminal-green hover:bg-terminal-green/20 text-terminal-green transition-colors font-display tracking-widest">
      INITIALIZE SYSTEM
    </button>
  `;

  container.appendChild(modal);

  setTimeout(() => {
    container
      .querySelector("#btn-close-tutorial")
      .addEventListener("click", () => {
        container.classList.replace("opacity-100", "opacity-0");
        setTimeout(() => container.remove(), 300);
        if (onComplete) onComplete();
      });
  }, 0);

  return container;
}
