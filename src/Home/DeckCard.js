import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteDeck } from "../utils/api"; 

export const DeckCard = ({ deck }) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleDelete = () => {
    const result = window.confirm("Are you sure you want to delete this deck?");
    if (result) {
      deleteDeck(deck.id)
        .then(() => {
          history.push('/');
        })
        .catch(error => {
          console.error("Error deleting deck:", error);
        });
    }
  };

  return (
    <div className="card">
      <h2>{deck.name}</h2>
      <p>{deck.cards.length} cards</p>
      <p>{deck.description}</p>
      <div>
        <Link to={`/decks/${deck.id}/study`}>
          <button className="btn btn-primary mr-2">Study</button>
        </Link>
        <Link to={`/decks/${deck.id}`}>
          <button className="btn btn-secondary mr-2">View</button>
        </Link>
        <button className="btn btn-danger ml-4" onClick={() => handleDelete(deck.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeckCard;
