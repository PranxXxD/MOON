import React from "react";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";
import { Container, Row, Col } from "reactstrap";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";

const Summary = ({ p }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="cart">
      <div className="cart-body">
        <div className="cart-list">
          {p.map((p) => (
            <div key={p._id} className="item-box">
              <div className="item-details">
                <Container>
                  <Row className="mb-2 align-items-center">
                    <Col xs="9">
                      <div className="d-flex align-items-center">
                        <img
                          className="item-image"
                          src={`${p.product.images[0] ? p.product.images[0].url : laptop}`}
                        />

                        <Link
                          to={`/product/${p.slug}`}
                          className="item-link one-line-ellipsis"
                          // onClick={handleProductClick}
                        ></Link>
                        <h1 className="item-name one-line-ellipsis">
                          {p.product.title}
                        </h1>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mb-2 align-items-center">
                    <Col xs="9">
                      <p className="item-label">price</p>
                    </Col>
                    <Col xs="3" className="text-right">
                      <p className="price item-value">{` ₹${p.product.price}`}</p>
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
      </div>
    </div>
  );
};

export default Summary;
