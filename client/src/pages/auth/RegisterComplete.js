import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {createOrUpdateUser} from '../../functions/auth';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  let dispatch = useDispatch();

  // const { user } = useSelector((state) => ({ ...state }));


  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    //   console.log(window.location.href);
    //   console.log(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation 
    if(!email || !password){
        toast.error('Email and password is required');
        return;
    }

    if(password.length < 6){
        toast.error('password must be atleast 6 characters long');
        return;
    }
    if(password1 !== password){
        toast.error('entered passwords must be same');
        return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log("Result->", result);
      if (result.user.emailVerified) {

        //remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");

        // get user token
        let user = auth.currentUser
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        //redux store
        console.log("user",user,"idTokenResult" , idTokenResult);

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
          })
        })
        .catch((err)=>console.log(err));

        //redirect
        history.push('/')

      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
    }
  };
  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <br></br>
      <input
        type="password"
        className="form-control"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
        placeholder="enter password"
        autoFocus
      />
      <br></br>
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="confirm password"
        autoFocus
      />
      <br></br>
      <button type="submit" className="btn btn-raised">
        Submit
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Registration Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};
export default RegisterComplete;
