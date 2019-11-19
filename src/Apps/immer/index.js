import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import Amplify, { Auth } from 'aws-amplify';


Amplify.configure(awsconfig);
const App = () => {
  const [state, setState] = useImmer({
    name: 'Michel',
  });
  function updateName(name) {
    setState((draft) => {
      draft.name = name;
    });
  }
  useEffect(() => {
    async function mount() {
      setState((draft) => {
        draft.name = 'Ivan';
      });
    }
    mount();
  }, []);
  return (
    <div className="App">
      <h1>
        {' '}
Hello
        {' '}
        {state.name}
        {' '}
      </h1>
      <input
        onChange={(e) => {
          updateName(e.target.value);
        }}
        value={state.name}
      />
      <br />

    </div>
  );
};
export default App;
