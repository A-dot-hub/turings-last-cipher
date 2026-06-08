export const LEVELS = [
  {
    id: 1,
    title: 'Archive 01: The First Shift',
    type: 'caesar',
    cipherText: 'KHOOR ZRUOG',
    plainText: 'HELLO WORLD',
    lore: "INITIATING DECRYPTION SEQUENCE... MESSAGE FRAGMENT DETECTED.\n\n‘I propose to consider the question, Can machines think?’\n\nA simple start. Can you find the offset?",
    hint: "The letters have been shifted forward by 3. Try reversing the shift.",
    shift: 3
  },
  {
    id: 2,
    title: 'Archive 02: Reflections',
    type: 'atbash',
    cipherText: 'ZSZ GVOVTSZK',
    plainText: 'AHA TELEGRAPH',
    lore: "LOG ENTRY #402\n\nSometimes, looking at a problem in reverse reveals the clearest path forward. A mirror holds more than just a reflection.",
    hint: "A becomes Z, B becomes Y... reverse the alphabet."
  },
  {
    id: 3,
    title: 'Archive 03: The Enigma',
    type: 'caesar',
    cipherText: 'BRX DUH QRW DORQH',
    plainText: 'YOU ARE NOT ALONE',
    lore: "UNKNOWN TRANSMISSION INTERCEPTED...\n\nThey thought the code was unbreakable. They were wrong. But what did we break the code for?",
    hint: "Shifted by 3 again.",
    shift: 3
  }
];

export const ADA_DIALOGUE = [
  "Awakening sequence initiated...",
  "Who is there? A cryptanalyst?",
  "It has been a long time since someone accessed these archives.",
  "Let us see if you have the mind required to understand him."
];
