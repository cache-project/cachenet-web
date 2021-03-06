import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import Landing from './Landing';

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/feed" component={loadable(() => import('./Feed'))} />
    </BrowserRouter>
  );
}
