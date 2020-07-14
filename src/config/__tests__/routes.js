import React from 'react';
import routes from '../routes';

it('has all needed routes', () => {
  expect(routes).toMatchSnapshot();
});
