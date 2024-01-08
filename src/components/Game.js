import { useEffect } from "react";
import styled from "@emotion/styled";
import "../App.css";
import { Cards } from "./Cards";
import { NumberOfTurns } from "./NumberOfTurns";
import { HighScore } from "./HighScore";
import { useGameStore } from "../store";
import { Scrim } from "./Scrim";

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

const Game = () => {
  const gameActive = useGameStore((state) => state.gameActive);
  const gameCards = useGameStore((state) => state.cards);
  const numberOfTurns = useGameStore((state) => state.numberOfTurns);
  const matchedIDs = useGameStore((state) => state.matchedIDs);
  const highScore = useGameStore((state) => state.highScore);
  const setHighScore = useGameStore((state) => state.setHighScore);
  const setEndGame = useGameStore((state) => state.setEndGame);
  const playerName = useGameStore((state) => state.playerName);

  const gameComplete = matchedIDs.length === gameCards.length && gameActive;
  const showScrim = gameComplete || !gameActive;

  return (
    <Container>
      <Header>
        <Button
          onClick={() => {
            setEndGame();
          }}
        >
          {gameComplete || !gameActive ? "Start New Game" : "End Game"}
        </Button>
        <h1>Memory Game</h1>
        <NumberOfTurns numberOfTurns={numberOfTurns} />
        <HighScore highScore={highScore} />
        <p>Player: {playerName}</p>
      </Header>
      <GameLayout>
        <Cards gameCards={gameCards} />
      </GameLayout>
      {showScrim && <Scrim gameComplete={gameComplete} />}
    </Container>
  );
};

export default Game;
