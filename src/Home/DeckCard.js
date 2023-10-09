import React from "react";
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import { deleteDeck } from "../utils/api";



export const DeckCard = ({deck}) => {
const history= useHistory()
const {url} = useRouteMatch()


const handleDelete = async (id) => {
    const result = window.confirm("Are you sure you want to delete this deck?");
    if (result) {
      await deleteDeck(deck.id);
      history.push('/')
    }
  };

  
  return (
    <div className="card">
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <Link to={`{/decks/:deckId/study}`}>
        <button>Study</button>
      </Link>
      <Link to={"/decks/:deckId"}>
        <button>View</button>
      </Link>
      <button className="btn btn-danger" onClick={() => handleDelete(deck.id)}>
        Delete
      </button>
    </div>
  );
};

export default DeckCard