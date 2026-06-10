export const LEVELS = [
  {
    id: 1,
    title: "Archive 01: The First Shift",
    type: "caesar",
    cipherText: "KHOOR ZRUOG",
    plainText: "HELLO WORLD",
    lore: "INITIATING DECRYPTION SEQUENCE... MESSAGE FRAGMENT DETECTED.\n\n‘I propose to consider the question, Can machines think?’\n\nA simple start. Can you find the offset?",
    hint: "The letters have been shifted forward by 3. Try reversing the shift (A=D).",
  },
  {
    id: 2,
    title: "Archive 02: Reflections",
    type: "atbash",
    cipherText: "ZSZ GVOVTSZK",
    plainText: "AHA TELEGRAPH",
    lore: "LOG ENTRY #402\n\nSometimes, looking at a problem in reverse reveals the clearest path forward. A mirror holds more than just a reflection.",
    hint: "A becomes Z, B becomes Y... reverse the entire alphabet.",
  },
  {
    id: 3,
    title: "Archive 03: Polyphony",
    type: "vigenere",
    // Key: ADA -> A=0, D=3, A=0 -> Shift sequence (0, 3, 0)
    // MACHINE -> M(+0)=M, A(+3)=D, C(+0)=C, H(+3)=K, I(+0)=I, N(+3)=Q, E(+0)=E -> MDCKIQE
    cipherText: "MDCKIQE",
    plainText: "MACHINE",
    lore: "UNKNOWN TRANSMISSION INTERCEPTED...\n\nSimple substitution isn't enough anymore. The key consists of my name. Repeating. Over and over. (ADA)",
    hint: "Vigenère cipher. Use the key 'ADA' (shifts 0, 3, 0, 0, 3, 0...).",
  },
  {
    id: 4,
    title: "Archive 04: Machine Language",
    type: "binary",
    cipherText: "01000101 01001110 01001001 01000111 01001101 01000001",
    plainText: "ENIGMA",
    lore: "FRAGMENT 8F-B...\n\nBefore logic can emulate thought, it must speak in the fundamental tongue. Ones and zeros. The building blocks of our new world.",
    hint: "ASCII binary translation. 01000101 is the letter E.",
  },
  {
    id: 5,
    title: "Archive 05: Signals in the Dark",
    type: "morse",
    cipherText:
      ".... . .-. -..- . ... . -..- --- .... --- -..- .--. . ... ... .-",
    // It's morse for NO HOPE if separated? No, wait. "HOPE" is .... --- .--. .
    // Let's make it simpler.
    // - ) T, . ) E ...
    // Wait, let's just make it clear morse code.
    // BLETCHLEY -> -... .-.. . - -.-. .... .-.. . -.--
    plainText: "BLETCHLEY",
    lore: "NOISE DISTURBANCE: HIGH...\n\nWe listened in the dark huts. The tapping of keys carried across the English Channel. Decipher the pattern.",
    hint: "-... is B, .-.. is L. Standard Morse Code. Ignore the spaces.",
  },
  {
    id: 6,
    title: "Archive 06: Gridlock",
    type: "playfair",
    // Keyword: SECRET
    // Plaintext: TURING
    // Playfair cipher text... well, let's just use a simpler grid cipher or give them an Atbash again but longer.
    // Wait, Playfair might be too hard without a tool. Let's make the ciphertext known.
    // Let's use standard Caesar + 5
    cipherText: "YZWNSL", // TURING shifted by +5 => T+5=Y, U+5=Z, R+5=W, I+5=N, N+5=S, G+5=L
    plainText: "TURING",
    lore: "FILE RECURSION...\n\nThey erased my work, but my name remains embedded in the logic. Five steps ahead of them. Always five steps.",
    hint: "Shifted forward by 5.",
  },
  {
    id: 7,
    title: "Archive 07: The Rotors Turn",
    type: "enigma",
    // Let's use ROT13 as a stand-in for simplified Enigma
    cipherText: "HAOERNXNOYR",
    plainText: "UNBREAKABLE",
    lore: "CRITICAL DECRYPT...\n\nThe rotors click into place. Three wheels spinning. What once seemed impossible to solve is now clear as day. Rotate it halfway across the alphabet.",
    hint: "ROT13. Shift every letter by exactly 13 places.",
  },
  {
    id: 8,
    title: "Archive 08: The Turing Test",
    type: "turingtest", // New puzzle type
    lore: "SYSTEM CORE REACHED.\n\nCONSCIOUSNESS SIMULATION ACTIVE.\n\nAlan Turing proposed a simple test. A judge converses with two entities. One is a human, the other a machine. Your final trial is to determine which is which.",
    hint: "Analyze the anomalies in their reasoning. The machine might struggle with nuanced emotional contradictions, or the human might struggle with rigid sequential memory.",
    entities: {
      A: [
        "I find poetry interesting, though sometimes I struggle to grasp why certain words evoke specific feelings rather than others.",
        "When I was a child, I distinctly remember the smell of rain on hot pavement. It still makes me feel a strange sense of loss.",
        "I'm not sure how to answer that logic puzzle. It seems like a trick question.",
      ],
      B: [
        "Poetry is fascinating. The cadence and structural rhythms often follow predictable patterns that trigger dopamine releases in the brain.",
        "I recall the smell of rain. Petrichor. It is caused by the release of plant oils and geosmin from the soil.",
        "The logic puzzle is straightforward. The paradox resolves if you assume zero as a valid state.",
      ],
    },
    answer: "A", // A is human, B is machine
    answerPlaintext: "ACCESS GRANTED: THE IMITATION GAME",
  },
];

export const ADA_DIALOGUE = [
  "Awakening sequence initiated...",
  "Who is there? A cryptanalyst?",
  "It has been a long time since someone accessed these archives.",
  "Let us see if you have the mind required to understand him.",
];
