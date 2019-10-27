import React from 'react';

import { useGlobalState } from './state';

const Header = () => {
  const [value] = useGlobalState('person');
  const [count] = useGlobalState('count');
  return (
    <div>
Hello world
      {' '}
      {count}
      <div className="md">dsds</div>
      {value.submitted ? JSON.stringify(value) : null}
    </div>
  );
};
export default Header;
