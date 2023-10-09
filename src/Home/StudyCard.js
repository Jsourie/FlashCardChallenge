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
    setFront(true); // Ensure front side is shown for the restarted deck
  };

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

      {cards.length < 3 ? (
        <div>
          <h2>Not enough cards</h2>
          <p>
            There are not enough cards in this deck to study. You can add cards
            to the deck to start studying.
          </p>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button>Add Cards</button>
          </Link>
        </div>
      ) : (
        <div>
          <div>{isFront ? cards[index].front : cards[index].back}</div>
          <button onClick={handleFlip}>Flip</button>
          {!isFront && (
            <button onClick={handleClick}>
              {index < cards.length - 1 ? "Next" : "Restart"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default StudyCard;
