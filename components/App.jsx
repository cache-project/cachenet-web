import { h } from 'preact';
import Router from 'preact-router';
import AsyncRoute from 'preact-async-route';

import Landing from './Landing';

export default function App() {
  return <Router>
    <Landing path="/" />
    <AsyncRoute
      path="/feed"
      getComponent={ () => import('./Feed').then(module => module.default) } />
  </Router>
}
