import React, {useState} from "react";
import {Link, Router, Route, useHistory} from "react-router-dom";
import { createDeck } from "../utils/api";


function CreateDeck ({createDeck}){
const history = useHistory();

const initialFormState = {
    name: "",
    description: ""
}

const [formData, setFormData] = useState ({...initialFormState})

const {name, description} = formData;

const handleInputChange = (event) => {
    const {name,value} = event.target;
    setFormData({
        ...formData,
        [name]: value,
    })
}

const handleSubmit = (event) => {
    event.preventDefault()
    createDeck(formData)
    .then(() => setFormData({...initialFormState}))
    .then(() => history.push("/decks/new"));

}


return (
    <div>
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

export default CreateDeck