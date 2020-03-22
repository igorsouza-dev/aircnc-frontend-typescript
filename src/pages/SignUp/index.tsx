import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../services/api';

const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function handleSignUp() {
    try {
      const response = await api.post('signup', { email, password, name });
      const { token } = response.data;
      localStorage.setItem('aircnc_token', token);
      Swal.fire({
        title: 'Success!',
        text: 'You signed up successfully!',
        icon: 'success',
      }).then(e => {
        history.push('/');
      });
    } catch (e) {
      Swal.fire({
        title: 'Error!',
        text: e.response.data.error,
        icon: 'error',
      });
    }
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
};

export default SignUp;
