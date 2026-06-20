export function renderSystemLogPanel() {
  const panel = document.createElement("div");
  // Bottom right, compact,
  panel.className =
    "fixed bottom-6 right-6 w-72 flex flex-col items-end gap-2 z-40 pointer-events-none";
  panel.id = "system-log-panel";

  const addLog = (message) => {
    const div = document.createElement("div");
    // Styling for individual log: compact, neon, semi-transparent
    div.className =
      "bg-[#0B1120]/80 border border-terminal-green/30 p-2 font-mono text-[10px] text-terminal-green/80 shadow-[0_0_5px_rgba(34,197,94,0.2)] transition-all duration-500 opacity-0";
    div.textContent = `> ${message}`;

    panel.appendChild(div);

    // Fade in
    requestAnimationFrame(() => div.classList.remove("opacity-0"));

    // Fade out and cleanup
    setTimeout(() => {
      div.classList.add("opacity-0");
      setTimeout(() => div.remove(), 500);
    }, 3000);

    // Max 3 visible
    if (panel.children.length > 3) {
      panel.removeChild(panel.firstChild);
    }
  };

  // Initial logs
  const baseLogs = [
    "NETWORK CONNECTED",
    "ARCHIVE UNLOCKED",
    "SYSTEM INITIALIZED",
  ];

  baseLogs.forEach(addLog);

  // Periodic update
  const interval = setInterval(() => {
    const newLogs = [
      "CIPHER SOLVED",
      "ACHIEVEMENT EARNED: PERSISTENCE",
      "CHAPTER 02 UNLOCKED",
      "NETWORK: BUFFER SYNC",
      "SYSTEM: NODE ACTIVE",
    ];
    addLog(newLogs[Math.floor(Math.random() * newLogs.length)]);
  }, 4000);

  panel.dataset.intervalId = interval;

  return panel;
}
