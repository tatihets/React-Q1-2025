import { Component } from 'react';

import ErrorBoundary from './views/ErrorBoundary';
import Header from './views/Header';
import Main from './views/Main';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ErrorBoundary>
          <Header />
          <Main />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
