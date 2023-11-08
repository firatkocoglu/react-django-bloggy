/* eslint react/prop-types: 0 */

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsBookmarkPlus, BsFillBookmarkDashFill } from 'react-icons/bs';
import default_avatar from '../assets/default_avatar.png';
import { useContext } from 'react';
import { GlobalContext } from '../context/Context';

export function BlogCard({ id, title, content, user, category, date }) {
  const saveBlog_url = 'http://localhost:8000/api/savedblogs';

  const navigation = useNavigate();

  const { session, fetchSavedBlogs, savedBlogs } = useContext(GlobalContext);

  const blogClickHandler = (id) => {
    navigation(`/blogs/${id}`);
  };

  const isBlogSaved = savedBlogs.filter((blog) => blog.blog.id === id);

  const saveBlog = () => {
    axios
      .post(
        saveBlog_url,
        {
          blog_id: id,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': session,
          },
        }
      )
      .then((response) => {
        fetchSavedBlogs();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:8000/api/savedblogs/${id}`, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        fetchSavedBlogs();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <button onClick={saveBlog}>
              <BsBookmarkPlus />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
