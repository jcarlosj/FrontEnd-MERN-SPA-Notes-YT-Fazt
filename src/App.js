import React from 'react';
import './App.css';

import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation/>
        <h1>Notes App</h1>
        <h3>MERN Stack (API RestFul)</h3>
      </header>
    </div>
  );
}

export default App;
