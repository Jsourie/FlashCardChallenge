import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api"; // Make sure you have the correct import paths

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const initialFormState = {
    front: "",
    back: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);

  const { front, back } = formData;

  useEffect(() => {
    async function fetchData() {
      try {
        const deckData = await readDeck(deckId);
        const cardData = await readCard(cardId);

        setDeck(deckData);
        setCard(cardData);

        setFormData({
          front: cardData.front,
          back: cardData.back
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
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

    const updatedCard = {
      id: card.id, // Use the card object for the ID
      front,
      back
    };

    try {
      await updateCard(updatedCard);

      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating card: ", error);
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
            <Link to={`/decks/${deckId}`}>{deck ? deck.name : ""}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            required={true}
            value={front}
            onChange={handleInputChange}
            rows={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            required={true}
            value={back}
            onChange={handleInputChange}
            rows={3}
          />
        </div>
        <Link to={`/decks/${deckId}`}>
          <button className="btn btn-secondary">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default EditCard;