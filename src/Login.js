import React, { useState } from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [usemail, setusEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      usemail,
      password,
    });
    setToken(token);
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Hello!</div>
      </div>
      <h4>Fill in your email and password to sign in.</h4>

      <br />
      <div className={'inputContainer'}>
        <input
          type="text"
          value={usemail}
          placeholder="Email"
          onChange={(ev) => setusEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={handleSubmit}
          value={'Sign in'}
        />
        <h4>
          {/* Dont Have an Aaccount? <Link to="/Register">Sign Up</Link>{' '} */}
        </h4>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
