import styled from "@emotion/styled";
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

export const Scrim = ({ gameComplete }) => {
  const setNewGame = useGameStore((state) => state.setNewGame);

  return (
    <StyledScrim
      onClick={() => {
        // setEndGame();
        setNewGame();
      }}
      className="gameCompleteAnimation"
    >
      {gameComplete ? <h1>You Win!</h1> : <h1>Click anywhere to start</h1>}
      {gameComplete ? <ReactConfetti /> : <></>}
    </StyledScrim>
  );
};
