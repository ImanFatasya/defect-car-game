/*import styled from "@emotion/styled";
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
      />
    </CardContainer>
  );
};

export const Cards = ({ gameCards }) => {
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
};*/

import styled from "@emotion/styled";
import { useState } from "react";
import { useGameStore } from "../store";
import { motion } from "framer-motion";

const CardContainer = styled.div`
  width: 100%;
  max-width: 160px;
  height: 160px;
  position: relative;
  cursor: pointer;
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

const BangLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: red;
  color: white;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 6px;
  animation: pop 0.6s ease-in-out;
  @keyframes pop {
    0% { transform: scale(1); opacity: 0; }
    50% { transform: scale(1.3); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
`;

const Card = ({ cardDetails, onClick, showBang }) => (
  <CardContainer onClick={onClick}>
    <CardImage
      src={cardDetails.src}
      alt="car"
      highlight={cardDetails.defective}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    />
    {showBang && <BangLabel>BANG! WRONG</BangLabel>}
  </CardContainer>
);

export const Cards = ({ gameCards }) => {
  const increaseNumberOfTurns = useGameStore((s) => s.increaseNumberOfTurns);
  const setDefectFound = useGameStore((s) => s.setDefectFound);
  const defectFound = useGameStore((s) => s.defectFound);

  const [bangID, setBangID] = useState(null);

  const onCardClick = (card) => {
    if (defectFound) return;
    if (card.defective) {
      setDefectFound();
    } else {
      setBangID(card.id);
      increaseNumberOfTurns();
      setTimeout(() => setBangID(null), 600);
    }
  };

  return gameCards.map((card) => (
    <Card
      key={card.id}
      cardDetails={card}
      onClick={() => onCardClick(card)}
      showBang={bangID === card.id}
    />
  ));
};