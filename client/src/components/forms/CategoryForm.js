import React from "react";
import Button from "../Button";

const CategoryForms = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />
      <br />
      <Button
        onClick={handleSubmit}
        variant="primary"
        className="btn"
        text="Save"
      />
    </div>
  </form>
);

export default CategoryForms;
