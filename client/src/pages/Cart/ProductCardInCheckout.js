import React, { useState } from "react";
import laptop from "../../images/laptop.jpg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Select from "@material-ui/core/Select";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const ProductCardInCheckout = ({ p, setTotalAfterDiscount }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));

      //dispatch
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    setTotalAfterDiscount(0);
    if (count > p.quantity) {
      toast.error(`Maximum Available quantity : ${p.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      //dispatch
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));

      //dispatch
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <div className="item-box">
      <div className="item-details">
        <Container>
          <Row className="mb-1 align-items-center">
            <Col xs="12" md="9">
              <div className="d-flex align-items-center">
                <Link
                  to={`/product/${p.slug}`}
                  className="item-link one-line-ellipsis"
                >
                  <img
                    className="item-image"
                    src={`${p.images[0] ? p.images[0].url : laptop}`}
                  />
                </Link>

                <Link
                  to={`/product/${p.slug}`}
                  className="item-link one-line-ellipsis"
                >
                  <h1 className="item-name one-line-ellipsis">{p.title}</h1>
                </Link>
              </div>
            </Col>
            <Col xs="4" md="3" className="text-right">
              <p className="item-name one-line-ellipsis">
                ₹{p.price * p.count}
              </p>
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col xs="9"></Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col xs="3" md="2">
              <p className="item-label">qty:</p>
              <Select native value={p.count} onChange={handleQuantityChange}>
                <option aria-label="None" value="" />
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </Select>
            </Col>
            <Col xs="5" md="3" className="text-left">
              <p className="item-label">Color:</p>
              <Select native value={p.color} onChange={handleColorChange}>
                {p.color ? (
                  <option value={p.color}>{p.color}</option>
                ) : (
                  <option>Select</option>
                )}
                {colors
                  .filter((c) => c !== p.color)
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </Select>
            </Col>
            <Col xs="3" md="2">
              <DeleteForeverIcon
                fontSize="large"
                className="text-danger pointer"
                onClick={() => handleRemove(p._id)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ProductCardInCheckout;
