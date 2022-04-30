import styled from "@emotion/styled";
import Cards from "./Cards";
import NumberOfTurns from "./NumberOfTurns";
import { useGameStore } from "../store";
import "../App.css";
import { ReactConfetti } from "../components/Confetti";

const Container = styled.div`
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

const Button = styled.button`
  background-color: cornflowerblue;
  border: none;
  border-radius: 10px;
  padding: 10px;
  color: white;
  z-index: 1;
  cursor: pointer;

  &:hover {
    background-color: #2559b7;
  }
`;

const Scrim = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #c9cbca9e;
  justify-content: center;
  align-items: center;
`;

const Game = () => {
  const gameActive = useGameStore((state) => state.gameActive);
  const gameCards = useGameStore((state) => state.cards);
  const numberOfTurns = useGameStore((state) => state.numberOfTurns);
  const matchedIDs = useGameStore((state) => state.matchedIDs);

  const setNewGame = useGameStore((state) => state.setNewGame);
  const setEndGame = useGameStore((state) => state.setEndGame);

  const gameOver = matchedIDs.length === gameCards.length;
  const showScrim = gameOver || !gameActive;

  return (
    <Container>
      <Header>
        <Button
          onClick={() => {
            gameActive ? setEndGame() : setNewGame();
          }}
        >
          {gameActive && !gameOver ? "End Game" : "Start Game"}
        </Button>
        <h1>Memory Game</h1>
        <NumberOfTurns numberOfTurns={numberOfTurns} />
      </Header>

      <GameLayout>
        <Cards gameCards={gameCards} />
      </GameLayout>
      {showScrim && (
        <Scrim
          onClick={() => {
            setNewGame();
          }}
          className="gameOverAnimation"
        >
          <span>{gameOver ? "You Win!" : "Click anywhere to start"}</span>
          {gameOver ? <ReactConfetti /> : null}
        </Scrim>
      )}
    </Container>
  );
};

export default Game;
