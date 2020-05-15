/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import 'antd/dist/antd.css';
import { PageHeader, Tag, Button } from 'antd';

function App() {
  const [name, setName] = useState(null);
  const [status, setStatus] = useState({});
  function loginStatus(s) {
    if (s.status === 'connected') {
      axios.get(`https://graph.facebook.com/me/?access_token=${s.authResponse.accessToken}`)
        .then((response) => {
          setName(response.data.name);
          setStatus(s.authResponse);
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
    <div>
      {name ? (
        <>
          <PageHeader
            title="Title"
            className="site-page-header"
            subTitle={` ${name}`}
            tags={<Tag color="blue">Running</Tag>}
            extra={[
              <Button key="3">{status.userID}</Button>,
              <Button key="2">Operation</Button>,
              <Button key="1" type="primary">
                Primary
              </Button>,
            ]}
            avatar={{ src: `https://graph.facebook.com/${status.userID}/picture` }}
          />
        </>
      ) : (
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="true"
          data-use-continue-as="false"
        />
      )}
    </div>
  );
}
export default App;
