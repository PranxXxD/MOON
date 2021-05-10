import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spin } from "antd";
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
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <Spin className="d-flex justify-content-sm-center" size="large" />
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="enter your email"
          autoFocus
        ></input>
        <br></br>
        <Button
          variant="primary"
          className="btn"
          disabled={!email}
          text="Submit"
        />
      </form>
    </div>
  );
};
export default ForgotPassword;
