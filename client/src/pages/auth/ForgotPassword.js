import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import Button from "../../components/Button";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoadiing] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadiing(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoadiing(false);
        toast.success("Check your email for password reset Link");
      })
      .catch((error) => {
        setLoadiing(false);
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="contact">
      <div className="forgot-password-form">
        <h2>Forgot Password</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs="12" md="6">
              <div className="form-group">
                <label>Email</label>
                <input
                  type={"text"}
                  label={"Email Address"}
                  name={"email"}
                  className="form-control"
                  placeholder={"Please Enter Your Email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <hr />
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <Button
              type="submit"
              variant="primary"
              text="Send Email"
              className="mb-3 mb-md-0"
            />
            <Link className="redirect-link" to={"/login"}>
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
