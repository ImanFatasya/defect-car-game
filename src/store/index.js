import create from "zustand";


const useStore = create((set) => ({
  score: 0,
  increaseScore: () => set((state) => ({ score: state.score + 1 })),
  resetScore: () => set({ score: 0 }),
}));


export const useGameStore = useStore;
