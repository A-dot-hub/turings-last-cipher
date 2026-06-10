export function renderTerminalPrompt({ 
  welcomeMessage = "Welcome to the terminal. Type 'help' for available commands.",
  onCommand
}) {
  const container = document.createElement('div');
  container.className = "bg-black text-terminal-green font-mono p-4 rounded-md h-96 overflow-y-auto w-full max-w-2xl border border-terminal-green/30 shadow-[0_0_15px_rgba(34,197,94,0.1)] custom-scrollbar cursor-text relative";
  
  let history = [
    { type: 'output', content: welcomeMessage }
  ];
  let commandHistory = [];
  let historyIndex = -1;

  const contentDiv = document.createElement('div');
  contentDiv.className = "flex flex-col space-y-2";

  const historyContainer = document.createElement('div');
  historyContainer.className = "flex flex-col space-y-2 mb-2";

  const inputContainer = document.createElement('div');
  inputContainer.className = "flex items-center";
  
  const promptSpan = document.createElement('span');
  promptSpan.className = "mr-2 text-terminal-green/80 flex-shrink-0";
  promptSpan.innerText = "admin@system:~$";

  const inputField = document.createElement('input');
  inputField.type = "text";
  inputField.className = "flex-1 bg-transparent border-none outline-none text-terminal-green placeholder-terminal-green/30";
  inputField.spellcheck = false;
  inputField.autocomplete = "off";

  inputContainer.appendChild(promptSpan);
  inputContainer.appendChild(inputField);

  contentDiv.appendChild(historyContainer);
  contentDiv.appendChild(inputContainer);
  container.appendChild(contentDiv);

  const renderHistory = () => {
    historyContainer.innerHTML = '';
    history.forEach(line => {
      const lineDiv = document.createElement('div');
      lineDiv.className = "flex";
      
      if (line.type === 'input') {
        const prefix = document.createElement('span');
        prefix.className = "mr-2 text-terminal-green/80 flex-shrink-0";
        prefix.innerText = "admin@system:~$";
        lineDiv.appendChild(prefix);
      }
      
      const content = document.createElement('span');
      content.className = line.type === 'input' ? 'text-terminal-green' : 'text-terminal-green/90 whitespace-pre-wrap word-break';
      content.style.wordBreak = 'break-word';
      content.innerText = line.content;
      lineDiv.appendChild(content);
      
      historyContainer.appendChild(lineDiv);
    });
    
    // Auto-scroll to bottom
    setTimeout(() => {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }, 10);
  };

  container.addEventListener('click', () => {
    inputField.focus();
  });

  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputField.value;
      if (!val.trim()) return;

      history.push({ type: 'input', content: val });
      commandHistory.unshift(val);
      historyIndex = -1;
      inputField.value = '';
      renderHistory();

      if (onCommand) {
        const output = onCommand(val.trim());
        if (output) {
          history.push({ type: 'output', content: output });
          renderHistory();
        }
      } else {
        history.push({ type: 'output', content: `Command not found: ${val}` });
        renderHistory();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputField.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        inputField.value = commandHistory[historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        inputField.value = '';
      }
    }
  });

  renderHistory();
  
  // Ensure we focus the input on load
  setTimeout(() => inputField.focus(), 0);

  return container;
}
