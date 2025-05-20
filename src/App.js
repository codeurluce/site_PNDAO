import logo from './logo.svg';
import './App.css';
import { LiturgicalProvider } from './contexts/LiturgicalContext';
import { SeasonIndicator } from './components/layout/SeasonIndicators';
import React from 'react';

function App() {
  return (
    <LiturgicalProvider>
      <div className="App">
        <SeasonIndicator />
      </div>
    </LiturgicalProvider>
  );

}
export default App;
