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

const InactiveGameOverlay = styled.div`
  height: 100vh;
  width: 100vh;
  background-color: white;
  display: ${(props) => (props.gameActive ? "none" : "block")};
`;

const Game = () => {
  const gameActive = useGameStore((state) => state.gameActive);
  const startNewGame = useGameStore((state) => state.setNewGame)

  return (
    <>
      <button onClick={startNewGame}>{gameActive ? "Restart Game" : "Start Game!"}</button>
      <InactiveGameOverlay gameActive={gameActive} />
      <ScoreCount score={useGameStore((state) => state.score)} />
      <GameLayout>
        <Cards gameCards={useGameStore((state) => state.cards)} />
      </GameLayout>
    </>
  );
};

export default Game;
