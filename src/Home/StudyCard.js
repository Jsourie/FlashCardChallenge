
import React, { useState } from "react";




function SutdyCard(){
const[index, setIndex] = useState(0)
conse [isCards, setCards] = useState(true)


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

      const handleClick = () => {
      if (index < cards.length -1) {
        setIndex(index + 1)
      }

      }


      const handleFlip = () =>{
      setCards(isCard)

      }

      }



return(
<div>


</div>

)


}





//use the turnary to go to add the buttons 
//On click of flip button cards displays front if clicked gain it then displays the back
//Next buttong displays the next card in the deck