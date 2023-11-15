import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/Context';
import { HiUser } from 'react-icons/hi2';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsEnvelopeAtFill } from 'react-icons/bs';

const register_url = 'http://localhost:8000/auth/users/';

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    username: '',
    password: '',
  });

  const {
    changeInput,
    credentials_error,
    setCredentialsError,
    emptyCredentialsError,
    navigation,
  } = useContext(GlobalContext);

  const { email, username, password } = credentials;

  useEffect(() => {
    emptyCredentialsError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputHandler = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const sendCredentials = () => {
    axios
      .post(
        register_url,
        {
          email: email,
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCredentials({ email: '', username: '', password: '' });
        emptyCredentialsError();
        navigation('/sign-in');
      })
      .catch((error) => {
        console.log(error.response.data);
        setCredentialsError(error.response.data);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    emptyCredentialsError();

    const nullIndex = []; //THIS ARRAY IS AN INDEX ARRAY TO STORE NULL INPUT FIELD INDEXES IN REGISTER FORM
    //IF ONE OR MORE THAN ONE INPUT FIELDS ARE NULL WHEN WE SUBMIT THE REGISTER FORM
    //THIS INDEX ARRAY IS GOING TO HELP US TO IDENTIFY WHICH FIELDS ARE NULL
    if (!email) {
      nullIndex.push(0);
    }
    if (!username) {
      nullIndex.push(1);
    }
    if (!password) {
      nullIndex.push(2);
    }
    if (!email || !username || !password) {
      changeInput(e, nullIndex);
    }

    sendCredentials();
  };

  return (
    <section className='login-register-section'>
      <div className='login-register'>
        <form
          action=''
          className='login-register-form'
          onSubmit={submitHandler}
        >
          <div className='credentials-header'>
            <h1>Create an account to get started</h1>
          </div>
          <div className='credentials-input'>
            {credentials_error && (
              <div className='login-register-error'>
                <ul className='error-list'>
                  {credentials_error.map((error) => {
                    return (
                      <li
                        className='error-element'
                        key={credentials_error.indexOf(error)}
                      >
                        {error}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <div className='login-register-input'>
              <label htmlFor='email'>
                <BsEnvelopeAtFill />
              </label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={inputHandler}
              />
            </div>
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
            <button type='submit'>Register</button>
          </div>
          <div className='or-line'>or</div>
          <div className='credentials-account'>
            <p>
              Already have an account? <a href='/sign-in'>Sign in</a>.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
