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

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="contact">
      <div className="login-form">
        {loading && <LoadingIndicator />}
        <h2>Login</h2>
        <hr />
        <form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col
              xs={{ size: 12, order: 2 }}
              md={{ size: "6", order: 1 }}
              className="col-no-padding"
            >
              <Col xs="12" md="12">
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
              <Col xs="12" md="12">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type={"password"}
                    className="form-control"
                    placeholder="password length must be atleast 6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </Col>
              <Row>
                <Col xs="12" md="12">
                  <Link
                    className="redirect-link forgot-password-link"
                    to={"/forgot/password"}
                  >
                    <p className="text-right mr-3"> Forgot Password?</p>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col xs={{ size: 12, order: 1 }} md={{ size: "6", order: 2 }}>
              <div className="signup-provider mb-3">
                <a onClick={googleLogin} className="google-btn">
                  <GoogleIcon />
                  <span className="btn-text">Login with Google</span>
                </a>
              </div>
            </Col>
          </Row>
          <hr />
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-3 mb-md-0">
              <Button
                variant="primary"
                text="Login"
                disabled={!email || password.length < 6}
              />
              <Link className="redirect-link ml-md-3" to={"/register"}>
                Create an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
