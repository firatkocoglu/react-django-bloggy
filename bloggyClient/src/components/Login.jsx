/* eslint react/prop-types: 0 */

import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';
import axios from 'axios';
import Cookie from 'universal-cookie';
import { HiUser } from 'react-icons/hi2';
import { RiLockPasswordFill } from 'react-icons/ri';

const login_url = 'http://localhost:8000/api/login/';

//LOGIN VIEW
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const {
    setSession,
    changeInput,
    credentials_error,
    setCredentialsError,
    emptyCredentialsError,
    navigation,
  } = useContext(GlobalContext);

  const { username, password } = credentials;

  useEffect(() => {
    emptyCredentialsError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendCredentials = async () => {
    await axios
      .post(
        login_url,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(function (response) {
        console.log(response);
        //SET GLOBAL COOKIE STATE
        let csrf_cookie = new Cookie().get('csrftoken');
        setSession(csrf_cookie);

        //CLEAR CREDENTIALS INPUT FIELDS AFTER SUCCESSFUL LOGIN
        setCredentials({ username: '', password: '' });

        //RESET CREDENTIALS ERRORS IF THERE ARE ANY
        emptyCredentialsError();

        //REDIRECT TO HOME
        navigation('/home');
      })
      .catch(function (error) {
        emptyCredentialsError();
        setCredentialsError(error.response.data.detail);
      });
  };

  const inputHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //HANDLE MISSING CREDENTIALS WARNINGS
    if (!username && !password) {
      changeInput(e, [0, 1]);
      return;
    }

    if (!username) {
      changeInput(e, [0]);
      return;
    }

    if (!password) {
      changeInput(e, [1]);
      return;
    }
    //HANDLE MISSING CREDENTIALS WARNINGS

    //SEND POST REQUEST WITH AXIOS
    sendCredentials();
  };

  return (
    <section className='login-register-section'>
      <div className='login-register'>
        <form className='login-register-form' onSubmit={submitHandler}>
          <div className='credentials-header'>
            <h1>Login to your Web Talk account</h1>
          </div>
          <div className='credentials-input'>
            {credentials_error && (
              <div className='login-register-error'>
                <ul className='error-list'>
                  {credentials_error.map((error) => {
                    return <li className='error-element'>{error}</li>;
                  })}
                </ul>
              </div>
            )}
            <div className='login-register-input'>
              <label htmlFor='username'>
                <HiUser />
              </label>
              <input
                type='text'
                name='username'
                id='username'
                placeholder='Username'
                value={username}
                onChange={inputHandler}
              />
            </div>
            <div className='login-register-input'>
              <label htmlFor='password'>
                <RiLockPasswordFill />
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                value={password}
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className='credentials-submit'>
            <button type='submit'>Start</button>
          </div>
          <div className='or-line'>or</div>
          <div className='credentials-account'>
            <p>
              Don&apos;t have an account? <a href='/register'>Register</a>.
            </p>
            <p>
              Forgot password? <a href='/reset-password'>Reset your password</a>
              .
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
