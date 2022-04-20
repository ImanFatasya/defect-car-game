import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useSpring, animated as a } from "react-spring";

const CardContainer = styled.div`
  position: relative;
  width: 175px;
  height: 175px;
`;

const CardBase = css`
  position: absolute;
  max-width: 160px;
  max-height: 160px;
  width: 50ch;
  height: 50ch;
  cursor: pointer;
  will-change: transform, opacity;
`;

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

const CardBack = styled(a.div)`
  ${CardBase};
  background-color: ${(props) => props.backgroundColor};
  background-size: cover;
`;

const CardFront = styled(a.div)`
  ${CardBase};
  background-size: cover;
  background-color: blue;
`;

// const NUMBER_OF_CARDS = 10;

const Card = ({ flipped, cardDetails, onCardClick, id }) => {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <CardContainer
      key={id}
      onClick={() => {
        onCardClick(id);
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

const Cards = () => {
  const [gameCards, setGameCards] = useState([]);
  const [firstSelection, setFirstSelection] = useState(false);
  const [secondSelection, setSecondSelection] = useState(false);
  const [flippedIDs, setflippedIDs] = useState([]);
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    const colours = [
      "#FF5733",
      "#350e9e",
      "#71f9ab",
      "#78a188",
      "#41535b",
      "#fc2ba4",
      "#89133d",
      "#e9d1bb",
      "#ed94be",
      "#e1e315",
    ];

    const pairs = colours.concat(colours);
    const shuffledParis = shuffleArray(pairs);
    const cards = shuffledParis.map((colour, i) => ({
      colour: colour,
      id: colour + "-" + i,
    }));

    setGameCards(cards);
  }, []);

  const onCardClick = (id) => {
    flippedIDs.length < 2 && setflippedIDs((flippedIDs) => [...flippedIDs, id]);
    console.log();

   
    const firstCard = gameCards.find((card) => card.id === flippedIDs[0])
    const secondCard = gameCards.find((card) => card.id === id)

    if (firstCard.colour === secondCard.colour) {
      setMatched(true)
    } else {
      console.log("no match!");
      const timer = setTimeout(() => {
        setflippedIDs([]);
      }, 2000);
    }
  };

  // if (flippedIDs[0])

  return gameCards.map((cardDetails) => {
    return (
      <Card
        flipped={
          !!flippedIDs.find((flippedIndex) => flippedIndex === cardDetails.id)
        }
        cardDetails={cardDetails}
        onCardClick={onCardClick}
        id={cardDetails.id}
      />
    );
  });
};

export default Cards;
