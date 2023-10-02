import React, { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";


function Study(){
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
                
              } catch (error) {
                console.error("Error fetching data: ", error);
              }
            }
        
            fetchDeck();
          }, [deckId]);


    return(
        <div>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${deckId}`}>{deck && deck.name}</Link> / Study
        <h1>Study: {deck && deck.name}</h1>
        <StudyCard deckId={deckId}/>
        </div>
    
    )          
}

