/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import Amplify, { Auth } from 'aws-amplify';
import { useCookies } from 'react-cookie';

import {
  Input, Button, Alert, Collapse,
} from 'antd';
import awsconfig from '../../aws-exports';

import 'antd/dist/antd.css';

Amplify.configure(awsconfig);

const App1 = (props) => {
  const [cookies, setCookie] = useCookies(['username', 'email']);
  const [state, setState] = useImmer({
    username: null,
    password: null,
    email: null,
    error: null,
    success: null,
    confirmation: null,
    successVerify: false,
    currentTab: 1,
  });

  function updateName(name) {
    setState((draft) => {
      draft.username = name;
    });
  }
  function updatePassword(name) {
    setState((draft) => {
      draft.password = name;
    });
  }
  function updateConfirmation(name) {
    setState((draft) => {
      draft.confirmation = name;
    });
  }
  useEffect(() => {
    function mount() {
      if (
        cookies.username
            && props.isIndex
            && cookies.username !== 'loggedout'
      ) {
        window.location.href = '/loggedin';
      }
    }
    mount();
  }, []);
  function updateEmail(name) {
    setState((draft) => {
      draft.email = name;
    });
    setCookie('email', state.email, { path: '/' });
  }

  function handleUpdate(event) {
    setState((draft) => {
      draft[event.target.name] = event.target.value;
    });
  }
  function SignOut() {
    setCookie('username', 'loggedout', { path: '/' });
    window.location.href = '/';
  }
  function SignIn() {
    Auth.signIn({
      username: state.username, // Required, the username
      password: state.password, // Optional, the password
    })
      .then((data) => {
        console.log(data);
        setCookie('username', state.username, { path: '/' });

        // window.location.href = '/loggedin';
      })
      .catch((err) => setState((draft) => {
        draft.error = err;
      }));
  }
  function SignUp() {
    Auth.signUp({
      username: state.username,
      password: state.password,
      attributes: {
        email: state.email, // optional
      },
      validationData: [], // optional
    })
      .then((data) => setState((draft) => {
        draft.success = data;
      }))
      .catch((err) => setState((draft) => {
        draft.error = err;
      }));
  }
  function forgotPassword() {
    Auth.forgotPassword(state.username)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  function Confirm() {
    Auth.confirmSignUp(state.username, state.confirmation, {
      forceAliasCreation: true,
    })
      .then(() => setState((draft) => {
        draft.successVerify = true;
        draft.currentTab = 2;
      }))
      .catch((err) => setState((draft) => {
        draft.error = err;
      }));
  }
  const {
    error, success, successVerify, currentTab,
  } = state;
  const { isIndex } = props;
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
      <div style={{ display: 'inline-block' }}>
        {successVerify ? (
          <Alert
            message="Code verified please Login with your details"
            type="success"
            closable
            style={{ marginBottom: 5 }}
          />
        ) : null}
        {success ? (
          <Alert
            message={`Check your email ${success.codeDeliveryDetails.Destination} for confirmation Code`}
            type="success"
            closable
            style={{ marginBottom: 5 }}
          />
        ) : null}
        {error ? (
          <Alert
            message={error.log || error.message}
            type="error"
            closable
            style={{ marginBottom: 5 }}
          />
        ) : null}
        {isIndex ? (
          <Collapse accordion defaultActiveKey={[currentTab]}>
            <Collapse.Panel header="Sign Up" key="1">
              {success ? (
                <div>
                  <Input
                    placeholder="Verification Code"
                    onChange={(e) => {
                      updateConfirmation(e.target.value);
                    }}
                    value={state.confirmation}
                    style={{ marginBottom: 5 }}
                  />
                  <Button onClick={Confirm}>Confirm Code</Button>
                </div>
              ) : (
                <div>
                  <Input
                    placeholder="username"
                    onChange={(e) => {
                      updateName(e.target.value);
                    }}
                    name="username"
                    value={state.username}
                    prefix="user"
                    style={{ marginBottom: 5 }}
                  />
                  <Input.Password
                    placeholder="password"
                    name="password"
                    onChange={(e) => {
                      updatePassword(e.target.value);
                    }}
                    value={state.password}
                    style={{ marginBottom: 5 }}
                  />
                  <Input
                    placeholder="email"
                    onChange={handleUpdate}
                    value={state.email}
                    style={{ marginBottom: 5 }}
                  />
                  <Button onClick={SignUp}>Sign Up</Button>
                </div>
              )}
            </Collapse.Panel>
            <Collapse.Panel header="Log In" key="2">
              <Input
                placeholder="username"
                onChange={(e) => {
                  updateName(e.target.value);
                }}
                value={state.username}
                prefix="user"
                style={{ marginBottom: 5 }}
              />
              <Input.Password
                placeholder="password"
                onChange={(e) => {
                  updatePassword(e.target.value);
                }}
                value={state.password}
                style={{ marginBottom: 5 }}
              />
              <Button onClick={SignIn}>Sign In</Button>
            </Collapse.Panel>
          </Collapse>
        ) : (
          <div>
            <h1>{cookies.username}</h1>

            <a onClick={SignOut} href="#endregion">
              Log Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
export default App1;
