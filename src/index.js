import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './App';
import * as serviceWorker from './serviceWorker';

const App = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={() => <Main isIndex />} />
        <Route path="/:id/" exact render={props => <Main {...props} isIndex={false} />} />
        <Route path="/:id/:id2" exact render={props => <Main {...props} isIndex={false} />} />
        <Route path="/:id/:id2/:start_key" exact render={props => <Main {...props} isIndex={false} />} />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
