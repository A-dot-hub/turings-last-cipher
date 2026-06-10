export class StateManager {
  constructor() {
    this.memoryKey = 'turings_last_cipher_save';
    this.state = this.load();
  }

  load() {
    const raw = localStorage.getItem(this.memoryKey);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch(e) {
        return this.getDefaultState();
      }
    }
    return this.getDefaultState();
  }

  save() {
    localStorage.setItem(this.memoryKey, JSON.stringify(this.state));
  }

  getDefaultState() {
    return {
      unlockedLevel: 1,
      achievements: [],
      adaApproval: 0,
      dialogueProgress: {
        1: false,
        4: false,
        8: false
      }
    };
  }

  unlockLevel(id) {
    if (id > this.state.unlockedLevel) {
      this.state.unlockedLevel = id;
      this.save();
    }
  }

  unlockAchievement(id) {
    if (!this.state.achievements.includes(id)) {
      this.state.achievements.push(id);
      this.save();
      return true; // Used to trigger UI notification
    }
    return false;
  }

  updateAdaApproval(change, isUp) {
    if (change === 'approval_up') this.state.adaApproval += 1;
    if (change === 'approval_down') this.state.adaApproval -= 1;
    this.save();
  }

  markDialogueComplete(chapterId) {
    this.state.dialogueProgress[chapterId] = true;
    this.save();
  }
}

export const stateManager = new StateManager();
