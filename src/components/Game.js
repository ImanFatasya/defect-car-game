import styled from "@emotion/styled";
import Cards from "./Cards";
import ScoreCount from "./ScoreCount";
import { useGameStore } from "../store";

const Container = styled.div`
  /* max-width: 1070px */
  margin: auto;
  height: 100%;
  max-height: 90vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px 0 24px;
  max-width: 1020px;
  margin: auto;
`;

const GameLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  max-width: 1070px;
  width: 100%;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  justify-content: center;
  padding-top: 24px;
  margin: auto;
`;

const InactiveGameOverlay = styled.div`
  height: 100vh;
  width: 100vh;
  background-color: white;
  display: ${(props) => (props.gameActive ? "none" : "block")};
`;

const Button = styled.button`
  background-color: cornflowerblue;
  border: none;
  border-radius: 10px;
  padding: 10px;
  color: white;
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
    <Container>
      <Header>
        <Button
          onClick={() => {
            clearFlippedIDs();
            clearMatchedIDs();

            setTimeout(() => {
              setNewGame();
            }, 1000);
          }}
        >
          {gameActive ? "Restart Game" : "Start Game"}
        </Button>
        <h1>Memory Game</h1>

        <ScoreCount score={score} />
      </Header>
      <GameLayout>
        <Cards gameCards={gameCards} />
      </GameLayout>
    </Container>
  );
};

export default Game;
