import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import DeckCard from "./DeckCard";
import ErrorMessage from "./ErrorMessage";
import {Link, Switch, Route} from "react-router-dom";
import Study from "./Study";
import { useRouteMatch } from "react-router-dom";


function DeckList () {
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(undefined);
    const {url} = useRouteMatch
  
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
         <Link to ={'/decks/new'}><button type="button" className="btn btn-secondary btn sm m-1">+ Create New</button></Link>
        <section className="row">{list}</section>
       
      </main>
    );
  };
  export default DeckList;