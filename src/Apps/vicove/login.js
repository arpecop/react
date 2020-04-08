/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import FacebookLogin from 'react-facebook-login';
import { useCookies } from 'react-cookie';

const App1 = (props) => {
  const [cookies, setCookie] = useCookies(['username', 'email']);
  const [state, setState] = useImmer({
    username: null,
    password: null,
  });
  function responseFacebook() {}
  return (
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
      <FacebookLogin
        appId="1088597931155576"
        autoLoad
        callback={responseFacebook}
        render={(renderProps) => (
          <button onClick={renderProps.onClick}>
            This is my custom FB button
          </button>
        )}
      />
    </div>
  );
};
export default App1;
