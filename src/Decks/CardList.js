import React from "react";
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import { deleteCard} from "../utils/api";



export const CardList = ({card}) => {
const history= useHistory()
const {url} = useRouteMatch()


const handleDelete = async (id) => {
    const result = window.confirm("Are you sure you want to delete this card?");
    if (result) {
      await deleteCard(id);
      history.push('/')
    }
  };

  
return (
  <div className="card">
    <p>{card.front}</p>
    <p>{card.back}</p>
    <Link to = {`${url}/cards/:cardId/edit`}>
      <button> Edit </button>
    </Link>
      <button className="btn btn-danger" onClick={handleDelete}> Delete</button>
  </div>
)
}

export default CardList