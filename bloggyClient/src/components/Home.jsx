import { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/Context';
import Search from './Search';
import Blogs from './Blogs';
import Visits from './Visits';
import SavedBlogs from './SavedBlogs';

const Home = () => {
  const { session, navigation } = useContext(GlobalContext);

  useEffect(() => {
    //IF THERE IS NO VALID TOKEN RETURN TO LANDING PAGE
    if (!session) {
      return navigation('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Search />
      <div className='home-main'>
        <div className='home-left'>
          <Blogs />{' '}
        </div>
        <div className='home-right'>
          <Visits />
          <SavedBlogs />
        </div>
      </div>
    </>
  );
};

export default Home;
