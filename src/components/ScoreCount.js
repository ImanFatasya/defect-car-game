import styled from "@emotion/styled";

const Number = styled.span`
  padding-left: 4px;
`;

const ScoreCount = ({ score }) => {
  return (
    <div>
      <p>
        Score:<Number>{score}</Number>
      </p>
    </div>
  );
};

export default ScoreCount;
