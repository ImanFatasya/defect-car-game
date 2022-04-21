import { useEffect } from "react";

const ScoreCount = ({score}) => {

  return (
    <div>
      <p>
        Score:<span>{score}</span>
      </p>
    </div>
  );
};

export default ScoreCount;
