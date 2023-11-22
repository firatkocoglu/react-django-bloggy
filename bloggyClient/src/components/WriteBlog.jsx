import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/Context';
import { useLocation } from 'react-router-dom';

const WriteBlog = () => {
  const [categories, setCategories] = useState([]);

  const { session, user, navigation } = useContext(GlobalContext);

  const { state } = useLocation();

  const [fields, setFields] = useState({
    title: state?.draft[0].title ? state.draft[0].title : '',
    content: state?.draft[0].content ? state.draft[0].content : '',
    category_id: state?.draft[0]?.category?.id
      ? state.draft[0].category.id
      : '',
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

  const saveDraftHandler = async () => {
    const response = await axios.post(
      'http://localhost:8000/api/drafts/',
      {
        user_id: user.id,
        title: title,
        content: content,
        category_id: category_id || 6, //6 is the id of React Category. If user does not provide
        //an ID then the default value would be 6
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': session,
        },
      }
    );
    navigation('/home');
    console.log(response);
  };

  return (
    <section className='write-section'>
      <div className='writeIn-header'>
        <h1>Write a blog</h1>
      </div>
      <div className='blog-form'>
        <form>
          <div className='form-input'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Title of your blog'
              onChange={handleFieldChanges}
              value={title}
              required
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
            <button type='submit' onClick={blogSubmitHandler}>
              Post Blog
            </button>
            <button type='button' onClick={saveDraftHandler}>
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default WriteBlog;
