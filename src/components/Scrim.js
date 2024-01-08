import styled from "@emotion/styled";
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
};
