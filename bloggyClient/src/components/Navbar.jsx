import { useContext } from 'react';
import logo from '../assets/web-talks-logo.png';
import default_avatar from '../assets/default_avatar.png';

import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/Context';
import axios from 'axios';
import Cookies from 'universal-cookie';

const logout_url = 'http://localhost:8000/api/logout/';

const Navbar = () => {
  const { session, setSession, user, setUser, setFilteredBlogs, navigation } =
    useContext(GlobalContext);

  const brand_navigation = session ? '/home' : '/';

  const logout = () => {
    axios
      .get(logout_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        console.log(response);
        let cookies = new Cookies();
        //RESET ALL CREDENTIALS AND USER STATE
        cookies.remove('csrftoken');
        setSession('');
        setUser({
          id: '',
          email: '',
          username: '',
          first_name: '',
          last_name: '',
          bio: '',
          location: '',
          avatar: '',
        });
        navigation('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav>
      <div className='nav-brand'>
        <Link
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'None',
            color: 'black',
          }}
          to={brand_navigation}
          onClick={() => {
            setFilteredBlogs([]);
          }}
        >
          <img src={logo} alt='web-talks-logo' className='logo' />
          <h3 className='nav-brand-header'>Web Talks</h3>
        </Link>
      </div>
      <ul className='nav-links'>
        {session === '' ? (
          <>
            <li>
              <Link to='/sign-in'>Sign In</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        ) : (
          <>
            <p className='profile'>
              <img
                src={default_avatar}
                alt='web-talk-avatar'
                className='avatar'
              />
              <Link to='/profile'>
                {user.first_name ? user.first_name : user.username}
              </Link>
            </p>
            <li>
              <Link to='/sign-out' onClick={logout}>
                Sign Out
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
