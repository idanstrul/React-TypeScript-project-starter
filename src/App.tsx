import React from 'react';
import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div className="app-root">
      <h1>App Root</h1>
      <header>
        <div className="logo"></div>
        <nav className='main-nav'>
          <ul className='clean-list'>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default App;
