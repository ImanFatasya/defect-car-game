import { useEffect } from "react";

const ScoreCount = ({score}) => {

console.warn(score, "score")
  return (
    <div>
      <p>
        Score:<span>{score}</span>
      </p>
    </div>
  );
};

export default ScoreCount;
