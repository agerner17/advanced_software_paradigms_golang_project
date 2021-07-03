import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const Home = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <Fragment>
      <div className="container">
        <div className="jumbotron text-center mt-5">
          <h1>Go Language Evaluation</h1>
          <p>Sign in to test authentication.</p>
          {!isAuthenticated && (
            <button className="btn btn-primary btn-lg btn-login btn-block" onClick={() => loginWithRedirect({})}>SIGN IN</button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;