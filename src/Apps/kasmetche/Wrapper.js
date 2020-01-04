/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { useImmer } from 'use-immer';

import { FacebookProvider, LoginButton, ShareButton } from 'react-facebook';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FacebookLogin from 'react-facebook-login';
import Applist from './AppList';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, name: null };
    this.checkLoginState = this.checkLoginState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.testAPI = this.testAPI.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '2839078742783517',
        cookie: true,
        xfbml: true,
        version: 'v2.8',
      });
      FB.AppEvents.logPageView();
      FB.Event.subscribe('auth.statusChange', (response) => {
        if (response.authResponse) {
          this.checkLoginState();
        } else {
          console.log('---->User cancelled login or did not fully authorize.');
        }
      });
    }.bind(this);

    // Load the SDK asynchronously
    (function (d, s, id) {
      let js; const
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI() {
    console.log('Welcome! Fetching your information.... ');
    FB.api('/me', (response) => {
      console.log(`Successful login for: ${response.name}`);
      // document.getElementById('status').innerHTML = `Thanks for logging in, ${response.name}!`;
    });
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log '
        + 'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log '
      + 'into Facebook.';
    }
  }

  checkLoginState() {
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }

  handleClick() {
    FB.login(this.checkLoginState());
  }

  render() {
    const {
      app, props, title, children, match,
    } = this.props;
    const { loading, name } = this.state;
    return (
      <>
        {match ? (
          <HelmetProvider>
            <Helmet>
              <meta property="og:url" content={`https://kasmetche.netlify.com/${match.params.id}/${match.params.id2}`} />
              <meta property="og:type" content="article" />
              <meta property="og:title" content={title} />
              <meta property="og:image" content={`https://grafix.herokuapp.com/${match.params.id2}.jpg`} />
              <meta property="og:image:width" content="632" />
              <meta property="og:image:height" content="387" />
            </Helmet>
          </HelmetProvider>
        ) : null}
        {match && match.params.id2 === 'shot'
          ? children
          : (<span />)}
        <div
          className="App"
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'inline-block' }}>
            <FacebookProvider appId="2839078742783517">
              { loading ? (<div>Loading</div>) : null}
              { name}
              {!name ? (
                <div style={{ textAlign: 'center' }}>
                  <h1 style={{ fontWeight: 'lighter' }}>
                    {`${title}`}
                  </h1>
                  <button onClick={this.handleClick}>dsasdd</button>

                </div>
              ) : (
                <div>
                  <img src={state.resultImg} alt="" style={{ maxWidth: '100%' }} />
                  <div style={{ textAlign: 'center' }}>
                    <ShareButton href={`https://kasmetche.netlify.com/${app}/${state.resultId}`} className="ant-btn ant-btn-primary ant-btn-round ant-btn-lg">
                          Сподели
                    </ShareButton>
                  </div>
                  <div id="SC_TBlock_706275" className="SC_TBlock" />
                  <p><Applist /></p>
                </div>
              )}
            </FacebookProvider>
          </div>
        </div>
      </>
    );
  }
}

const Wrapper = ({
  app, props, title, children,
}) => {
  const [state, setState] = useImmer({
    name: null,
    loading: false,
    resultId: null,
    resultImg: null,
  });

  const handleResponse = async (data) => {
    console.log(data);

    setState((draft) => {
      draft.loading = true;
    });
    const response = await axios(`//grafix.herokuapp.com/?url=http://kasmetche.netlify.com/${app}/shot/${data.id}`);

    setState((draft) => {
      draft.name = data.name;
      draft.id = data.id;
      draft.resultImg = response.data.id;
      draft.resultId = response.data._id;
      draft.loading = false;
    });
  };

  return (
    <div />
  );
};
// export default Wrapper;
