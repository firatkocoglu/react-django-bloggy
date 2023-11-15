import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const SavedBlogs = () => {
  const { savedBlogs, fetchSavedBlogs } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSavedBlogs(setIsLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='saved-blogs-section'>
      <div className='saved-blogs-header'>
        <h1 className='saved-blogs-title'>Saved Blogs</h1>
      </div>
      <div className='saved-blogs'>
        {isLoading && <Loading />}
        <ul className='saved-blogs-list'>
          {savedBlogs.map((blog) => {
            return (
              <li key={blog.id}>
                <Link>{blog.blog.title}</Link>
              </li>
            );
          })}
        </ul>
        <div className='all-saved-blogs'>
          <a href='#'>See all saved blogs</a>
        </div>
      </div>
    </div>
  );
};

export default SavedBlogs;
