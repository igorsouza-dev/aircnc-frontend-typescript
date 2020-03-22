import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSignUp() {
    const response = await api.post('signup', { email, password, name });
    const { token } = response.data;
    localStorage.setItem('aircnc_token', token);
  }
  return (
    <>
      <p>
        Offer <strong>spots</strong> to programmers and find{' '}
        <strong>talents</strong> for your company
      </p>
      <form>
        <label htmlFor="name">Name *</label>
        <input
          type="name"
          id="name"
          placeholder="Your name"
          onChange={e => setName(e.target.value)}
        />
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
        <button type="button" className="btn" onClick={handleSignUp}>
          SignUp
        </button>
        <Link to="/">Already signed up? Click here</Link>
      </form>
    </>
  );
}
