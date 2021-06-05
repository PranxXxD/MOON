import React from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";
import { Container, Row, Col } from "reactstrap";
import Button from "../Button";

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  return (
    <Drawer
      width={window.innerWidth > 900 ? 500 : window.innerWidth - 60}
      title={`Cart / ${cart.length} Product`}
      placement="right"
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      <div className="cart">
        <div className="cart-body">
          <div className="cart-list">
            {cart.map((p) => (
              <div key={p._id} className="item-box">
                <div className="item-details">
                  <Container>
                    <Row className="mb-2 align-items-center">
                      <Col xs="9">
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
                            <h1 className="item-name one-line-ellipsis">
                              {p.title}
                            </h1>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mb-2 align-items-center">
                      <Col xs="9">
                        <p className="item-label">price</p>
                      </Col>
                      <Col xs="3" className="text-right">
                        <p className="price item-value">{` ₹${p.price}`}</p>
                      </Col>
                    </Row>
                    <Row className="mb-2 align-items-center">
                      <Col xs="9">
                        <p className="item-label">quantity</p>
                      </Col>
                      <Col xs="3" className="text-right">
                        <p className="item-quantity item-value">{` ${p.count}`}</p>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            ))}
          </div>
          <div className="">
            <Link to="/cart">
              <div className="checkout-actions">
                <Button
                  variant="primary"
                  text="Go to Cart"
                  onClick={() =>
                    dispatch({
                      type: "SET_VISIBLE",
                      payload: false,
                    })
                  }
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
