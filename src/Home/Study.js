import React, { useEffect, useState } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";
import { Switch } from "react-router-dom";

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
        <Switch>
        <Route path = {"/decks/:deckId/study"}>
        <nav>
                <Link to="/">Home</Link> /{" "}
                <Link to={`/decks/${deckId}`}>{deck && deck.name}</Link> / Study
              </nav>
              <h1>Study: {deck && deck.name}</h1>
              <StudyCard deckId={deckId} cards={cards} />
      </Route>
      </Switch>
    </div>
  );
}

export default Study;
