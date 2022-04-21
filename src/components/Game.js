import styled from "@emotion/styled";
import Cards from "./Cards";
import ScoreCount from "./ScoreCount";
import create from "zustand";

const GameLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
`;

const Game = () => {
  const useStore = create((set) => ({
    score: 0,
    increaseScore: () => set((state) => ({ score: state.score + 1 })),
    resetScore: () => set({ score: 0 }),
  }));

  return (
    <GameLayout>
      <ScoreCount score={useStore(state => state.score)}  />
      <Cards />
    </GameLayout>
  );
};

export default Game;
