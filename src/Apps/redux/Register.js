import React from 'react';

import { dispatch, useGlobalState } from './state';

const setFirstName = (event) => dispatch({
  firstName: event.currentTarget.value,
  type: 'setFirstName',
});

const setLastName = (event) => dispatch({
  lastName: event.currentTarget.value,
  type: 'setLastName',
});

const setEmail = (event) => dispatch({
  age: event.currentTarget.value,
  type: 'setEmail',
});


const handleSubmit = () => {
  alert('1');
  dispatch({
    submitted: true,
    type: 'setSubmit',
  });
};

const Person = () => {
  const [value] = useGlobalState('person');
  return (
    <>
      <div>
        First Name:
        <input value={value.firstName} onChange={setFirstName} />
      </div>
      <div>
        Last Name:
        <input value={value.lastName} onChange={setLastName} />
      </div>
      <div>
        Age:
        <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-sm py-2 px-4 block w-full appearance-none leading-normal" type="email" placeholder="jane@example.com"/>

        <button className="bg-red-500 hover:bg-yellow-700 text-white font-bold   rounded-full">
  Button
</button>
 <div className="border rounded">
  <div className="border-b last:border-b-0">
    {{ item }}
  </div>
</div>

        <input value={value.email} onChange={setEmail} />
     
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </>
  );
};

export default Person;
