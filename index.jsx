import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('assets/sw.js');
  }
});

render(<App />, document.getElementById('app'));
