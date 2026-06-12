import { renderMainMenu } from "./components/MainMenu.js";
import { renderLevelSelect } from "./components/LevelSelect.js";
import { renderPuzzleTerminal } from "./components/PuzzleTerminal.js";
import { renderCrtOverlay } from "./components/CrtOverlay.js";
import { renderAchievements } from "./components/Achievements.js";
import { renderBootSequence } from "./components/BootSequence.js";
import { renderArchive } from "./components/Archive.js";
import { renderNotebook } from "./components/Notebook.js";
import { renderTutorialModal } from "./components/TutorialModal.js";
import { renderTopNav } from "./components/TopNav.js";
import { renderSystemLogPanel } from "./components/SystemLogPanel.js";
import { LEVELS } from "./data/gameData.js";
import { audioManager } from "./managers/AudioManager.js";
import { stateManager } from "./managers/StateManager.js";

export class App {
  constructor(rootElement) {
    this.root = rootElement;

    // Only show boot sequence if not previously booted this session
    if (!sessionStorage.getItem("turing_booted")) {
      this.viewState = "boot";
    } else {
      this.viewState = "menu";
    }

    this.currentLevel = stateManager.state.unlockedLevel;
    this.render();
  }

  setViewState(view) {
    console.log("Setting view state to:", view);
    if (view === "menu") {
      sessionStorage.setItem("turing_booted", "1");
    }
    this.viewState = view;
    this.render();
  }

  setCurrentLevel(id) {
    this.currentLevel = id;
  }

  handleSolve(levelId) {
    const next = levelId + 1;
    if (next <= LEVELS.length) {
      stateManager.unlockLevel(next);
      this.setViewState("chapters");
    } else {
      // Game Complete
      this.setViewState("menu");
    }
  }

  render() {
    this.root.innerHTML = "";
    this.root.className =
      "h-screen w-screen bg-bg-primary text-text-primary overflow-hidden relative selection:bg-terminal-green/30 selection:text-terminal-green-dark";

    // Init audio on first render interaction handled via buttons usually, but we call it here to ensure it's ready
    const initAudio = () => {
      audioManager.init();
      audioManager.startHum();
      document.removeEventListener("click", initAudio);
    };
    document.addEventListener("click", initAudio);

    this.root.appendChild(renderCrtOverlay());

    if (this.viewState !== "boot") {
      const progress = (stateManager.state.unlockedLevel - 1) / LEVELS.length;
      this.root.appendChild(
        renderTopNav({ currentChapter: this.currentLevel, progress }),
      );
      this.root.appendChild(renderSystemLogPanel());
    }

    const bg = document.createElement("div");
    bg.className =
      "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_100%)] pointer-events-none";
    this.root.appendChild(bg);

    const main = document.createElement("main");
    main.className = "h-full w-full relative z-10 pt-10 pb-6 px-4 md:px-0";

    const viewContainer = document.createElement("div");
    viewContainer.className = "h-full w-full transition-all duration-300";

    if (this.viewState === "boot") {
      const boot = renderBootSequence({
        onComplete: () => this.setViewState("menu"),
      });
      viewContainer.appendChild(boot);
    } else if (this.viewState === "menu") {
      const menu = renderMainMenu({
        onBegin: () => this.setViewState("chapters"),
        onNavigate: (route) => this.setViewState(route),
      });
      viewContainer.appendChild(menu);

      // Show tutorial if first time
      if (!sessionStorage.getItem("tutorial_shown")) {
        const tutorial = renderTutorialModal({
          onComplete: () => {
            sessionStorage.setItem("tutorial_shown", "1");
          },
        });
        viewContainer.appendChild(tutorial);
      }
    } else if (this.viewState === "chapters") {
      const chapters = renderLevelSelect({
        unlockedLevel: stateManager.state.unlockedLevel,
        levels: LEVELS,
        onBack: () => this.setViewState("menu"),
        onSelect: (id) => {
          this.setCurrentLevel(id);
          this.setViewState("puzzle");
        },
      });
      viewContainer.appendChild(chapters);
    } else if (this.viewState === "puzzle") {
      const level = LEVELS.find((l) => l.id === this.currentLevel) || LEVELS[0];
      const puzzle = renderPuzzleTerminal({
        level,
        onBack: () => this.setViewState("chapters"),
        onSolve: (id) => this.handleSolve(id),
      });
      viewContainer.appendChild(puzzle);
    } else if (this.viewState === "achievements") {
      const achievements = renderAchievements({
        onBack: () => this.setViewState("menu"),
      });
      viewContainer.appendChild(achievements);
    } else if (this.viewState === "archive") {
      const archive = renderArchive({
        onBack: () => this.setViewState("menu"),
      });
      viewContainer.appendChild(archive);
    } else if (this.viewState === "notebook") {
      const notebook = renderNotebook({
        onBack: () => this.setViewState("menu"),
      });
      viewContainer.appendChild(notebook);
    }

    main.appendChild(viewContainer);
    this.root.appendChild(main);

    [
      "top-4 left-4 border-t-2 border-l-2",
      "top-4 right-4 border-t-2 border-r-2",
      "bottom-4 left-4 border-b-2 border-l-2",
      "bottom-4 right-4 border-b-2 border-r-2",
    ].forEach((classes) => {
      const corner = document.createElement("div");
      corner.className = `fixed w-8 h-8 border-terminal-green/30 pointer-events-none z-40 hidden md:block ${classes}`;
      this.root.appendChild(corner);
    });
  }
}
