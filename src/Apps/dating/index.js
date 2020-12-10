import React from 'react';

import './src/tailwind.min.css';
import Grid from 'styled-components-grid';
import Wrapper from './Wrapper';

const App = () => (
  <Wrapper>
    <div className="shadow-inner bg-gray-200  p-5 shadow">fb zapoznanstva</div>

    <div className="container mx-auto flex-row border border-t-0 border-l-0 border-r-0">
      <div className="border-solid border-2 p-4 border border-b-0 w-3">dsds</div>
      <div className="border-solid border-2  p-4 border border-b-0 w-4">dsds</div>
    </div>
    <Grid>
      <Grid.Unit size={1 / 2}>Awesome!</Grid.Unit>
      <Grid.Unit size={1 / 2}>Amazing!</Grid.Unit>
      <Grid.Unit size={{ xs: 1, sm: 1 / 2, md: 1 / 6 }} style={{ backgroundColor: 'red' }}>Out of this world!</Grid.Unit>
    </Grid>
  </Wrapper>
);
export default App;
