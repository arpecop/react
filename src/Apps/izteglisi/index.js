/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import useFetch from 'react-hook-usefetch';
import { post } from '../incubator/components/useFetch';

const Result = ({ user, app }) => {
  const [data, setData] = useState({ tweets: [] });
  useEffect(() => {
    const fetchData = async () => {
      const getSimilar = await post({
        collection: 't',
        id: 1,
        limit: 20,
        descending: true,
      });

      setData(getSimilar.data);
    };

    fetchData();
  }, []);

  return (<>{JSON.stringify(user)}</>);
};

const App = ({ match }) => {
  const [user, setUser] = useState({});
  const { data, loading } = useFetch(`/fb/${match.params.id}/app.json`, {});

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
    scriptTag.src = 'https://connect.facebook.net/bg_BG/sdk.js#xfbml=1&version=v8.0&appId=874162999784545&autoLogAppEvents=1';
    scriptTag.addEventListener('load', () => {
      window.FB.Event.subscribe('auth.statusChange', (ss) => loginStatus(ss));
      window.FB.getLoginStatus((ss) => loginStatus(ss));
    });
    document.body.appendChild(scriptTag);
  }, []);

  return (
    <div
      style={{
        width: '100%',

        textAlign: 'center',
      }}
    >
      {match.params.id && !user.name && !loading && data && (
      <>
        <div style={{ width: '100%', position: 'fixed' }}>
          <h1 style={{ color: 'white' }}>{data.title}</h1>
        </div>

        <div>
          <img
            src={data.cover
              ? data.cover.replace(
                'https://arpecop.com/static/',
                '/fb/',
              )
              : ''}
            alt=""
            style={{ width: '100%' }}
          />
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
          style={{ marginTop: -120 }}
        />
      </>
      )}

      {user.name && <Result user={user} appid={match.params.id} />}
    </div>
  );
};
export default App;
