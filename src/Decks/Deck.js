import React, { useEffect, useState } from "react";
import { readDeck, deleteDeck } from "../utils/api";
import CardList from "./CardList";
import { Link, useParams, useHistory, Switch, Route } from "react-router-dom";
import Study from "../Home/Study";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import { useRouteMatch } from "react-router-dom";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchDeck() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
        setCards(deckData.cards);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchDeck();
  }, [deckId]);

  const handleDeleteDeck = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this deck?");
    if (confirmed) {
      try {
        await deleteDeck(deckId);
        console.log("Deck deleted");
        history.push("/");
      } catch (error) {
        console.error("Error deleting deck: ", error);
      }
    }
  };


  return (
    <main className="card">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck && deck.name}</Link>
          </li>
        </ol>
      </nav>

      <h2>{deck && deck.name}</h2>
      <p>{deck && deck.description}</p>
      <div className="col">
      <Link className="btn btn-primary" to={`${url}/edit`}>Edit</Link>
      <Link className="btn btn-secondary" to={`${url}/study`}>Study</Link>
      <Link className="btn btn-light" to={`${url}/cards/new`}>+ Add Cards</Link>
      </div>
      <button className="btn btn-danger" onClick={handleDeleteDeck}>Delete</button>

      <h3>Cards</h3>
      {cards.map((card) => (
        <CardList key={card.id} card={card} />
      ))}
    </main>
  );
}

export default Deck;

