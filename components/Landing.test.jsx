import React from 'react';
import renderer from 'react-test-renderer';

import { MemoryRouter } from 'react-router-dom';

import Landing from './Landing';

test('renders basic text and link', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
