import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import CardList from "./CardList";
import { Link, useParams, useHistory, Switch, Route } from "react-router-dom";
import Study from "../Home/Study";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();

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

  const handleDeleteDeck = () => {
    const confirmed = window.confirm("Are you sure you want to delete this deck?");
    if (confirmed) {
      
      history.push("/");
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

      
      <Link to={`${deckId}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to={`${deckId}/study`}>
        <button>Study</button>
      </Link>
      <Link to={`${deckId}/cards/new`}>
        <button>Add Cards</button>
      </Link>
      <button onClick={handleDeleteDeck}>Delete</button>

      
      <h3>Cards</h3>
      {cards.map((card) => (
        <CardList key={card.id} card={card} />
      ))}

      <Switch>
        <Route path={`${deckId}/study`}>
          <Study />
        </Route>
        <Route path={`${deckId}/cards/new`}>
          <AddCard />
        </Route>
        <Route path={`${deckId}/cards/:cardId/edit`}>
          <EditCard />
        </Route>
      </Switch>
    </main>
  );
}

export default Deck;
