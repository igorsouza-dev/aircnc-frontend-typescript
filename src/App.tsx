import React, { useState } from 'react';
import './App.css';

import logo from './assets/logo.svg';
import api from './services/api';

function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleLogin() {
    const response = await api.post('signin', { email, password });
    console.log(response.data);
  }
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
          <input
            type="email"
            id="email"
            placeholder="Your e-mail"
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">PASSWORD *</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Your password"
          />
          <button type="button" className="btn" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
