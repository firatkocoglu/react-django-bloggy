/* eslint react/prop-types: 0 */

import { useContext } from 'react';
import { GlobalContext } from '../context/Context';

const RelatedBlog = ({ blog, setNavigationID }) => {
  const { navigation } = useContext(GlobalContext);

  const { id, title, user, date } = blog;

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
          </div>
          <div className='related-blog-date'>
            <span>
              {new Date(date).toLocaleString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RelatedBlog;
