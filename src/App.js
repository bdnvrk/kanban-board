import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Kanban board</h1>
        </header>
        <p className="App-intro">
          Tutaj w przyszłości zobaczysz projekt zaliczeniowy na przedmiot "Programowanie aplikacji webowych SPA"
        </p>
      </div>
    );
  }
}

export default App;
