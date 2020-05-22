/* eslint-disable no-undef */
import React, { useEffect } from 'react';

import axios from 'axios';


import { RecoilRoot, useRecoilState } from 'recoil';
import { loggedInUserData } from './state';

const App = () => (
  <RecoilRoot>
    <Login />
    <FirstScreen />
  </RecoilRoot>
);
const FirstScreen = () => {
  const [user] = useRecoilState(loggedInUserData);
  return (
    <div>
      Welcome dsds dsds dsdsds
      {JSON.stringify(user)}
    </div>
  );
};
const Login = () => {
  const [user, setUser] = useRecoilState(loggedInUserData);

  function loginStatus(s) {
    if (s.status === 'connected') {
      axios
        .get(
          `https://graph.facebook.com/me/?access_token=${s.authResponse.accessToken}`,
        )
        .then((response) => {
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

  return user.name ? (
    <div
      className="fb-login-button"
      data-max-rows="1"
      data-size="large"
      data-button-type="login_with"
      data-show-faces="false"
      data-auto-logout-link="true"
      data-use-continue-as="false"
      data-scope="user_friends"
    >
      dsds
    </div>
  ) : null;
};
export default App;
