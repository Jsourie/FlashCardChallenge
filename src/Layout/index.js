import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Home/DeckList";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <DeckList />
        <NotFound />
      </div>
    </>
  );
}

export default Layout;
