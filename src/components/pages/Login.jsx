import React from 'react';
import loginStyle from './login.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Login() {
  //jwtToken is null if not logged in, token string otherwise
  //setToken sets both the localstorage and react state
  const { jwtToken, setToken } = useOutletContext();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  /*errorMessages is null by default, otherwise its an array of strings*/
  const [errorMessages, setErrorMessages] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(import.meta.env.VITE_BACKEND_URI);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/users/log-in`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          mode: 'cors',
        }
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 404) {
        //if problem w/ username or pass
        setErrorMessages([data.message]);
        console.log('some wrong with username or password');
      } else if (response.status === 422) {
        //if validation errors
        setErrorMessages(data.errors); //data.errors is an array of string
      } else if (!response.ok) {
        //some other error
        setErrorMessages(['There was some error, please try again later']);
        console.log('some wrong with response');
      } else {
        //response was good
        setErrorMessages(null); //set to null cause theres no issues
        setToken(data.token);
        console.log(`token from serv ${data.token}`);
        console.log(`sucessful set the token ${jwtToken}`);
        console.log(`set token ${localStorage.getItem('jwtToken')}`);
        //CHANGE RENAVIGATE THIS LATER
      }
    } catch (err) {
      setErrorMessages(['There is a network error, please try again later']);
      console.error('Error:', err);
    }
  };

  //function onFormSubmit() {}

  return (
    <div className={`${loginStyle.container} container-sm mt-3 shadow`}>
      <form action="" method="post" onSubmit={handleSubmit}>
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
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </small>
          <button
            type="submit"
            className={`${loginStyle.button} btn btn-primary btn-sm`}
          >
            Log in
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
