/* eslint-disable no-undef */
import React, { useEffect } from 'react';

import axios from 'axios';


import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { loggedInUserData, nickname } from './state';

const App = () => (
  <RecoilRoot>
    <Login />
    <FirstScreen />
  </RecoilRoot>
);
const FirstScreen = () => {
  const [nick, setNickname] = useRecoilState(nickname);
  const user = useRecoilValue(loggedInUserData);
  return (
    <div className="choosename" style={{ display: user.id ? 'block' : 'none' }}>
      <div className="placeholder">избери име</div>
      <input className="input" onChange={(e) => setNickname({ nickname: e.target.value })} />
      {JSON.stringify(nick)}
    </div>
  );
};
const Login = () => {
  const [user, setUser] = useRecoilState(loggedInUserData);

  function loginStatus(s) {
    console.log(s);
    if (s.status === 'connected') {
      axios
        .get(
          `https://graph.facebook.com/me/?access_token=${s.authResponse.accessToken}`,
        )
        .then((response) => {
          console.log(response);
          setUser({ ...response.data, ...s.authResponse });
          // setStatus(s.authResponse);
        });
    }
  }
  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = 'https://connect.facebook.net/bg_BG/sdk.js#xfbml=1&version=v7.0&appId=281985576166744&autoLogAppEvents=1';
    scriptTag.addEventListener('load', () => {
      window.FB.Event.subscribe('auth.statusChange', (ss) => loginStatus(ss));
      window.FB.getLoginStatus((ss) => loginStatus(ss));
    });
    document.body.appendChild(scriptTag);
  }, []);

  return (
    <div style={{
      display: user.name ? 'none' : 'block',
      width: '100%',
      height: '100vh',
      textAlign: 'center',
    }}
    >
      <div style={{ paddingTop: '10%' }}>
        <img src="/logo512.png" alt="" />
      </div>
      <div
        className="fb-login-button"
        data-size="large"
        data-button-type="continue_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="false"
        data-width=""
        data-scope="public_profile"
      />
    </div>
  );
};
export default App;
