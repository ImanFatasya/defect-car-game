import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useSpring, animated as a } from "react-spring";
import { useGameStore } from "../store";
import CardBackgroundImage from "../assets/bia-andrade-PO8Woh4YBD8-unsplash.jpg"

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
        //create disabled prop on card are move this outside
        if (flippedIDs.length === 2 || flippedIDs[0] === id) {
          return;
        } else {
          onCardClick(id);
        }
      }}
    >
      <CardBack
        style={{
          opacity,
          transform,
          rotateX: "180deg",
        }}
        backgroundColor={cardDetails.colour}
      />
      <CardFront
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
        backgroundColor="blue"
      />
    </CardContainer>
  );
};

const Cards = ({ gameCards }) => {
  const increaseScore = useGameStore((state) => state.increaseScore);
  const setFlippedIDs = useGameStore((state) => state.setFlippedIDs);
  const flippedIDs = useGameStore((state) => state.flippedIDs);
  const clearFlippedIDs = useGameStore((state) => state.clearFlippedIDs);
  const setMatchedIDs = useGameStore((state) => state.setMatchedIDs);
  const matchedIDs = useGameStore((state) => state.matchedIDs);

  console.warn(gameCards, "cards");

  const onCardClick = (id) => {
    flippedIDs.length < 2 &&
      !matchedIDs.find((matchedId) => matchedId === id) &&
      setFlippedIDs(id);

    const firstCard = gameCards.find((card) => card.id === flippedIDs[0]);
    const secondCard = gameCards.find((card) => card.id === id);

    if (firstCard.colour === secondCard.colour) {
      increaseScore();
      setMatchedIDs(firstCard.id, secondCard.id);
      clearFlippedIDs();
    } else {
      setTimeout(() => {
        clearFlippedIDs();
      }, 1800);
    }
  };

  // if (flippedIDs[0])

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
