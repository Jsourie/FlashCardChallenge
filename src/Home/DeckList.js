import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import DeckCard from "./DeckCard";
import ErrorMessage from "./ErrorMessage";
import {Link} from "react-router-dom";


function DeckList () {
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(undefined);
  
    useEffect(() => {
      const abortController = new AbortController();
  
      listDecks(abortController.signal).then(setDecks).catch(setError);
  
      return () => abortController.abort();
    }, []);

    if (error) {
        return <ErrorMessage error={error} />;
      }

  
    const list = decks.map((deck) => <DeckCard key={deck.id} deck={deck} />);
  
    return (
      <main className="card">
        <Link to ='/decks/new'><button>Create New</button></Link>	
        <section className="row">{list}</section>
      </main>
    );
  };
  
  export default DeckList;