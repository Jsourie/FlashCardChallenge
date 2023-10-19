import React from "react";
import {Link, useHistory, useRouteMatch, useParams} from "react-router-dom";
import { deleteCard} from "../utils/api";



export const CardList = ({card}) => {
const history= useHistory()
const {url} = useRouteMatch()
const { deckId,cardId } = useParams();


const handleDelete = () => {
  const result = window.confirm("Are you sure you want to delete this card?");
  if (result) {
    
    deleteCard(card.id)
      .then(() => {
        
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.error("Error deleting card: ", error);
      });
  }
};


  
return (
  <div className="card">
    <p>{card.front}</p>
    <p>{card.back}</p>
    <div>
    <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
      <button className="btn btn-secondary"> Edit </button>
      
    </Link>
    
      <button className="btn btn-danger" onClick={handleDelete}> Delete</button>
      </div>
  </div>
)
}

export default CardList