import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RiLockPasswordFill } from 'react-icons/ri';
import axios from 'axios';
import { GlobalContext } from '../context/Context';
import Notification from './Notification';

const NewPassword = () => {
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const { newPassword, confirmPassword } = password;

  const {
    credentials_error,
    setCredentialsError,
    emptyCredentialsError,
    setNotification,
    notification,
  } = useContext(GlobalContext);

  const { uid, token } = useParams();

  const inputChangeHandler = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const renewPasswordHandler = async (e) => {
    e.preventDefault();
    emptyCredentialsError();
    try {
      if (newPassword === confirmPassword) {
        setPassword({ newPassword: '', confirmPassword: '' });
        const response = await axios.post(
          'http://localhost:8000/auth/users/reset_password_confirm/',
          {
            uid: uid,
            token: token,
            new_password: newPassword,
            re_new_password: confirmPassword,
          }
        );

        if (response.status === 204) {
          setNotification({
            result: 'Success',
            message:
              'Password has been changed. This page is closing in 3 seconds.',
          });
          setTimeout(() => {
            window.close();
          }, 3000);
        } else {
          setCredentialsError(response.response.data.new_password);
        }
      } else {
        setCredentialsError('Passwords do not match.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='login-register-section'>
      <div className='login-register'>
        <form className='login-register-form' onSubmit={renewPasswordHandler}>
          <div className='credentials-header'>
            <h1>Set New Password</h1>
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
              <label htmlFor='new-password'>
                <RiLockPasswordFill />
              </label>
              <input
                type='password'
                id='new-password'
                name='newPassword'
                placeholder='Type new password'
                value={newPassword}
                onChange={inputChangeHandler}
              />
            </div>
            <div className='login-register-input'>
              <label htmlFor='renew-password'>
                <RiLockPasswordFill />
              </label>
              <input
                type='password'
                id='renew-password'
                name='confirmPassword'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          <div className='credentials-submit'>
            <button type='submit'>Reset Password</button>
          </div>
        </form>
      </div>
      {notification.message && <Notification />}
    </section>
  );
};

export default NewPassword;
