import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/Context';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading.jsx';
import Comments from './Comments.jsx';
import RelatedBlog from './RelatedBlog.jsx';
import Markdown from 'react-markdown';

const BlogDetail = () => {
  const { session } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  const [blog, setBlog] = useState({
    id: '',
    title: '',
    content: '',
    user: {
      first_name: '',
      last_name: '',
    },
    category: {
      id: '',
      category: '',
    },
    date: '',
  });

  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const [navigationID, setNavigationID] = useState('');

  const { blogID } = useParams();

  const blog_url = `http://localhost:8000/api/blogs/${blogID}`;

  const { title, content, user, category, date } = blog;

  useEffect(() => {
    retrieveBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigationID]);

  useEffect(() => {
    fetchRelatedBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const retrieveBlog = async () => {
    try {
      const response = await axios.get(blog_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      });
      setBlog(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRelatedBlogs = () => {
    axios
      .get(`http://localhost:8000/api/blogs?category__id=${category.id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        const filteredBlogs = response.data.results.filter(
          (blog) => blog.id !== parseInt(blogID)
        );
        setRelatedBlogs([...filteredBlogs]);
      })
      .catch((error) => {
        console.log(error);
      });
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
                src={`http://127.0.0.1:8000${user.avatar}`}
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
          <Markdown>{content}</Markdown>
        </div>
      </section>
      <section className='comments-section'>
        {isLoading && <Loading />}
        <Comments blog_id={blogID} navigationID={navigationID} />
      </section>
      <section className='related-blogs-section'>
        <h1>You might also be interested in</h1>
        <div className='related-blogs'>
          {isLoading && <Loading />}
          {relatedBlogs.map((blog) => {
            return (
              <RelatedBlog
                blog={blog}
                key={blog.id}
                setNavigationID={setNavigationID}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
