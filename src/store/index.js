import create from "zustand";
import { persist } from "zustand/middleware";

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

const useStore = create(
  persist(
    (set) => ({
      cards: [],
      flippedIDs: [],
      gameActive: false,
      gameComplete: false,
      numberOfTurns: 0,
      matchedIDs: [],
      highScore: 0,

      setNewGame: () =>
        set({
          gameActive: true,
          cards: generateCards(),
          matchedIDs: [],
          numberOfTurns: 0,
        }),
      setEndGame: () =>
        set({
          matchedIDs: [],
          numberOfTurns: 0,
          gameActive: false,
        }),
      setFlippedIDs: (flippedID) =>
        set((state) => ({ flippedIDs: [...state.flippedIDs, flippedID] })),
      clearFlippedIDs: () => set({ flippedIDs: [] }),
      increaseNumberOfTurns: () =>
        set((state) => ({ numberOfTurns: state.numberOfTurns + 1 })),
      setMatchedIDs: (firstMatchedID, secondMatchedID) =>
        set((state) => ({
          matchedIDs: [...state.matchedIDs, firstMatchedID, secondMatchedID],
        })),
      setHighScore: (numberOfTurns) => set({ highScore: numberOfTurns }),
      setGameComplete: () => set({ gameComplete: true, gameActive: false }),
    }),
    {
      name: "2ggame-storage", // unique name
    }
  )
);

export const useGameStore = useStore;
