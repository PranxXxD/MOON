import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { auth } from "../../firebase";
import firebase from "../../firebase";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
import LoadingIndicator from "../../components/LoadingIndicator";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState("");

  let dispatch = useDispatch();

  // useEffect(() => {
  //   if (user && user.token) history.push("/");
  // }, [user, history]);

  const setUpReCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          console.log("captcha resolved");
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          handlePhoneSubmit();
        },
      }
    );
  };

  const handlePhoneSubmit = async (e) => {
    setUpReCaptcha();
    const phoneNumber = "+91" + phone;
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((res) => {
          console.log("Success");
          let code = window.prompt("Enter OTP");
          if (code === null) {
            return;
          }

          res.confirm(code).then((result) => {
            console.log("job done ------->", result);
            setVerify(true);
            toast.success("Phone Number Verified");
          });
        });
    } catch (err) {
      console.log("error ------->", err);
    }
  };

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();

    //validation
    if (!email || !password || !fname || !lname) {
      toast.error("Required fields cannot be empty!");
      return;
    }

    if (password.length < 6) {
      toast.error("password must be atleast 6 characters long!");
      return;
    }

    if (phone.length < 10) {
      toast.error("Phone Number must be 10 digits long!");
      return;
    }

    if (verify) {
      // get user token
      let user = auth.currentUser;
      console.log("currrent userrsrr", user);
      const idTokenResult = await user.getIdTokenResult();

      //redux store
      console.log("user", user, "idTokenResult----->", idTokenResult);

      createOrUpdateUser({ fname, lname, email, password }, idTokenResult.token)
        .then((res) => {
          console.log("DONE", res);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: fname,
              email: email,
              phone: res.data.phone_number,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        })
        .catch((err) => console.log(err));

      //redirect
      history.push("/");
    }
  };

  return (
    <div className="contact">
      <div className="signup-form">
        {loading && <LoadingIndicator />}
        <h2>Sign Up</h2>
        <hr />
        <form onSubmit={handleSubmit} noValidate>
          <div id="sign-in-button"></div>
          <Row>
            <Col xs="12" md="6">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="3">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="fname"
                  className="form-control"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
            </Col>
            <Col xs="12" md="3">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lname"
                  className="form-control"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="3">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Col>
            <Col xs="12" md="3">
              <div className="form-group">
                {verify ? (
                  <label className="text-success">Phone Number</label>
                ) : (
                  <label>Phone Number</label>
                )}
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {verify ? (
                <p className="item-label text-right text-success">
                  Verified
                  <VerifiedUserIcon fontSize="small" className="text-success" />
                </p>
              ) : (
                <button
                  onClick={handlePhoneSubmit}
                  className="item-label float-right text-success"
                >
                  Get OTP?
                </button>
              )}
            </Col>
          </Row>
          <hr />
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            {verify ? (
              <Button type="submit" variant="primary" text="Sign Up" />
            ) : (
              <Button
                type="submit"
                variant="primary"
                text="Verify number to SignUp"
                disabled
              />
            )}
            <Link className="mt-3 mt-md-0 redirect-link" to={"/login"}>
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
