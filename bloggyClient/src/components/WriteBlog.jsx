import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/Context';

const WriteBlog = () => {
  const [categories, setCategories] = useState([]);

  const { session, user, navigation } = useContext(GlobalContext);

  const [fields, setFields] = useState({
    title: '',
    content: '',
    category_id: '',
  });

  const { title, content, category_id } = fields;

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFieldChanges = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/categories/',
        {
          withCredentials: true,
          headers: { 'X-CSRFToken': session },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postBlog = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/blogs/',
        {
          user_id: user.id,
          title: title,
          content: content,
          category_id: category_id,
        },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': session,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      navigation('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const blogSubmitHandler = (e) => {
    e.preventDefault();
    postBlog();
  };

  return (
    <section className='write-section'>
      <div className='writeIn-header'>
        <h1>Write a blog</h1>
      </div>
      <div className='blog-form'>
        <form onSubmit={blogSubmitHandler}>
          <div className='form-input'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Title of your blog'
              onChange={handleFieldChanges}
              value={title}
            />
          </div>
          <div className='form-input'>
            <label htmlFor='content'>Content</label>
            <textarea
              name='content'
              id='content'
              cols='75'
              rows='25'
              placeholder='Type your blog here'
              value={content}
              onChange={handleFieldChanges}
            ></textarea>
          </div>
          <div className='form-input'>
            <label htmlFor='category_id'>Category</label>
            <select
              name='category_id'
              id='category_id'
              value={category_id}
              onChange={handleFieldChanges}
            >
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='submit-form'>
            <button type='submit'>Post Blog</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default WriteBlog;
