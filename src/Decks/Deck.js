import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import CardList from "./CardList";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";



function Deck(){
const {deckId}=useParams()
const {url} = useRouteMatch()

const [deck, setDeck] = useState(null);
const [cards, setCards] = useState([]);


    useEffect(() => {
        async function fetchDeck() {
          try {
            const deckData = await readDeck(deckId); 
            setDeck(deckData);
            setCards(deckData.cards)
            setFormData({
              name: deckData.name,
              description: deckData.description
            });
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        }
    
        fetchDeck();
      }, [deckId]);

      const list = cards.map((card) => <CardList key={deck.id} card={card} />);
  

      return (
        <main className="card">
          <h2>{deck.name}</h2>
          <p>{deck.description}</p>
          <Link to= {`${url}/cards/:cardId/edit`}>
          <button>Edit</button>
          </Link >
          <Link to= {`${url}/study`}>
          <button>Study</button>
          </Link>
          <Link to= {`${url}/cards/new`}>
          <button>Add Cards</button>
          </Link>
          <section className="row">{list}</section>
        </main>
      );
}