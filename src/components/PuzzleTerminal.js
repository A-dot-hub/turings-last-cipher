import { Icons, renderIcon } from "../icons.js";
import { renderAdaDialogue } from "./AdaDialogue.js";
import { ADA_DIALOGUE_SCENES } from "../data/dialogueData.js";
import { stateManager } from "../managers/StateManager.js";
import { audioManager } from "../managers/AudioManager.js";

const commandHistory = [];
let historyIndex = -1;

export function renderPuzzleTerminal({ level, onBack, onSolve }) {
  const container = document.createElement("div");
  container.className =
    "flex flex-col h-full w-full max-w-5xl mx-auto p-4 md:p-8 z-10 relative font-mono opacity-0 transition-opacity duration-500 scale-95";

  setTimeout(() => {
    container.classList.remove("opacity-0", "scale-95");
    container.classList.add("opacity-100", "scale-100");
  }, 50);

  const isTuringTest = level.type === "turingtest";

  container.innerHTML = `
    <div class="flex items-center justify-between mb-8 pb-4 border-b border-panel">
      <button id="btn-abort" class="flex items-center space-x-2 text-text-secondary hover:text-terminal-green transition-colors cursor-pointer">
        ${renderIcon(Icons.ArrowLeft, "w-4 h-4")}
        <span class="hidden md:inline">ABORT SEQUENCE</span>
      </button>
      <div class="flex items-center space-x-4">
        ${renderIcon(Icons.Terminal, "w-5 h-5 text-terminal-green animate-pulse")}
        <span class="text-terminal-green tracking-widest text-sm text-glow">TERMINAL_${level.id.toString().padStart(2, "0")}</span>
        <span class="text-[10px] bg-red-900/20 text-red-500 border border-red-900/30 px-2 py-0.5 ml-2">THREAT: ${level.difficulty}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
      <div class="flex flex-col space-y-6 overflow-y-auto w-full">
        <div class="bg-bg-secondary border border-panel p-6 w-full">
          <h3 class="text-text-secondary text-xs tracking-widest mb-4 flex items-center">
            ${renderIcon(Icons.ShieldAlert, "w-3 h-3 mr-2")}
            ARCHIVE METADATA
          </h3>
          <p class="whitespace-pre-wrap text-text-primary text-sm leading-relaxed">${level.lore}</p>
        </div>

        <div class="bg-bg-secondary border border-panel p-6 flex-grow flex flex-col w-full min-h-[300px]">
          <h3 class="text-text-secondary text-xs tracking-widest mb-4 flex items-center">
            ${renderIcon(Icons.Cpu, "w-3 h-3 mr-2")}
            ADA ASSISTANT
          </h3>
          
          <div id="ada-dialogue-container" class="flex-grow overflow-y-auto mb-4 custom-scrollbar text-sm space-y-4"></div>
          
          <div id="ada-choices" class="flex flex-col space-y-2 mt-auto"></div>
        </div>
      </div>

      <div class="lg:col-span-2 flex flex-col w-full">
        <div class="bg-bg-secondary border border-panel p-6 md:p-10 flex-grow flex flex-col justify-between overflow-hidden">
          ${isTuringTest ? renderTuringTestUI(level) : renderStandardPuzzleUI(level)}
        </div>
      </div>
    </div>
  `;

  function renderStandardPuzzleUI(lvl) {
    return `
      <div>
        <div class="text-text-secondary text-xs tracking-widest mb-6">ENCRYPTED PAYLOAD</div>
        <div class="font-display text-2xl md:text-4xl text-terminal-green tracking-[0.2em] break-words mb-8 px-4 py-6 bg-black/30 border border-terminal-green/20 text-glow shadow-[inset_0_0_20px_rgba(34,197,94,0.05)] text-center">
          ${lvl.cipherText}
        </div>
      </div>

      <div class="mt-8" id="form-container">
        <div id="error-msg" class="text-red-400 text-xs mb-4 uppercase hidden"></div>
        <form id="puzzle-form" class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-4 font-display text-terminal-green z-10 text-xl pointer-events-none">></div>
          <input type="text" id="puzzle-input" placeholder="ENTER PLAINTEXT" 
            class="w-full bg-black/50 border border-terminal-green/50 text-terminal-green text-xl font-display px-12 py-6 focus:outline-none focus:border-terminal-green focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all uppercase" autofocus>
        </form>
        <div id="success-msg" class="hidden text-center p-8 border border-terminal-green bg-terminal-green/10 transform transition-all scale-95 opacity-0 duration-500">
          <div class="text-xl text-terminal-green mb-2 text-glow">DECRYPTION SUCCESSFUL</div>
          <div class="text-text-secondary text-sm">Proceeding to next archive or directory...</div>
        </div>
      </div>
    `;
  }

  function renderTuringTestUI(lvl) {
    return `
      <div class="flex flex-col h-full min-h-0">
        <div class="text-text-secondary text-xs tracking-widest mb-4 flex-shrink-0">THE IMITATION GAME: IDENTITY ANALYSIS</div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 flex-grow overflow-y-auto custom-scrollbar p-1">
          <div class="bg-black/30 border border-panel p-4 flex flex-col h-full">
            <h4 class="text-accent-gold mb-4 border-b border-panel pb-2 flex-shrink-0">ENTITY A</h4>
            <div class="space-y-4 text-sm text-text-primary leading-relaxed opacity-90 overflow-y-auto flex-grow custom-scrollbar pr-2">
              ${lvl.entities.A.map((t) => `<p class="bg-bg-secondary p-3 border-l-2 border-accent-gold/50">"${t}"</p>`).join("")}
            </div>
            <button class="mt-4 w-full py-2 border border-accent-gold/50 text-accent-gold hover:bg-accent-gold/10 transition-colors btn-select-entity flex-shrink-0" data-entity="A">SELECT A AS HUMAN</button>
          </div>
          
          <div class="bg-black/30 border border-panel p-4 flex flex-col h-full">
            <h4 class="text-accent-blue mb-4 border-b border-panel pb-2 flex-shrink-0">ENTITY B</h4>
            <div class="space-y-4 text-sm text-text-primary leading-relaxed opacity-90 overflow-y-auto flex-grow custom-scrollbar pr-2">
              ${lvl.entities.B.map((t) => `<p class="bg-bg-secondary p-3 border-l-2 border-accent-blue/50">"${t}"</p>`).join("")}
            </div>
            <button class="mt-4 w-full py-2 border border-accent-blue/50 text-accent-blue hover:bg-accent-blue/10 transition-colors btn-select-entity flex-shrink-0" data-entity="B">SELECT B AS HUMAN</button>
          </div>
        </div>

        <div class="mt-auto flex-shrink-0" id="form-container">
          <div id="error-msg" class="text-red-400 text-xs mb-4 uppercase hidden"></div>
          <div id="tt-result" class="hidden font-display text-terminal-green text-center p-6 border border-terminal-green block"></div>
          <div id="success-msg" class="hidden text-center p-8 border border-terminal-green bg-terminal-green/10 transform transition-all scale-95 opacity-0 duration-500">
            <div class="text-xl text-terminal-green mb-2 text-glow">${lvl.answerPlaintext}</div>
            <div class="text-text-secondary text-sm">The simulation is complete...</div>
          </div>
        </div>
      </div>
    `;
  }

  setTimeout(() => {
    container.querySelector("#btn-abort").addEventListener("click", onBack);

    // ADA Branching Dialogue Logic
    const adaDialogueContainer = container.querySelector(
      "#ada-dialogue-container",
    );
    const adaChoices = container.querySelector("#ada-choices");
    let currentAda;

    function renderNode(nodeId) {
      adaChoices.innerHTML = "";
      if (currentAda && currentAda.cleanup) currentAda.cleanup();

      if (nodeId === "END") {
        const hintBtn = document.createElement("button");
        hintBtn.className =
          "text-xs text-terminal-green hover:bg-terminal-green/10 border border-terminal-green/30 px-3 py-2 transition-colors cursor-pointer w-full text-center";
        hintBtn.innerText = "[ REQUEST HINT ]";
        hintBtn.addEventListener("click", () => {
          hintBtn.disabled = true;
          hintBtn.classList.add("opacity-50");
          if (currentAda && currentAda.cleanup) currentAda.cleanup();
          adaDialogueContainer.innerHTML = "";
          currentAda = renderAdaDialogue({ text: level.hint });
          adaDialogueContainer.appendChild(currentAda);
        });
        adaChoices.appendChild(hintBtn);

        adaDialogueContainer.innerHTML = "";
        currentAda = renderAdaDialogue({ text: "Awaiting input..." });
        adaDialogueContainer.appendChild(currentAda);
        return;
      }

      const node = ADA_DIALOGUE_SCENES[nodeId];
      if (!node) return renderNode("END");

      adaDialogueContainer.innerHTML = "";
      currentAda = renderAdaDialogue({
        text: node.text,
        onComplete: () => {
          node.choices.forEach((choice) => {
            const btn = document.createElement("button");
            btn.className =
              "text-xs text-left p-2 border border-panel hover:border-terminal-green/50 hover:bg-terminal-green/5 transition-colors text-text-secondary hover:text-terminal-green w-full";
            btn.innerText = `> ${choice.text}`;
            btn.addEventListener("click", () => {
              audioManager.playKeypress();
              if (choice.effect) {
                stateManager.updateAdaApproval(choice.effect);
              }
              renderNode(choice.next);
            });
            adaChoices.appendChild(btn);
          });
        },
      });
      adaDialogueContainer.appendChild(currentAda);
    }

    // Determine initial node
    let startNode = "END";
    if (level.id === 1 && !stateManager.state.dialogueProgress[1]) {
      startNode = "START";
      stateManager.markDialogueComplete(1);
    } else if (level.id === 4 && !stateManager.state.dialogueProgress[4]) {
      startNode = "CHAPTER_4_START";
      stateManager.markDialogueComplete(4);
    } else if (level.id === 8 && !stateManager.state.dialogueProgress[8]) {
      startNode = "CHAPTER_8_START";
      stateManager.markDialogueComplete(8);
    }

    renderNode(startNode);

    // Standard Form Logic
    if (!isTuringTest) {
      const form = container.querySelector("#puzzle-form");
      const input = container.querySelector("#puzzle-input");
      const errorMsg = container.querySelector("#error-msg");
      const successMsg = container.querySelector("#success-msg");

      input.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value =
              commandHistory[commandHistory.length - 1 - historyIndex];
          }
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (historyIndex > 0) {
            historyIndex--;
            input.value =
              commandHistory[commandHistory.length - 1 - historyIndex];
          } else if (historyIndex === 0) {
            historyIndex = -1;
            input.value = "";
          }
        }
      });
      input.addEventListener("input", (e) => {
        audioManager.playKeypress();
        e.target.value = e.target.value.toUpperCase();
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const val = input.value.trim().toUpperCase();
        if (val && commandHistory[commandHistory.length - 1] !== val) {
          commandHistory.push(val);
        }
        historyIndex = -1;
        if (val === level.plainText) {
          audioManager.playSuccess();
          errorMsg.classList.add("hidden");
          form.classList.add("hidden");
          successMsg.classList.remove("hidden");
          setTimeout(() => {
            successMsg.classList.remove("scale-95", "opacity-0");
            successMsg.classList.add("scale-100", "opacity-100");
          }, 50);

          if (currentAda && currentAda.cleanup) currentAda.cleanup();

          setTimeout(() => {
            if (level.id === 1) stateManager.unlockAchievement("FIRST_DECRYPT");
            if (level.type === "morse")
              stateManager.unlockAchievement("MORSE_MASTER");
            onSolve(level.id);
          }, 3000);
        } else {
          audioManager.playError();
          errorMsg.innerText = "DECRYPTION FAILED. INVALID PLAINTEXT.";
          errorMsg.classList.remove("hidden");
        }
      });

      input.focus();
    } else {
      // Turing Test Logic
      const btns = container.querySelectorAll(".btn-select-entity");
      const errorMsg = container.querySelector("#error-msg");
      const ttResult = container.querySelector("#tt-result");
      const successMsg = container.querySelector("#success-msg");

      btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const selected = e.target.getAttribute("data-entity");
          if (selected === level.answer) {
            audioManager.playSuccess();
            stateManager.unlockAchievement("TURING_TEST");
            if (stateManager.state.adaApproval > 0) {
              stateManager.unlockAchievement("ADA_FRIEND");
            }

            errorMsg.classList.add("hidden");
            btns.forEach((b) => b.classList.add("hidden"));

            ttResult.innerText = `CORRECT. YOU HAVE DISTINGUISHED HUMAN FROM MACHINE.`;
            ttResult.classList.remove("hidden");

            setTimeout(() => {
              successMsg.classList.remove("hidden");
              setTimeout(() => {
                successMsg.classList.remove("scale-95", "opacity-0");
                successMsg.classList.add("scale-100", "opacity-100");
              }, 50);
            }, 2000);

            setTimeout(() => {
              onSolve(level.id); // Trigger end of game
            }, 6000);
          } else {
            audioManager.playError();
            errorMsg.innerText = "INCORRECT. THE MACHINE DECEIVED YOU.";
            errorMsg.classList.remove("hidden");
          }
        });
      });
    }
  }, 0);

  return container;
}
