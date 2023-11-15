/* eslint react/prop-types: 0 */

import { BsBookmarkPlus, BsFillBookmarkDashFill } from 'react-icons/bs';
import default_avatar from '../assets/default_avatar.png';
import { useContext } from 'react';
import { GlobalContext } from '../context/Context';

export function BlogCard({ id, title, content, user, category, date }) {
  const { saveBlog, deleteBlog, savedBlogs, navigation } =
    useContext(GlobalContext);

  const blogClickHandler = (id) => {
    navigation(`/blogs/${id}`);
  };

  const isBlogSaved = savedBlogs.filter((blog) => blog.blog.id === id);

  return (
    <article key={id} className='blog'>
      <div className='blog-title'>
        <h1
          className='title'
          onClick={() => {
            blogClickHandler(id);
          }}
        >
          {title}
        </h1>
        <div className='author'>
          <img src={default_avatar} alt='web-talk-avatar' className='avatar' />
          <h4>
            {user.first_name} {user.last_name}
          </h4>
        </div>
      </div>
      <div
        className='blog-content'
        onClick={() => {
          blogClickHandler(id);
        }}
      >
        <p>{content.substring(0, 250)}...</p>
      </div>
      <div className='blog-footer'>
        <div className='blog-info'>
          <h5 className='blog-category'>{category.category}</h5>
          <h5>
            {new Date(date).toLocaleString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            })}
          </h5>
        </div>
        <div className='blog-save'>
          {isBlogSaved.length > 0 ? (
            <button onClick={() => deleteBlog(isBlogSaved[0].id)}>
              <BsFillBookmarkDashFill />
            </button>
          ) : (
            <button onClick={() => saveBlog(id)}>
              <BsBookmarkPlus />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
