/*import styled from "@emotion/styled";

const Number = styled.span`
  padding-left: 4px;
`;


export const NumberOfTurns = ({ numberOfTurns }) => {
  return (
    <div>
      <p>
        Number of turns:<Number>{numberOfTurns}</Number>
      </p>
    </div>
  );
};*/

import styled from "@emotion/styled";

const Label = styled.span`
  padding-left: 4px;
`;

export const NumberOfTurns = ({ numberOfTurns }) => (
  <div>
    <p>
      Wrong Guesses:<Label>{numberOfTurns}</Label>
    </p>
  </div>
);

