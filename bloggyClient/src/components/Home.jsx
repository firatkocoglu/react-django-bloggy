import { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/Context';
import Blogs from './Blogs';
import Visits from './Visits';
import SavedBlogs from './SavedBlogs';
import Notification from './Notification';

const Home = () => {
  const { session, navigation, notification } = useContext(GlobalContext);

  useEffect(() => {
    //IF THERE IS NO VALID TOKEN RETURN TO LANDING PAGE
    if (!session) {
      return navigation('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className='home-main'>
        <div className='home-left'>
          <Blogs />{' '}
        </div>
        <div className='home-right'>
          <Visits />
          <SavedBlogs />
        </div>
        {notification.message && <Notification />}
      </section>
    </>
  );
};

export default Home;
