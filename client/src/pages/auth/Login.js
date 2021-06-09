import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { validateUser, checkUser } from "../../functions/auth";
import { Row, Col } from "reactstrap";
import LoadingIndicator from "../../components/LoadingIndicator";
import Button from "../../components/Button";
import firebase from "../../firebase";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

const Login = ({ history }) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [userError, setUserError] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

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

  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      toast.error("Phone Number must be 10 digits!");
      return;
    }
    setLoading(true);
    setUpReCaptcha();

    const phoneNumber = "+91" + phone;
    const appVerifier = window.recaptchaVerifier;

    try {
      checkUser({ phoneNumber })
        .then((res) => {
          // console.log("USER CHECKED", res);
          if (res.data.err) {
            toast.error("Please signup");
            setUserError(res.data.err);
            setLoading(false);
            return;
          }
          setUserError("");
          firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((res) => {
              // console.log("Success");
              setLoading(false);
              let code = window.prompt("Enter OTP");
              if (code === null) {
                toast.error("Invalid OTP!! Please try again");
                window.location.reload();
                return;
              }
              res
                .confirm(code)
                .then((result) => {
                  // console.log("job done ------->", result);
                  toast.success("Phone Number Verified");
                  setVerify(true);
                })
                .catch((err) => {
                  toast.error("Invalid OTP!! Please try again");
                  window.location.reload();
                });
            })
            .catch((err) => {
              // console.log("OTP ERROR", err);
              window.location.reload();
              toast.error("Please try again");
            });
        })
        .catch((err) => {
          console.log(err);
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

      validateUser(idTokenResult.token)
        .then((res) => {
          console.log("DONE", res);
          if (res.data.err) {
            toast.error("Please signup", res.data.err);
            setUserError(res.data.err);
            return;
          }
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              phone: res.data.phone_number,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });

          //redirect
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="contact">
      <div className="login-form">
        {loading && <LoadingIndicator />}
        <h2>Login</h2>
        <hr />
        <form>
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
              {userError && (
                <p className="text-danger">{userError}, Please Register </p>
              )}

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
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-start">
            {verify ? (
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="primary"
                text="Log in"
              />
            ) : (
              <Button
                type="submit"
                variant="primary"
                text="Verify number to Login"
                disabled
              />
            )}
            <Link className="redirect-link ml-md-3 mt-2" to={"/register"}>
              Create an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
