import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useSpring, animated as a } from "react-spring";
import { useGameStore } from "../store";
import CardBackgroundImage from "../assets/bia-andrade-PO8Woh4YBD8-unsplash.jpg";

const CardContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const CardBase = css`
  position: absolute;
  max-width: 150px;
  max-height: 150px;
  width: 50ch;
  height: 50ch;
  cursor: pointer;
  will-change: transform, opacity;
`;

const CardBack = styled(a.div)`
  ${CardBase};
  background-color: ${(props) => props.backgroundColor};
  background-size: cover;
`;

const CardFront = styled(a.div)`
  ${CardBase};
  background-size: cover;
  background-image: url(${CardBackgroundImage});
`;

const Card = ({ flipped, cardDetails, onCardClick, id, flippedIDs }) => {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <CardContainer
      key={id}
      onClick={() => {
        //TODO: create disabled prop on card are move this outside
        if (flippedIDs.length === 2 || flippedIDs[0] === id) {
          return;
        } else {
          onCardClick(id);
        }
      }}
    >
      <CardBack
        key={`${id}_card-back`}
        style={{
          opacity,
          transform,
          rotateX: "180deg",
        }}
        backgroundColor={cardDetails.colour}
      />
      <CardFront
        key={`${id}_card-front`}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
        backgroundColor="blue"
      />
    </CardContainer>
  );
};

const Cards = ({ gameCards }) => {
  const increaseNumberOfTurns = useGameStore(
    (state) => state.increaseNumberOfTurns
  );
  const setFlippedIDs = useGameStore((state) => state.setFlippedIDs);
  const flippedIDs = useGameStore((state) => state.flippedIDs);
  const clearFlippedIDs = useGameStore((state) => state.clearFlippedIDs);
  const setMatchedIDs = useGameStore((state) => state.setMatchedIDs);
  const matchedIDs = useGameStore((state) => state.matchedIDs);

  const onCardClick = (id) => {
    //if less than two card have been flipped, add the card id to the flipped array for flipping (stops a third, fourth... card from flipping)
    flippedIDs.length < 2 &&
      !matchedIDs.find((matchedId) => matchedId === id) &&
      setFlippedIDs(id);

    //the next steps are for determining card match, so early return if only one card has been flipped
    if (flippedIDs.length < 1) {
      return;
    }

    //get the first and second flipped cards
    const firstCard = gameCards.find((card) => card.id === flippedIDs[0]);
    const secondCard = gameCards.find((card) => card.id === id);
    //determine if the cards match
    if (firstCard.colour === secondCard.colour) {
      setMatchedIDs(firstCard.id, secondCard.id);
      //unflip the cards
      clearFlippedIDs();
      increaseNumberOfTurns();
    } else {
      //if no match, unflip the cards
      setTimeout(() => {
        clearFlippedIDs();
        increaseNumberOfTurns();
      }, 1200);
    }
  };

  return gameCards.map((cardDetails) => {
    return (
      <Card
        flipped={
          !!flippedIDs.find(
            (flippedIndex) => flippedIndex === cardDetails.id
          ) || !!matchedIDs.find((matched) => matched === cardDetails.id)
        }
        cardDetails={cardDetails}
        onCardClick={onCardClick}
        id={cardDetails.id}
        flippedIDs={flippedIDs}
      />
    );
  });
};

export default Cards;
