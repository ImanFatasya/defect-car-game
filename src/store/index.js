import create from "zustand";

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

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
const cards = shuffledParis.map((colour, i) => ({
  colour: colour,
  id: colour + "-" + i,
  matched: false,
}));


const useStore = create((set) => ({
  gameActive: false,
  setGameOver: () => set({ gameActive: false }),
  setNewGame: () =>
    set({
      cards: shuffleArray(cards),
      score: 0,
      gameActive: true
    }),
  cards: cards,
  score: 0,
  increaseScore: () => set((state) => ({ score: state.score + 1 })),
}));

export const useGameStore = useStore;
