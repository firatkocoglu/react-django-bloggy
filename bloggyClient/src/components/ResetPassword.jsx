import axios from 'axios';
import { useContext, useState } from 'react';
import { BsEnvelopeAtFill } from 'react-icons/bs';
import { GlobalContext } from '../context/Context';
import Notification from './Notification';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const { notification, setNotification, navigation } =
    useContext(GlobalContext);

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      setEmail('');
      setNotification({
        result: 'Success',
        message: `Reset password email has been sent to ${email}. Please check your mail box.`,
      });
      const response = await axios.post(
        'http://localhost:8000/auth/users/reset_password/',
        {
          email: email,
        }
      );
      console.log(response);
      if (response.status === 204) {
        setTimeout(() => {
          navigation('/sign-in');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className='login-register-section'>
      <div className='login-register'>
        <form className='login-register-form' onSubmit={resetPasswordHandler}>
          <div className='credentials-header'>
            <h1>Reset your password</h1>
          </div>
          <div className='credentials-input'>
            <div className='login-register-input'>
              <label htmlFor='email'>{<BsEnvelopeAtFill />}</label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='credentials-submit'>
            <button type='submit'>Send Reset Email</button>
          </div>
        </form>
      </div>
      {notification.message && <Notification />}
    </section>
  );
};

export default ResetPassword;
