import { useEffect } from "react";

const ScoreCount = ({score}) => {


  return (
    <div>
      <p>
        Score:<span>{score ? score : 0}</span>
      </p>
    </div>
  );
};

export default ScoreCount;
