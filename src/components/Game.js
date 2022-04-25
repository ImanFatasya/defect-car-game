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
  const setNewGame = useGameStore((state) => state.setNewGame);
  const gameCards = useGameStore((state) => state.cards);
  const clearMatchedIDs = useGameStore((state) => state.clearMatchedIDs);
  const score = useGameStore((state) => state.score);
  const clearFlippedIDs = useGameStore((state) => state.clearFlippedIDs);

  console.warn(gameActive, "game active");
  console.warn(score);

  return (
    <>
      <button
        onClick={() => {
          // clearMatchedIDs();
          clearFlippedIDs();
          clearMatchedIDs();

          setTimeout(() => {
            setNewGame();
          }, 1000);
        }}
      >
        {gameActive ? "Restart Game" : "Start Game!"}
      </button>
      {/* <InactiveGameOverlay gameActive={gameActive} /> */}
      <ScoreCount score={score} />
      <GameLayout>
        <Cards gameCards={gameCards} />
      </GameLayout>
    </>
  );
};

export default Game;
