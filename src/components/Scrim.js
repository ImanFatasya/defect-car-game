/*import styled from "@emotion/styled";
import { useState } from "react";
import { ReactConfetti } from "../components/Confetti";
import { useGameStore } from "../store";

const GameEndCTA = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameEndButton = styled.div`
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

const StyledScrim = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #c9cbca9e;
  justify-content: center;
  align-items: center;
`;

const NameInput = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 30px;
  padding-bottom: 24px;
`;

const Input = styled.input`
  padding: 10px;
`;

export const Scrim = ({ gameComplete }) => {
  const setNewGame = useGameStore((state) => state.setNewGame);
  const setPlayerName = useGameStore((state) => state.setPlayerName);
  const [value, setValue] = useState("");

  const numberOfTurns = useGameStore((state) => state.numberOfTurns);
  const highScore = useGameStore((state) => state.highScore);
  const setHighScore = useGameStore((state) => state.setHighScore);

  return (
    <StyledScrim className="gameCompleteAnimation">
      {gameComplete ? (
        <GameEndCTA>
          <h1>Nice work!</h1>
          <GameEndButton
            onClick={() => {
              if (highScore) {
                setHighScore(numberOfTurns);
              }

              if (gameComplete) {
                if (numberOfTurns < highScore || highScore === 0) {
                  setHighScore(numberOfTurns);
                }
              }
              setNewGame();
            }}
          >
            Play again
          </GameEndButton>
        </GameEndCTA>
      ) : (
        <form
          onSubmit={() => {
            setPlayerName(value);
            setNewGame();
          }}
        >
          <NameInput>
            <Label htmlFor="playername">Enter your name</Label>
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></Input>
          </NameInput>
        </form>
      )}
      {gameComplete ? <ReactConfetti /> : <></>}
    </StyledScrim>
  );
};*/

import styled from "@emotion/styled";
import { useState } from "react";
import { ReactConfetti } from "./Confetti";
import { useGameStore } from "../store";

const StyledScrim = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(201,203,202,0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  text-align: center;
`;

const GameEndCTA = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const GameEndButton = styled.button`
  background-color: #32cd32;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  &:hover { background-color: #228b22; }
`;

const Congrats = styled.h1`
  font-size: 2.5rem;
  color: #1f1f1f;
  margin: 0;
`;

const NameInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 24px;
  padding-bottom: 16px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const Scrim = ({ gameComplete }) => {
  const setNewGame = useGameStore((s) => s.setNewGame);
  const setPlayerName = useGameStore((s) => s.setPlayerName);
  const [value, setValue] = useState("");
  const numberOfTurns = useGameStore((s) => s.numberOfTurns);

  return (
    <StyledScrim>
      {gameComplete ? (
        <GameEndCTA>
          <Congrats>🎉 Nice work!</Congrats>
          <p>You made {numberOfTurns} wrong guess{numberOfTurns !== 1 && "es"}.</p>
          <GameEndButton onClick={setNewGame}>Play Again</GameEndButton>
        </GameEndCTA>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault();
          setPlayerName(value);
          setNewGame();
        }}>
          <NameInput>
            <Label htmlFor="playername">Enter your name:</Label>
            <Input
              type="text"
              id="playername"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </NameInput>
        </form>
      )}
      {gameComplete && <ReactConfetti />}
    </StyledScrim>
  );
};
