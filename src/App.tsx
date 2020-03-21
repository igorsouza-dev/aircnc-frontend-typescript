import React from 'react';
import './App.css';

import logo from './assets/logo.svg';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnC" />
      <div className="content">
        <p>
          Offer <strong>spots</strong> to programmers and find{' '}
          <strong>talents</strong> for your company
        </p>
        <form>
          <label htmlFor="email">E-MAIL *</label>
          <input type="email" id="email" placeholder="Your e-mail" />
          <label htmlFor="password">PASSWORD *</label>
          <input type="password" id="password" placeholder="Your password" />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
