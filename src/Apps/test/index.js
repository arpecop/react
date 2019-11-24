import React from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useTrackedState } from 'reactive-react-redux';
import axios from 'axios';
import Counter from './counter';

const initialState = {
  count: 0,
  text: 'hello',
  user: { username: null, email: null, password: null },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'setUsername':
      return { ...state, user: { ...state.user, username: action.text } };
    case 'setPassword':
      return { ...state, user: { ...state.user, password: action.text } };
    default:
      return state;
  }
};

const store = createStore(reducer);


const TextBox = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  axios
    .post('http://198.46.193.3/login', {
      username: 'test',
      password: 'test',
    })
    .then((response) => {
      console.log(response.data.token);
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .post('http://198.46.193.3/login', {
      username: 'test',
      password: 'test',
    })
    .then((response) => {
      console.log(response.data.token);
      axios({
        method: 'get',
        url: 'http://198.46.193.3/',

        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      })
        .then((response1) => {
          console.log(response1);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div>
      <div>
        <input
          value={state.user.username}
          onChange={(event) => dispatch({ type: 'setUsername', text: event.target.value })}
        />
        <input
          value={state.user.password}
          onChange={(event) => dispatch({ type: 'setPassword', text: event.target.value })}
        />
        <button
          type="button"
          onClick={() => dispatch({ type: 'decrement' })}
        >
-1

        </button>
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <h1>Counter</h1>
    <Counter />

    <h1>TextBox</h1>

    <TextBox />
  </Provider>
);
export default App;
