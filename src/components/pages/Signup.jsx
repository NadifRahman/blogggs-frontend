import React from 'react';
import loginStyle from './login.module.css';
import { useState } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';

export default function Signup() {
  //jwtToken is null if not logged in, token string otherwise
  //setToken sets both the localstorage and react state
  const { jwtToken, setToken } = useOutletContext();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState(null); //null or array of strings

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/users/sign-up`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          mode: 'cors',
        }
      );

      const responseData = await response.json();

      if (response.status === 409 || response.status === 422) {
        //if user exists already
        setErrorMessages(responseData.errors);
      } else if (!response.ok) {
        setErrorMessages(responseData.errors);
      } else {
        //response was good
        setToken(responseData.token);
        setErrorMessages(null);
        navigate('/');
      }
    } catch (err) {
      setErrorMessages(['There is a network error, please try again later']);
      console.error('Error:', err);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className={`${loginStyle.container} container-sm mt-3 shadow`}>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First name
          </label>
          <input
            type="first_name"
            name="first_name"
            id="first_name"
            className="form-control"
            required
            maxLength={20}
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last name
          </label>
          <input
            type="last_name"
            name="last_name"
            id="last_name"
            className="form-control"
            required
            maxLength={20}
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="username"
            name="username"
            id="username"
            className="form-control"
            required
            maxLength={15}
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            required
            maxLength={20}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 d-flex">
          <small>
            Have an account? <Link to="/log-in">Sign up</Link>
          </small>
          <button
            type="submit"
            className={`${loginStyle.button} btn btn-primary btn-sm`}
          >
            Sign up
          </button>
        </div>
      </form>
      {errorMessages &&
        errorMessages.map((errorMessage) => (
          <div key={errorMessage} className="alert alert-warning" role="alert">
            {errorMessage}
          </div>
        ))}
    </div>
  );
}
