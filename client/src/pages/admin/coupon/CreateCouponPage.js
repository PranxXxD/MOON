import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import Button from "../../../components/Button";
import { Row, Col } from "reactstrap";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons(); // load all coupons
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => console.log("create coupon err", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="contact">
      {loading ? <h2 className="text-danger">Loading...</h2> : <h2>Coupon</h2>}
      <hr />
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs="12" md="6">
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>
          </Col>
        </Row>
        <hr />
        <Button
          onClick={handleSubmit}
          variant="primary"
          className="btn"
          text="Save"
        />
      </form>

      <br />

      <h4>{coupons.length} Coupons</h4>

      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Expiry</th>
            <th scope="col">Discount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{new Date(c.expiry).toLocaleDateString()}</td>
              <td>{c.discount}%</td>
              <td>
                <DeleteOutlined
                  onClick={() => handleRemove(c._id)}
                  className="text-danger pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateCouponPage;
