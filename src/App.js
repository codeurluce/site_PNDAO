import logo from './logo.svg';
import './App.css';
import { LiturgicalProvider } from './contexts/LiturgicalContext';
import { SeasonIndicator } from './components/layout/SeasonIndicators';
import React from 'react';

function App() {
  return (
    <LiturgicalProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <SeasonIndicator />
      </div>
    </LiturgicalProvider>
  );

}
export default App;
