import styled from "@emotion/styled";
import Cards from "./Cards";
import ScoreCount from "./ScoreCount";
import { useGameStore } from "../store";

const GameLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
`;

const Game = () => {
  return (
    <>
      <ScoreCount score={useGameStore((state) => state.score)} />
      <GameLayout>
        <Cards />
      </GameLayout>
    </>
  );
};

export default Game;
