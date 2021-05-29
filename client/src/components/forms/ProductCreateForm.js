import React from "react";
import { Select } from "antd";
import { Row, Col } from "reactstrap";
import Button from "../Button";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
    weight,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col xs="12" md="6">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={title}
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col xs="12" md="6">
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={description}
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col xs="6" md="3">
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={price}
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col xs="6" md="3">
          <div className="form-group">
            <label>Shipping</label>
            <select
              name="shipping"
              className="form-control"
              onChange={handleChange}
            >
              <option>Please select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </Col>
        <Col xs="6" md="3">
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={quantity}
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col xs="6" md="3">
          <div className="form-group">
            <label>Weight</label>
            <input
              type="number"
              name="weight"
              className="form-control"
              value={weight}
              onChange={handleChange}
            />
          </div>
        </Col>

        <Col xs="6" md="3">
          <div className="form-group">
            <label>Color</label>
            <select
              name="color"
              className="form-control"
              onChange={handleChange}
            >
              <option>Please select</option>
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </Col>
        <Col xs="6" md="3">
          <div className="form-group">
            <label>Brand</label>
            <select
              name="brand"
              className="form-control"
              onChange={handleChange}
            >
              <option>Please select</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </Col>
        <Col xs="6" md="3">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              onChange={handleCategoryChange}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        </Col>
        <Col xs="6" md="3">
          {showSub && (
            <div>
              <label>Sub Categories</label>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                value={subs}
                onChange={(value) => setValues({ ...values, subs: value })}
              >
                {subOptions.length &&
                  subOptions.map((s) => (
                    <Option key={s._id} value={s._id}>
                      {s.name}
                    </Option>
                  ))}
              </Select>
            </div>
          )}
        </Col>
      </Row>

      <hr />
      <Button type="submit" text="submit" className="btn btn-outline-info" />
    </form>
  );
};

export default ProductCreateForm;
