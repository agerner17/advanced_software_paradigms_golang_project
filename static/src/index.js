// src/index.js
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./history";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

// Wrap App in the Auth0Provider component
// The domain and client_id values will be found in your Auth0 dashboard
// ReactDOM.render(
//   <Auth0Provider
//     domain="dev-8-p2-x5k.us.auth0.com"
//     client_id="65IQG0uREZs0pS0rQg2cEjx45PsiCcW0"
//     redirect_uri={window.location.origin}
//     onRedirectCallback={onRedirectCallback}
//   >
//     <App />
//   </Auth0Provider>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}     // NEW - specify the audience value
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();