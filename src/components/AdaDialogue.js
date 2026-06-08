export function renderAdaDialogue({ text, onComplete }) {
  const container = document.createElement('div');
  container.className = "font-mono text-terminal-green text-sm min-h-[3rem] flex items-start w-full";
  
  const label = document.createElement('span');
  label.className = "mr-2 opacity-70 mt-[0.1em]";
  label.innerText = "ADA>";

  const content = document.createElement('span');
  content.className = "leading-relaxed whitespace-pre-wrap flex-grow";

  const cursor = document.createElement('span');
  cursor.className = "w-2 h-4 bg-terminal-green ml-1 inline-block align-middle animate-pulse";

  container.appendChild(label);
  container.appendChild(content);

  let i = 0;
  const interval = setInterval(() => {
    content.innerText = text.substring(0, i + 1);
    content.appendChild(cursor);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, 40);

  container.cleanup = () => clearInterval(interval);

  return container;
}
