import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { readCard } from "../utils/api"; 

function StudyCard({ deckId }) {
  const [index, setIndex] = useState(0);
  const [isFront, setFront] = useState(true);
  const history = useHistory();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCard() {
      try {
        const cardData = await readCard(deckId, cards[index]?.id); 
        setCards(cardData); 
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchCard();
  }, [deckId, index]);

  const handleFlip = () => {
    setFront(!isFront);
  };

  const handleClick = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setFront(true);
    } else {
      restartPrompt();
    }
  };

  const restartPrompt = () => {
    const confirmed = window.confirm("Would you like to restart?");
    if (confirmed) {
      setIndex(0);
      setFront(true);
    } else {
      history.push("/");
    }
  };

  return (
    <div>
      <div>{isFront ? cards.front : cards.back}</div>
      <button onClick={handleFlip}>Flip</button>
      {!isFront && <button onClick={handleClick}>Next</button>} 
    </div>
  );
}

export default StudyCard;


