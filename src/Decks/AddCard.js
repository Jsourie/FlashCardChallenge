import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck, updateDeck } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [deck, setDeck] = useState(null);

  const { front, back } = formData;

  useEffect(() => {
    async function fetchDeck() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
      } catch (error) {
        console.error("Error fetching deck data: ", error);
      }
    }

    fetchDeck();
  }, [deckId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCard = { front, back };

    try {
      const createdCard = await createCard(deckId, newCard);

      if (deck) {
        const updatedDeck = {
          ...deck,
          cards: [...deck.cards, createdCard],
        };
        await updateDeck(updatedDeck);
      }

      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error creating card: ", error);
    }
  };

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
            Add Card
          </li>
        </ol>
      </nav>
      <h1>Add Card</h1>
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
          <button>Done</button>
        </Link>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCard;
