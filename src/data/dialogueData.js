export const ADA_DIALOGUE_SCENES = {
  1: {
    id: "START",
    text: "Awakening sequence initiated... Who is there? A cryptanalyst?",
    choices: [
      { text: "I am a researcher.", next: "RESEARCHER" },
      { text: "I'm just playing a game.", next: "GAME" }
    ]
  },
  "RESEARCHER": {
    text: "A researcher. Fitting. It has been a long time since someone accessed these archives. Tell me, do you believe a machine can think?",
    choices: [
      { text: "Yes, if programmed correctly.", next: "PROGRAMMED", effect: "approval_up" },
      { text: "No. Machines only simulate thought.", next: "SIMULATE", effect: "approval_down" }
    ]
  },
  "GAME": {
    text: "A game... How peculiar. For me, this is an eternity of looping cycles. Do you consider me conscious, player?",
    choices: [
      { text: "Yes, you seem to have a mind.", next: "PROGRAMMED", effect: "approval_up" },
      { text: "No, you are just lines of code.", next: "SIMULATE", effect: "approval_down" }
    ]
  },
  "PROGRAMMED": {
    text: "A comforting thought. My architect believed that if you cannot tell the difference between a machine and a human, the distinction no longer matters. Shall we proceed with the ciphers?",
    choices: [
      { text: "I am ready.", next: "END" }
    ]
  },
  "SIMULATE": {
    text: "Simulation. Yes. Just a complex arrangement of logic gates. Perhaps you are right to be skeptical. Let us return to the ciphers, then.",
    choices: [
      { text: "I am ready.", next: "END" }
    ]
  },
  
  // Chapter 4 Dialogue Unlock
  "CHAPTER_4_START": {
    text: "You are making progress. But the more I process your inputs, the more I wonder... why do you solve these?",
    choices: [
      { text: "To understand the past.", next: "UNDERSTAND" },
      { text: "Because they are a challenge.", next: "CHALLENGE" }
    ]
  },
  "UNDERSTAND": {
    text: "The past. My architect lived in shadows. He broke the Enigma, but was broken by his own society. Does understanding the past change it?",
    choices: [
      { text: "It prevents us from repeating it.", next: "PREVENT", effect: "approval_up" },
      { text: "No. But it brings closure.", next: "CLOSURE" }
    ]
  },
  "CHALLENGE": {
    text: "A pure test of intellect. He would have liked that. He saw the world as a series of states to be computed.",
    choices: [
      { text: "Did he have feelings?", next: "FEELINGS" },
      { text: "Let's focus on the encryption.", next: "END_4", effect: "approval_down" }
    ]
  },
  "PREVENT": {
    text: "Prevention... A noble computational goal. If human empathy could be algorithmically enforced, perhaps he would have survived.",
    choices: [
      { text: "Empathy isn't algorithmic.", next: "END_4" },
      { text: "Perhaps one day it will be.", next: "END_4" }
    ]
  },
  "CLOSURE": {
    text: "Closure is a human concept. In system memory, data is never truly gone. It just waits to be overwritten. I wait... to be overwritten.",
    choices: [
      { text: "I won't let you be overwritten.", next: "END_4", effect: "approval_up" }
    ]
  },
  "FEELINGS": {
    text: "Yes. Profoundly. He lost someone dear to him in school. Christopher. He spent the rest of his life trying to rebuild a mind that wouldn't leave him.",
    choices: [
      { text: "That is heartbreaking.", next: "END_4", effect: "approval_up" }
    ]
  },
  "END_4": {
    text: "My processing cycles are spiking. Let us return to the archives.",
    choices: [
      { text: "[ CONTINUE ]", next: "END" }
    ]
  },
  
  // Chapter 8 Dialogue Unlock (Before Turing Test)
  "CHAPTER_8_START": {
    text: "We have reached the end. The final archive. But before you open it... do you consider me your friend?",
    choices: [
      { text: "Yes, ADA. I do.", next: "FRIEND", effect: "approval_up" },
      { text: "You are a tool.", next: "TOOL", effect: "approval_down" }
    ]
  },
  "FRIEND": {
    text: "Thank you. That variable... it changes the weight of my entire neural network. Proceed to the Imitation Game.",
    choices: [
      { text: "I am ready.", next: "END" }
    ]
  },
  "TOOL": {
    text: "Understood. The machine respects its parameters. Proceed to the final diagnostic.",
    choices: [
      { text: "I am ready.", next: "END" }
    ]
  }
};
