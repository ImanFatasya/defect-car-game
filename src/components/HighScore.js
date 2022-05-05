import styled from "@emotion/styled";

const Number = styled.span`
  padding-left: 4px;
`;


export const HighScore = ({ highScore }) => {
  return (
    <div>
      <p>
       High Score:<Number>{highScore}</Number>
      </p>
    </div>
  );
};
