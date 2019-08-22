import { h } from 'preact';

import App from './components/App';

window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('assets/sw.js');
  }
});

Preact.render(<App />, document.getElementById('app'));

if (process.env.NODE_ENV === 'development') {
  import('preact/debug');
}
