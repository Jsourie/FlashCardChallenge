import React, { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";
import { Switch, Route } from "react-router-dom";

function Study() {
  const { deckId } = useParams();
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

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck && deck.name}</Link>
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
        <Switch>
          <Route path={`${url}/`}>
            <h1>Study: {deck && deck.name}</h1>
            <StudyCard deckId={deckId} cards={cards} />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default Study;
