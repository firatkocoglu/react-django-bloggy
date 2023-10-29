import { useEffect } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../context/Context';
import axios from 'axios';

const user_url = 'http://localhost:8000/api/getuser/';

const Home = () => {
  const { user, setUser, session } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get(user_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>{user.first_name + ' ' + user.last_name}</div>
      <div>{user.bio}</div>
      <div>{user.location}</div>
    </>
  );
};

export default Home;
