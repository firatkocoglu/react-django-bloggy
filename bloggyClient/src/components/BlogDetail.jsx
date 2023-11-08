import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/Context';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading.jsx';
import Comments from './Comments.jsx';
import default_avatar from '../assets/default_avatar.png';

const BlogDetail = () => {
  const { session, isLoading, setLoading } = useContext(GlobalContext);

  const [blog, setBlog] = useState({
    id: '',
    title: '',
    content: '',
    user: {
      first_name: '',
      last_name: '',
    },
    category: {
      category: '',
    },
    date: '',
  });

  const { blogID } = useParams();

  const blog_url = `http://localhost:8000/api/blogs/${blogID}`;

  useEffect(() => {
    setLoading(true);
    retrieveBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { title, content, user, category, date } = blog;

  const retrieveBlog = () => {
    axios
      .get(blog_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => error);

    setLoading(false);
  };

  return (
    <>
      <section className='blog-detail-section'>
        {isLoading && <Loading />}
        <div className='blog-detail-header'>
          <h1 className='blog-detail-title'>{title}</h1>
          <div className='blog-detail-author'>
            <div className='author-image'>
              <img
                src={default_avatar}
                alt='Web Talk Blog'
                className='avatar'
              />
            </div>
            <div className='info-author'>
              <div className='author-name'>
                <p>
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div className='info'>
                <div>
                  <span>{category.category}</span>
                </div>
                <div>
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
          </div>
        </div>
        <div className='blog-detail-content'>
          <p>{content}</p>
        </div>
      </section>
      <section className='comments-section'>
        <Comments blog_id={blogID} />
      </section>
    </>
  );
};

export default BlogDetail;
