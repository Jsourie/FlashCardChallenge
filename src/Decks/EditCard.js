import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { updateCard, readDeck } from "../utils/api"; 

function EditCard() {
  const { deckId, cardId } = useParams(); 
  const history = useHistory();
  const initialFormState = {
    front: "",
    back: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [deck, setDeck] = useState(null);

  const { front, back } = formData;

  useEffect(() => {
    async function fetchDeckAndCard() {
      try {
        const deckData = await readDeck(deckId); 
        const cardData = deckData.cards.find((card) => card.id === +cardId);

        setDeck(deckData);
        setFormData({
          front: cardData.front,
          back: cardData.back
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchDeckAndCard();
  }, [deckId, cardId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard({ id: cardId, front, back }); 

    if (deck) {
        const updatedDeck = {
          ...deck,
          cards: [...deck.cards, newCard]
        };
        await updateDeck(updatedDeck);}

    history.push(`/decks/${deckId}`);
  };

  

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          required={true}
          value={front}
          onChange={handleInputChange}
          rows={3}
        />
        <br />
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          required={true}
          value={back}
          onChange={handleInputChange}
          rows={3}
        />
        <Link to={`/decks/${deckId}`}>
          <button>Cancel</button>
        </Link>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditCard;
