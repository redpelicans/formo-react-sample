import React from 'react';
import ReactDOM from 'react-dom';
import {Formo, Field, MultiField} from 'formo';

const formo = new Formo([
  new Field('name',{
    label: 'Name',
    type: 'text',
    required: true,
  }),
]);

const App = () => {
  return (
    <span>Formo Samples</span>
  );
}

ReactDOM.render(<App/>, document.getElementById("formo"));                                                                                      



