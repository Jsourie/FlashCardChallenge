import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { readCard } from "../utils/api";

function StudyCard({ deckId, cards }) {
  const [index, setIndex] = useState(0);
  const [isFront, setFront] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setFront(true); 
  }, [index]);

  const handleFlip = () => {
    setFront(!isFront);
  };
  
  const handleClick = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
    } else {
      restartPrompt();
    }
    setFront(true);
  };

  const restartPrompt = () => {
    const confirmed = window.confirm("Would you like to restart?");
    if (confirmed) {
      setIndex(0);
    } else {
      history.push("/");
    }
    setFront(true); 
  };

  const cardCountText = `Card ${index + 1} of ${cards.length}`

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>   
        <div>
          <p>{cardCountText}</p>
          <div>{isFront ? cards[index].front : cards[index].back}</div>
          <button onClick={handleFlip}>flip</button>
          {!isFront && (
            <button onClick={handleClick}>
              {index < cards.length - 1 ? "next" : "restart"}
            </button>
          )}
        </div>
    </div>
  );
}

export default StudyCard;