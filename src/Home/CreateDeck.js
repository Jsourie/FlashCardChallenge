import React, {useState} from "react";
import {Link, Router, Route} from "react-router-dom";


function CreateDeck ({newDeck}){
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
    newDeck({name,description})

    setFormData({...initialFormState })
}


return (
    <div>
        <Route path="/decks/new" component={CreateDeck}>
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
      </Route>
    </div>
  );
}

export default CreateDeck