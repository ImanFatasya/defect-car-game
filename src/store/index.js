/*import create from "zustand";
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
          highScore: 0,
          flippedIDs: [],
          playerName: "",
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
      setGameComplete: () =>
        set((state) => ({
          gameComplete: true,
          gameActive: false,
        })),
      playerName: "",
      setPlayerName: (name) => set({ playerName: name }),
    }),
    {
      name: "game-storage20", // unique name
    }
  )
);

export const useGameStore = useStore;*/

// === store/index.js ===
import create from "zustand";
import { persist } from "zustand/middleware";

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function generateCarImages() {
  const normalCars = [
    { src: "https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_1280.jpg", defective: false },
    { src: "https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg", defective: false },
    { src: "https://cdn.pixabay.com/photo/2016/09/11/16/47/car-1661767_1280.jpg", defective: false },
    { src: "https://cdn.pixabay.com/photo/2017/12/07/08/34/traffic-3003409_1280.png", defective: false },
    { src: "https://cdn.pixabay.com/photo/2016/11/29/10/01/vw-bulli-1868890_1280.jpg", defective: false },
    { src: "https://cdn.pixabay.com/photo/2015/06/03/13/38/plymouth-796441_1280.jpg", defective: false },
    { src: "https://cdn.pixabay.com/photo/2016/11/22/23/55/car-1851299_1280.jpg", defective: false },
    { src: "https://cdn.pixabay.com/photo/2016/12/03/11/47/car-1879630_1280.jpg", defective: false },
    { src: "https://cdn.pixabay.com/photo/2017/07/01/08/46/clio-2460877_1280.jpg", defective: false }
  ];
  const defectCar = [
    { src: "https://cash-4-cars.com.au/wp-content/uploads/2023/02/Get-Top-Cash-for-Your-Honda-at-Honda-Wreckers-Adelaide.png", defective: true }
  ];

  return shuffleArray([...normalCars, ...defectCar]).map((img, i) => ({
    ...img,
    id: i
  }));
}


const useStore = create(
  persist(
    (set) => ({
      cards: [],
      gameActive: false,
      defectFound: false,
      numberOfTurns: 0,
      playerName: "",
      setNewGame: () =>
        set({
          gameActive: true,
          cards: generateCarImages(),
          numberOfTurns: 0,
          defectFound: false,
        }),
      setEndGame: () =>
        set({
          gameActive: false,
          defectFound: false,
          numberOfTurns: 0,
          playerName: ""
        }),
      setDefectFound: () => set({ defectFound: true }),
      increaseNumberOfTurns: () =>
        set((state) => ({ numberOfTurns: state.numberOfTurns + 1 })),
      setPlayerName: (name) => set({ playerName: name }),
    }),
    { name: "defect-finder-game" }
  )
);

export const useGameStore = useStore;