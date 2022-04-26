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
    "#e1e315",
  ];

  const pairs = colours.concat(colours);
  const shuffledParis = shuffleArray(pairs);
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
      score: 0,
      cards: generateCards(),
      gameActive: true,
    }),
  cards: generateCards(),
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
  clearMatchedIDs: () => set({ matchedIDs: [] }),
}));

export const useGameStore = useStore;
