/* eslint react/prop-types: 0 */

import { useContext } from 'react';
import { BsBookmarkPlus, BsFillBookmarkDashFill } from 'react-icons/bs';
import { GlobalContext } from '../context/Context';

const RelatedBlog = ({ blog, setNavigationID }) => {
  const { saveBlog, savedBlogs, deleteBlog, navigation } =
    useContext(GlobalContext);

  const isBlogSaved = savedBlogs.filter(
    (savedBlog) => savedBlog.blog.id === blog.id
  );

  const { id, title, content, user, date } = blog;

  const blogNavigationHandler = (id) => {
    setNavigationID(id);
    navigation(`/blogs/${id}`);
  };

  return (
    <article className='related-blog'>
      <div className='related-blog-header'>
        <div className='related-blog-title'>
          <h3
            onClick={() => {
              blogNavigationHandler(id);
            }}
          >
            {title}
          </h3>
        </div>
        <div className='related-blog-info'>
          <div className='related-blog-author'>
            <span>
              {user.first_name} {user.last_name}
            </span>
            <span>
              {new Date(date).toLocaleString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
              })}
            </span>
          </div>
          <div className='blog-save'>
            {isBlogSaved.length > 0 ? (
              <button
                type='button'
                onClick={() => deleteBlog(isBlogSaved[0].id)}
              >
                <BsFillBookmarkDashFill />
              </button>
            ) : (
              <button
                type='button'
                onClick={() => {
                  saveBlog(id);
                }}
              >
                <BsBookmarkPlus />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='related-blog-content'>
        <p onClick={() => blogNavigationHandler(id)}>
          {content.substring(0, 100)}...
        </p>
      </div>
    </article>
  );
};

export default RelatedBlog;
