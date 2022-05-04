import styled from "@emotion/styled";
import { useState } from "react";
import { ReactConfetti } from "../components/Confetti";
import { useGameStore } from "../store";

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

const Label = styled.label`
  font-size: 30px;
  padding-bottom: 24px;
`;

const Input = styled.input`
  padding: 10px;
`;

export const Scrim = ({ gameComplete }) => {
  const setNewGame = useGameStore((state) => state.setNewGame);
  const setEndGame = useGameStore((state) => state.setEndGame);
  const setPlayerName = useGameStore((state) => state.setPlayerName);
  const [value, setValue] = useState("");

  return (
    <StyledScrim
      //   onClick={() => {
      //     gameComplete && setEndGame();
      //     // setNewGame();
      //   }}
      className="gameCompleteAnimation"
    >
      {gameComplete ? (
        <span>You Win!</span>
      ) : (
        <form
          onSubmit={() => {
            setPlayerName(value);
            setNewGame();
          }}
        >
          <div>
            <Label htmlFor="playername">Enter your name</Label>
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></Input>
          </div>
        </form>
      )}
      {gameComplete ? <ReactConfetti /> : <></>}
    </StyledScrim>
  );
};
