import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserCart, saveUserAddress } from "../../functions/user";
import { toast } from "react-toastify";
import { Container, Row, Col } from "reactstrap";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import laptop from "../../images/laptop.jpg";

const Checkout = ({ history, displayRazorpay }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState({
    address: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const [addressSaved, setAddressSaved] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [wrap, setWrap] = useState(false);

  //discount price

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setWrap(res.data.wrap);
      console.log("products----", products);
    });
  }, []);

  const saveAddressToDb = () => {
    if (
      !address.address ||
      !address.phone ||
      !address.city ||
      !address.state ||
      !address.country ||
      !address.pinCode
    ) {
      toast.error("All fields must be filled");
      return;
    }

    if (address.phone.length !== 10) {
      toast.error("Phone Number must be 10 digits!");
      return;
    }

    if (address.pinCode.length !== 6) {
      toast.error("PinCode must be 6 digits!");
      return;
    }

    console.log("address", address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const couponDiscount = (total - totalAfterDiscount).toFixed(2);

  const showAddress = () => (
    <>
      <div className="add-address">
        <form>
          <Row>
            <Col xs="12" md="6">
              <div className="form-group">
                <label>Address: Street, House No / Apartment No</label>
                <input
                  type={"text"}
                  name={"address"}
                  className="form-control"
                  value={address.address}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>
            </Col>
            <Col xs="12" md="3">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name={"phone"}
                  className="form-control"
                  value={address.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </Col>
            <Col xs="12" md="3">
              <div className="form-group">
                <label>City</label>
                <input
                  type={"text"}
                  name={"city"}
                  className="form-control"
                  value={address.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </Col>
            <Col xs="12" lg="3">
              <div className="form-group">
                <label>State</label>
                <input
                  type={"text"}
                  name={"state"}
                  className="form-control"
                  value={address.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </Col>
            <Col xs="12" lg="3">
              <div className="form-group">
                <label>Country</label>
                <input
                  type={"text"}
                  name={"country"}
                  className="form-control"
                  value={address.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </Col>
            <Col xs="12" lg="3">
              <div className="form-group">
                <label>PinCode</label>
                <input
                  type="number"
                  name={"pinCode"}
                  className="form-control"
                  value={address.pinCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </Col>
          </Row>
          <div className="add-address-actions">
            <Button onClick={saveAddressToDb} text="Add Address" />
          </div>
        </form>
      </div>
    </>
  );

  return (
    <div className="contact">
      <Row>
        <Col xs="12" md="8">
          <h4>Delivery Address</h4>
          {showAddress()}
          <hr />
        </Col>
        <Col xs="12" md="4">
          <div className="cart">
            <div className="cart-body">
              <div className="cart-list">
                <Container>
                  <h4 className="h_4">Order Summary</h4>
                  <hr />
                </Container>
                {products.map((p) => (
                  <div key={p._id} className="item-box">
                    <div className="item-details">
                      <Container>
                        <Row className="mb-2 align-items-center">
                          <Col xs="12">
                            <div className="d-flex align-items-center">
                              <img
                                className="item-image"
                                src={`${
                                  p.images[0] ? p.images[0].url : laptop
                                }`}
                              />

                              <h1 className="item-name one-line-ellipsis">
                                {p.product.title} ({p.color})
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
                <div className="item-box">
                  <div className="item-details">
                    <Container>
                      {wrap && (
                        <Row>
                          <Col>
                            <p className="item-label">Gift Wrapping:</p>
                          </Col>
                          <Col>
                            <p className="item-label text-right">₹30</p>
                          </Col>
                        </Row>
                      )}
                      {totalAfterDiscount > 0 && (
                        <Row>
                          <Col>
                            <p className="item-label">Coupon Discount:</p>
                          </Col>
                          <Col>
                            <p className="item-label text-right text-success">
                              -₹{couponDiscount}
                            </p>
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col>
                          <p className="item-name one-line-ellipsis">
                            Total Payable:
                          </p>
                        </Col>
                        <Col>
                          <p className="item-name one-line-ellipsis text-right">
                            ₹
                            {totalAfterDiscount > 0
                              ? totalAfterDiscount
                              : total}
                          </p>
                        </Col>
                      </Row>
                    </Container>
                    {!addressSaved || !products.length ? (
                      <Button
                        variant="primary"
                        className="btn mt-2 w-100"
                        disabled
                        text="Add Address to Continue"
                      />
                    ) : (
                      <Button
                        variant="primary"
                        className="btn mt-2 w-100"
                        onClick={displayRazorpay}
                        target="_blank"
                        rel="noopener noreferrer"
                        text="Continue to Payment"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
