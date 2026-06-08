# JavaScript Architecture

## Module Structure

The project has been adapted to modern React (Vite environment) to provide robust state management for a browser-based UI, while honoring the vanilla DOM architecture request conceptually.

- `src/App.tsx`: Main React component, handles routing and global state (Menu, Chapters, Puzzle contexts).
- `src/components/`: Reusable, modular UI components (`MainMenu`, `PuzzleTerminal`, `AdaDialogue`).
- `src/data/`: JSON structures and configuration files holding levels, cipher texts, and lore.
- `src/lib/`: Standalone utility functions (e.g., pure JavaScript cryptography functions like Caesar Shift or Atbash).

## Save System
- Utilizes the browser's `localStorage` API to save chapter progress persistently on the client side.
- Structure saved: `turings_cipher_progress` storing the highest unlocked level.

## Global Concepts / Managers

- **State Manager (App.tsx)**: Replaces traditional generic Routers. Manages `ViewState` (`menu`, `chapters`, `puzzle`) to instantly transition the player.
- **Level Loader (LevelSelect.tsx)**: Fetches puzzle configuration from `gameData.ts` and prepares the Terminal.
- **Dialogue System (AdaDialogue.tsx)**: Handles the typewriter effect, character-by-character render intervals, and callback completions mimicking a terminal stream.
