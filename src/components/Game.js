/*import styled from "@emotion/styled";
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

export default Game; */

/*
import styled from "@emotion/styled";
import "../App.css";
import { Cards } from "./Cards";
import { NumberOfTurns } from "./NumberOfTurns";
//import { HighScore } from "./HighScore";
import { useGameStore } from "../store";
import { Scrim } from "./Scrim";
import { motion } from "framer-motion";

const Container = styled.div`
  margin: auto;
  height: 100%;
  max-height: 90vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  max-width: 1020px;
  margin: auto;
  background: #f0f0f0;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const GameLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1070px;
  justify-content: center;
  margin: auto;
  padding-top: 24px;
`;

const Button = styled.button`
  background-color: cornflowerblue;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #2559b7;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2rem;
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;



const Game = () => {
  const gameActive = useGameStore((state) => state.gameActive);
  const gameCards = useGameStore((state) => state.cards);
  const numberOfTurns = useGameStore((state) => state.numberOfTurns);
  //const highScore = useGameStore((state) => state.highScore);
  const playerName = useGameStore((state) => state.playerName);
  const setEndGame = useGameStore((state) => state.setEndGame);
  const defectFound = useGameStore((state) => state.defectFound);

  const gameComplete = defectFound && gameActive;
  const showScrim = gameComplete || !gameActive;

  return (
    <Container>
      <Header>
        <Button onClick={setEndGame}>
          {gameComplete || !gameActive ? "Start New Game" : "End Game"}
        </Button>
        <Title
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🚗 Find the Defective Car
        </Title>
        <NumberOfTurns numberOfTurns={numberOfTurns} />
        
        <p>Player: {playerName}</p>
      </Header>
      <GameLayout>
        <Cards gameCards={gameCards} />
      </GameLayout>
      {showScrim && <Scrim gameComplete={gameComplete} />}
    </Container>
  );
};

export default Game;*/

import styled from "@emotion/styled";
import { Cards } from "./Cards";
import { NumberOfTurns } from "./NumberOfTurns";
import { useGameStore } from "../store";
import { Scrim } from "./Scrim";
import { motion } from "framer-motion";

const Container = styled.div`
  margin: auto;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  max-width: 1020px;
  margin: auto;
  background: #ffffffaa;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const GameLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
`;

const Button = styled.button`
  background-color: cornflowerblue;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #2559b7;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2rem;
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Game = () => {
  const gameActive = useGameStore((s) => s.gameActive);
  const gameCards = useGameStore((s) => s.cards);
  const numberOfTurns = useGameStore((s) => s.numberOfTurns);
  const playerName = useGameStore((s) => s.playerName);
  const setEndGame = useGameStore((s) => s.setEndGame);
  const defectFound = useGameStore((s) => s.defectFound);

  const gameComplete = defectFound && gameActive;
  const showScrim = gameComplete || !gameActive;

  return (
    <Container>
      <Header>
        <Button onClick={setEndGame}>
          {gameComplete || !gameActive ? "Start New Game" : "End Game"}
        </Button>
        <Title initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          🚗 Find the Defective Car
        </Title>
        <NumberOfTurns numberOfTurns={numberOfTurns} />
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