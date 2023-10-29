import { useContext } from 'react';
import logo from '../assets/web-talks-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/Context';
import axios from 'axios';
import Cookies from 'universal-cookie';

const logout_url = 'http://localhost:8000/api/logout/';

const Navbar = () => {
  const { session, setSession, user } = useContext(GlobalContext);

  const navigation = useNavigate();

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
        cookies.remove('csrftoken');
        setSession('');
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
          to='/'
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
            <p>
              Welcome,{' '}
              <a href=''>{user.first_name ? user.first_name : user.username}</a>
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
