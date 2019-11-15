import React from 'react';
import { useStore } from './storeprovider';

export default function Register() {
  const { state, dispatch } = useStore();

  return (
    <section className="counter">

      <h1>register</h1>
      <div className="value">{JSON.stringify(state.user)}</div>
      <button onClick={() => dispatch({ type: 'SET_USERNAME' })}>
				Add
      </button>

    </section>
  );
}
