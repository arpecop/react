import React from 'react';
import { useImmer } from 'use-immer';
import Amplify, { Auth } from 'aws-amplify';
import { useCookies } from 'react-cookie';

import {
  Icon, Input, Button, Alert, Collapse,
} from 'antd';
import awsconfig from '../../aws-exports';
import 'antd/dist/antd.css';

const { Panel } = Collapse; // or 'antd/dist/antd.less'

Amplify.configure(awsconfig);


const App = () => {
  const [cookies, setCookie] = useCookies(['username', 'email']);
  const [state, setState] = useImmer({
    username: null,
    password: null,
    email: null,
    error: null,
    success: null,
    confirmation: null,
    successVerify: false,
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
  function updateEmail(name) {
    setState((draft) => {
      draft.email = name;
    });
    setCookie('email', state.email, { path: '/' });
  }
  function SignIn() {
    Auth.signIn({
      username: state.username, // Required, the username
      password: state.password, // Optional, the password
    }).then((data) => {
      setCookie('username', state.username, { path: '/' });
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
  function Confirm() {
    Auth.confirmSignUp(state.username, state.confirmation, {
      forceAliasCreation: true,
    }).then(() => setState((draft) => {
      draft.successVerify = true;
    }))
      .catch((err) => setState((draft) => {
        draft.error = err;
      }));
  }
  const { error, success, successVerify } = state;
  return (
    <div className="App" style={{ padding: '10%' }}>
      <h1>{cookies.username}</h1>
      {successVerify ? (<Alert message="Code verified please Login with your details" type="success" closable style={{ marginBottom: 5 }} />) : null}
      {success ? (<Alert message={`Check your email ${success.codeDeliveryDetails.Destination} for confirmation Code`} type="success" closable style={{ marginBottom: 5 }} />) : null}
      {error ? (<Alert message={error.log || error.message} type="error" closable style={{ marginBottom: 5 }} />) : null}
      <Collapse accordion defaultActiveKey={['1']}>

        <Panel header="Sign Up" key="1">
          {success ? (
            <div>
              <Input
                placeholder="email"
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
                value={state.username}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
              <Input
                placeholder="email"
                onChange={(e) => {
                  updateEmail(e.target.value);
                }}
                value={state.email}
                style={{ marginBottom: 5 }}
              />
              <Button onClick={SignUp}>Sign Up</Button>
            </div>
          )}
        </Panel>
        <Panel header="Log In with existing account" key="2">
          <Input
            placeholder="username"
            onChange={(e) => {
              updateName(e.target.value);
            }}
            value={state.username}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
        </Panel>
      </Collapse>


    </div>
  );
};
export default App;
