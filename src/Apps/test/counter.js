import React from 'react';
import { useDispatch, useTrackedState } from 'reactive-react-redux';

const Counter = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  return (
    <div>
      {Math.random()}
      <div>
        {JSON.stringify(state)}

        <button
          type="button"
          onClick={() => dispatch({ type: 'increment' })}
        >
					+1
        </button>
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
export default Counter;
