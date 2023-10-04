import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Home/DeckList";
import {Link} from "react-router-dom";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import CreateDeck from "../Home/CreateDeck";
import Deck from "../Decks/Deck"

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path = {"/decks/new"}>
        <CreateDeck />
        </Route>
        <Route path = {"/"}>
        <DeckList />
        </Route>
        <Route path = {"/decks/:deckId"}>
          <Deck />
        </Route>
        <Route>
        <NotFound />
        </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
