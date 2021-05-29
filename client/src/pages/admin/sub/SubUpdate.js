import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSub, updateSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { Row, Col } from "reactstrap";
import Button from "../../../components/Button";

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="contact">
      {loading ? (
        <h4 className="text-danger">Loading..</h4>
      ) : (
        <h4>Update Sub Category</h4>
      )}
      <hr />

      <Row>
        <Col xs="12" md="6">
          <label>Parent Category</label>
          <select
            name="category"
            className="form-control mb-3"
            onChange={(e) => setParent(e.target.value)}
          >
            <option>Please Select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id} selected={c._id === parent}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            required
          />
          <Button
            onClick={handleSubmit}
            variant="primary"
            className="btn mt-3"
            text="Update"
          />
        </Col>
      </Row>
    </div>
  );
};

export default SubUpdate;
