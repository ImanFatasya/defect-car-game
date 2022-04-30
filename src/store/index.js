import create from "zustand";

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function generateCards() {
  const colours = [
    "#FF5733",
    "#350e9e",
    "#71f9ab",
    "#78a188",
    "#41535b",
    "#fc2ba4",
    "#89133d",
    "#e9d1bb",
    "#ed94be",
  ];

  const pairs = colours.concat(colours);
  const shuffledParis = shuffleArray(pairs);
  console.log("shuffling in Zustand");

  return shuffledParis.map((colour, i) => ({
    colour: colour,
    id: colour + "-" + i,
    flipped: false,
  }));
}

const useStore = create((set) => ({
  gameActive: false,
  setNewGame: () => 
  set({
    gameActive: true,
    cards: generateCards()
  }),
  setEndGame: () =>
    set({
      matchedIDs: [],
      score: 0,
      gameActive: false,
    }),
  cards: [],
  flippedIDs: [],
  setFlippedIDs: (flippedID) =>
    set((state) => ({ flippedIDs: [...state.flippedIDs, flippedID] })),
  clearFlippedIDs: () => set({ flippedIDs: [] }),
  score: 0,
  increaseScore: () => set((state) => ({ score: state.score + 1 })),
  matchedIDs: [],
  setMatchedIDs: (firstMatchedID, secondMatchedID) =>
    set((state) => ({
      matchedIDs: [...state.matchedIDs, firstMatchedID, secondMatchedID],
    })),
}));

export const useGameStore = useStore;