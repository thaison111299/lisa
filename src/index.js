import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from 'react-redux';
import store from './redux/store'
ReactDOM.render(
  <Auth0Provider
    domain="vein.jp.auth0.com"
    clientId="HBPVupSMzzulXfabIq0EhDeXmRSHD0KA"
    redirectUri={window.location.origin}>
    <Provider store={store} >
      <App />
    </Provider>
  </Auth0Provider >
  , document.getElementById('root')
);

