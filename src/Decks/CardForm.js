function CardForm({ formData, handleInputChange, handleSubmit }) {
  const { front, back } = formData || {}; // Add a default empty object to prevent destructuring errors

  return (
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
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

export default CardForm