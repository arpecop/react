/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import axios from 'axios';
import useFetch from 'react-hook-usefetch';

const apps = ['asciiprepare', 'ass', 'assbg_BG', 'assen', 'assen_US', 'banica', 'cars', 'carss', 'celeb', 'celebus', 'denposleden', 'godini', 'goodbad', 'iaponsko', 'iaponskoime', 'imetoti', 'indianskoime', 'iztegli', 'japan', 'japanen', 'kolednaimg', 'match', 'moiatazodia', 'podhojda', 'predishenjivot', 'vazrast'];

const post = async (json, url) => {
  const result = await axios.post(
    url,
    JSON.stringify(json),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return new Promise((resolve) => {
    resolve(result);
  });
};

const Result = ({ user, appid }) => {
  const [data, setData] = useState({ loading: true });
  const urlParameters = Object.entries(user).map((e) => e.join('=')).join('&');

  useEffect(() => {
    const fetchData = async () => {
      const getSimilar = await post(
        {
          url: `https://s3.eu-central-1.amazonaws.com/img.rudixlab.herokuapp.com/apps/${appid}/dev.html?${urlParameters}`,
        },
        'https://grafix.herokuapp.com/shot/do',
      );

      setData(getSimilar.data);
    };
    fetchData();
  }, [appid, urlParameters]);

  return (
    <>
      {data.loading ? (<h1>Зареждам ...</h1>) : (
        <>
          <img
            src={`https://grafix.herokuapp.com/shot/${data.shid}.png`}
            alt=""
            style={{ maxWidth: '100%', margin: 'auto' }}
          />
          <a

            rel="noreferrer"
            style={{
              padding: 10,
              backgroundColor: '#4267b2',
              textDecoration: 'none',
              color: 'white',
            }}
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://kasmetche.netlify.app/${appid}/${data.shid}`)}`}
            className="fb-xfbml-parse-ignore"
          >
            Споделяне1
          </a>
        </>
      )}
    </>
  );
};

const App = ({ match }) => {
  const [user, setUser] = useState({});
  const { data, loading } = useFetch(`/fb/${match ? match.params.id : 'godini'}/app.json`, {});
  apps.slice(0, 5).map((app) => fetch(`/fb/${app}/app.json`));
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
    <div style={{ textAlign: 'center' }}>
      {match && match.params.id2 && (
        <Helmet>
          <meta property="og:url" content="https://www.your-domain.com/your-page.html" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={data.title} />
          <meta property="og:description" content=" " />
          <meta property="og:image" content={`https://s3.eu-central-1.amazonaws.com/img.rudixlab.herokuapp.com/results/${match.params.id2}.png`} />
          <meta property="og:image:width" content="600" />
          <meta property="og:image:height" content="315" />
        </Helmet>
      )}
      { !user.name && !loading && data && (
      <>
        <div style={{ width: '100%', position: 'fixed' }}>
          <h1 style={{ color: 'white' }}>{data.title}</h1>
        </div>

        <div>
          <img
            src={data.cover}
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

      {user.name && <Result user={user} appid={match ? match.params.id : 'godini'} />}
    </div>
  );
};
export default App;
