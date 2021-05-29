import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password Updated successfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="enter new password"
          autoFocus
          disabled={loading}
          value={password}
        />
        <br />
        <Button
          color="secondary"
          type="submit"
          size="large"
          variant="contained"
          endIcon={<SendIcon />}
          disabled={!password || password.length < 6 || loading}
        >
          Update
        </Button>
      </div>
    </form>
  );
  return (
    <div className="contact">
      {loading ? (
        <h1 className="text-danger">Loading...</h1>
      ) : (
        <h1>Password Update</h1>
      )}
      <hr />
      <Row>
        <Col xs="12" md="6">
          {passwordUpdateForm()}
        </Col>
      </Row>
    </div>
  );
};

export default Password;
