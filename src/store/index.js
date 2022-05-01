import create from "zustand";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value)) 

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
      numberOfTurns: 0,
      gameActive: false,
    }),
  cards: [],
  flippedIDs: [],
  setFlippedIDs: (flippedID) =>
    set((state) => ({ flippedIDs: [...state.flippedIDs, flippedID] })),
  clearFlippedIDs: () => set({ flippedIDs: [] }),
  numberOfTurns: 0,
  increaseNumberOfTurns: () => set((state) => ({ numberOfTurns: state.numberOfTurns + 1 })),
  matchedIDs: [],
  setMatchedIDs: (firstMatchedID, secondMatchedID) =>
    set((state) => ({
      matchedIDs: [...state.matchedIDs, firstMatchedID, secondMatchedID],
    })),
  highScore: getLocalStorage('highScore') ||  0,
  setHighScore: (highScore) => set(() => {setLocalStorage('highScore', highScore)}) 
}));


export const useGameStore = useStore;