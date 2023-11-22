import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/Context';
import axios from 'axios';

const Profile = () => {
  const { session, user } = useContext(GlobalContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [userFields, setUserFields] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    bio: '',
    location: '',
  });

  const inputChangeHandler = (e) => {
    setUserFields({ ...userFields, [e.target.name]: e.target.value });
    if (isButtonDisabled) {
      setIsButtonDisabled(false);
    }
  };

  const profileSubmitHandler = (e) => {
    e.preventDefault();
    const response = axios.put(
      'http://localhost:8000/api/updateuser/',
      {
        email: userFields.email ? userFields.email : user.email,
        first_name: userFields.first_name
          ? userFields.first_name
          : user.first_name,
        last_name: userFields.last_name ? userFields.last_name : user.last_name,
        bio: userFields.bio ? userFields.bio : user.bio,
        location: userFields.location ? userFields.location : user.location,
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
              placeholder={user.email}
              value={userFields.email}
              onChange={inputChangeHandler}
            />
          </div>
          <div className='profile-form-input'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              id='username'
              placeholder={user.username}
              value={userFields.username}
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
              placeholder={user.first_name}
              value={userFields.first_name}
              onChange={inputChangeHandler}
            />
          </div>
          <div className='profile-form-input'>
            <label htmlFor='last_name'>Last Name</label>
            <input
              type='text'
              name='last_name'
              id='last_name'
              placeholder={user.last_name}
              value={userFields.last_name}
              onChange={inputChangeHandler}
            />
          </div>
          <div className='profile-form-input'>
            <label htmlFor='bio'>Bio</label>
            <input
              type='text'
              name='bio'
              id='bio'
              placeholder={user.bio}
              value={userFields.bio}
              onChange={inputChangeHandler}
            />
          </div>
          <div className='profile-form-input'>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              name='location'
              id='location'
              placeholder={user.location}
              value={userFields.location}
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
