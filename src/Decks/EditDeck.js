import React from "react"
import { Link } from "react-router-dom"
import { updateDeck,readDeck } from "../utils/api"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"



function EditDeck(){

  const {deckId} =useParams()
  const initialFormState = {
    name: "",
    description: ""
}

const [formData, setFormData] = useState ({...initialFormState})

const {name, description} = formData;

useEffect(() => {
    async function fetchDeck() {
      try {
        const deckData = await readDeck(deckId); // Use readDeck to fetch deck data
        setDeck(deckData);
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

const handleInputChange = (event) => {
    const {name,value} = event.target;
    setFormData({
        ...formData,
        [name]: value,
    })
}

const handleSubmit = (event) => {
    event.preventDefault()
    updateDeck({ id: deck.id, name, description })

    setFormData({...initialFormState })
}

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
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={name}
          />
        </label>
        <br />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          required={true}
          value={description}
          onChange={handleInputChange}
          rows={3}
          placeholder="Description"
        />
        <Link to="/">
          <button>Cancel</button>
        </Link>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default EditCard
  