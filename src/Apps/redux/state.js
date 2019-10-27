import { applyMiddleware, combineReducers } from 'redux';

import { createStore } from 'react-hooks-global-state';

const initialState = {
  count: 0,
  person: {
    email: '',
    firstName: '',
    lastName: '',
    submitted: false,
  },
};


const countReducer = (state = initialState.count, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

const personReducer = (state = initialState.person, action) => {
  switch (action.type) {
    case 'setFirstName':
      return {
        ...state,
        firstName: action.firstName,
      };
    case 'setLastName':
      return {
        ...state,
        lastName: action.lastName,
      };
    case 'setEmail':
      return {
        ...state,
        email: action.age,
      };
    case 'setSubmit':
      return {
        ...state,
        submitted: true,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  count: countReducer,
  person: personReducer,
});

const logger = ({ getState }) => (next) => (action) => {
  /* eslint-disable no-console */
  console.log('will dispatch', action);
  const returnValue = next(action);
  console.log('state after dispatch', getState());
  /* eslint-enable no-console */
  return returnValue;
};

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(
  reducer,
  initialState,
  applyMiddleware(logger),
);
