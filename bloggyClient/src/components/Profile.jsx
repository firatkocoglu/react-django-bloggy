import { useContext, useState } from 'react';
import { GlobalContext } from '../context/Context';
import axios from 'axios';

const Profile = () => {
  const { session, user, setUser } = useContext(GlobalContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { username, first_name, last_name, email, bio, location } = user;

  const inputChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (isButtonDisabled) {
      setIsButtonDisabled(false);
    }
  };

  const profileSubmitHandler = (e) => {
    e.preventDefault();
    const response = axios.put(
      'http://localhost:8000/api/updateuser/',
      {
        email: email,
        first_name: first_name,
        last_name: last_name,
        bio: bio,
        location: location,
      },
      {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      }
    );
    console.log(response);
    window.location.reload();
  };

  return (
    <section className='profile-section'>
      <div className='profile-section-title'>
        <h1>Profile Settings</h1>
      </div>
      <div className='profile-settings'>
        <form
          action=''
          className='profile-form'
          onSubmit={profileSubmitHandler}
        >
          <div className='profile-form-input'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={inputChangeHandler}
            />
          </div>
          <div className='profile-form-input'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              id='username'
              value={username}
              onChange={inputChangeHandler}
              disabled
            />
          </div>
          <div className='profile-form-input'>
            <label htmlFor='first_name'>First Name</label>
            <input
              type='text'
              name='first_name'
              id='first_name'
              value={first_name}
              onChange={inputChangeHandler}
            />
          </div>
          <div className='profile-form-input'>
            <label htmlFor='last_name'>Last Name</label>
            <input
              type='text'
              name='last_name'
              id='last_name'
              value={last_name}
              onChange={inputChangeHandler}
            />
          </div>
          <div className='profile-form-input'>
            <label htmlFor='bio'>Bio</label>
            <input
              type='text'
              name='bio'
              id='bio'
              value={bio}
              onChange={inputChangeHandler}
            />
          </div>
          <div className='profile-form-input'>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              name='location'
              id='location'
              value={location}
              onChange={inputChangeHandler}
            />
          </div>
          <div className='submit-form'>
            <button type='submit' disabled={isButtonDisabled}>
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
