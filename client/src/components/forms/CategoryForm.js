import React from "react";
import Button from "../Button";
import { Row, Col } from "reactstrap";

const CategoryForms = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <Row>
        <Col xs="12" md="12">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            required
          />
          <hr />
          <Button
            onClick={handleSubmit}
            variant="primary"
            className="btn"
            text="Create"
          />
        </Col>
      </Row>
    </div>
  </form>
);

export default CategoryForms;
