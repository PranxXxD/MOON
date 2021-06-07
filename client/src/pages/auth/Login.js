import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
import { GoogleIcon } from "../../components/Icon";
import { Row, Col } from "reactstrap";
import LoadingIndicator from "../../components/LoadingIndicator";
import Button from "../../components/Button";
import firebase from "../../firebase";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

const Login = ({ history }) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/");
      }
    }
  };

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

    if (phone.length < 10) {
      toast.error("Phone Number must be 10 digits long!");
      return;
    }
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
        })
        .catch((err) => {
          toast.error(err);
        });

    } catch (err) {
      console.log("error ------->", err);
      toast.error(err);
    }
  };
  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();

    if (verify) {
      // get user token
      let user = auth.currentUser;
      console.log("currrent userrsrr", user);
      const idTokenResult = await user.getIdTokenResult();

      //redux store
      console.log("user", user, "idTokenResult----->", idTokenResult);

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          console.log("DONE", res);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
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
      <div className="login-form">
        {loading && <LoadingIndicator />}
        <h2>Login</h2>
        <hr />
        <form onSubmit={handleSubmit} noValidate>
          <div id="sign-in-button"></div>
          <Row>
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
                  placeholder="enter registered phone number"
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
                text="Verify number to Login"
                disabled
              />
            )}
            <Link className="redirect-link ml-md-3 mt-3" to={"/register"}>
              Create an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
