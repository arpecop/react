import React, { createContext, useReducer, useContext } from 'react';

const defaultState = {
  counter: 0,
  user: { username: null, email: null },
};
function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case 'COUNTER_INC':
      return { ...state, counter: state.counter + 1 };
    case 'COUNTER_DEC':
      return { ...state, counter: state.counter - 1 };
    case 'COUNTER_RESET':
      return { ...state, counter: 0 };
    case 'SET_USERNAME':
      return { ...state, user: { username: 'x' } };
    default:
      return state;
  }
}
const StoreContext = createContext(null);
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
export const useStore = () => useContext(StoreContext);
