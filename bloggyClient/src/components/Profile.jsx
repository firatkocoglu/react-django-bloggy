import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/Context';
import axios from 'axios';
import Notification from './Notification';

const Profile = () => {
  const { session, user, fetchUser, notification, setNotification } =
    useContext(GlobalContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [userFields, setUserFields] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    bio: '',
    location: '',
    avatar: '',
  });

  //SET AVATAR VARIABLE GLOBALLY FOR MULTIPLE USES
  const avatar = document.getElementById('avatar');

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUserFields({ ...userFields, ...user });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const inputChangeHandler = (e) => {
    setUserFields({ ...userFields, [e.target.name]: e.target.value });
    if (isButtonDisabled) {
      setIsButtonDisabled(false);
    }
  };

  const changeAvatarHandler = (e) => {
    setUserFields({
      ...userFields,
      avatar: URL.createObjectURL(e.target.files[0]),
    });

    if (isButtonDisabled) {
      setIsButtonDisabled(false);
    }
  };

  const deleteAvatarHandler = async () => {
    try {
      await axios.get('http://localhost:8000/api/deleteavatar/', {
        withCredentials: true,
      });
      //RESET AVATAR PICTURE FILE UPLOAD
      avatar.value = null;
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const profileSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    if (avatar.files.length === 0) {
      formData.delete('avatar');
    }
    const data = Object.fromEntries(formData);

    try {
      await axios.patch(
        'http://localhost:8000/api/updateuser/',
        {
          ...data,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': session,
          },
        }
      );

      setNotification({ result: 'Success', message: 'Profile updated.' });
    } catch (error) {
      console.log(error);
      setNotification({ result: 'Failed', message: 'Something went wrong.' });
    }

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
              value={userFields.location}
              onChange={inputChangeHandler}
            />
          </div>
          <div className='profile-form-input'>
            <label htmlFor='avatar'>Avatar</label>
            <input
              type='file'
              name='avatar'
              id='avatar'
              accept='image/png, image/jpeg'
              onChange={changeAvatarHandler}
            />
            <div className='delete-avatar'>
              <button type='button' onClick={deleteAvatarHandler}>
                Delete Avatar
              </button>
            </div>
          </div>
          <div className='submit-form'>
            <button type='submit' disabled={isButtonDisabled}>
              Update Profile
            </button>
          </div>
        </form>
      </div>
      {notification.message && <Notification />}
    </section>
  );
};

export default Profile;
