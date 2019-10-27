import React, { StrictMode } from 'react';

import { GlobalStateProvider } from './state';

import Counter from './Counter';
import Register from './Register';
import Header from './Header';

const App = () => (
  <StrictMode>
    <GlobalStateProvider>
      <Header />
      <h1>Counter</h1>
      <Counter />
      <Counter />
      <h1>Person</h1>
      <Register />

    </GlobalStateProvider>
  </StrictMode>
);

export default App;
