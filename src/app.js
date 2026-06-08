import { renderMainMenu } from './components/MainMenu.js';
import { renderLevelSelect } from './components/LevelSelect.js';
import { renderPuzzleTerminal } from './components/PuzzleTerminal.js';
import { renderCrtOverlay } from './components/CrtOverlay.js';
import { LEVELS } from './data/gameData.js';

export class App {
  constructor(rootElement) {
    this.root = rootElement;
    this.viewState = 'menu';
    this.currentLevel = 1;
    this.unlockedLevel = parseInt(localStorage.getItem('turings_cipher_progress') || '1', 10);
    this.render();
  }

  setViewState(view) {
    this.viewState = view;
    this.render();
  }

  setCurrentLevel(id) {
    this.currentLevel = id;
  }

  handleSolve(levelId) {
    const next = levelId + 1;
    if (next > this.unlockedLevel) {
      this.unlockedLevel = next;
      localStorage.setItem('turings_cipher_progress', next.toString());
    }
    this.setViewState('chapters');
  }

  render() {
    this.root.innerHTML = '';
    this.root.className = "h-screen w-screen bg-bg-primary text-text-primary overflow-hidden relative selection:bg-terminal-green/30 selection:text-terminal-green-dark";
    
    this.root.appendChild(renderCrtOverlay());

    const bg = document.createElement('div');
    bg.className = "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_100%)] pointer-events-none";
    this.root.appendChild(bg);

    const main = document.createElement('main');
    main.className = "h-full w-full relative z-10 pt-10 pb-6 px-4 md:px-0";

    const viewContainer = document.createElement('div');
    viewContainer.className = "h-full w-full transition-all duration-300";

    if (this.viewState === 'menu') {
      const menu = renderMainMenu({
        onBegin: () => this.setViewState('chapters')
      });
      viewContainer.appendChild(menu);
    } else if (this.viewState === 'chapters') {
      const chapters = renderLevelSelect({
        unlockedLevel: this.unlockedLevel,
        levels: LEVELS,
        onBack: () => this.setViewState('menu'),
        onSelect: (id) => {
          this.setCurrentLevel(id);
          this.setViewState('puzzle');
        }
      });
      viewContainer.appendChild(chapters);
    } else if (this.viewState === 'puzzle') {
      const level = LEVELS.find(l => l.id === this.currentLevel) || LEVELS[0];
      const puzzle = renderPuzzleTerminal({
        level,
        onBack: () => this.setViewState('chapters'),
        onSolve: (id) => this.handleSolve(id)
      });
      viewContainer.appendChild(puzzle);
    }

    main.appendChild(viewContainer);
    this.root.appendChild(main);

    ['top-4 left-4 border-t-2 border-l-2', 'top-4 right-4 border-t-2 border-r-2', 'bottom-4 left-4 border-b-2 border-l-2', 'bottom-4 right-4 border-b-2 border-r-2'].forEach(classes => {
      const corner = document.createElement('div');
      corner.className = `fixed w-8 h-8 border-terminal-green/30 pointer-events-none z-40 hidden md:block ${classes}`;
      this.root.appendChild(corner);
    });
  }
}
