import { Editor } from './Editor';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/Context';
import { useLocation } from 'react-router-dom';
import Notification from './Notification';
import Preview from './Preview';

const WriteBlog = () => {
  const [categories, setCategories] = useState([]);

  const { session, user, navigation, notification, setNotification } =
    useContext(GlobalContext);

  //USE DRAFT STATE TO OBTAIN DRAFT DATA ON INPUT FORM
  const { state } = useLocation();

  const [fields, setFields] = useState({
    title: state?.draft[0].title ? state.draft[0].title : '',
    content: state?.draft[0].content ? state.draft[0].content : '',
    category_id: state?.draft[0]?.category?.id
      ? state.draft[0].category.id
      : '',
  });

  const { title, content, category_id } = fields;

  const handleFieldChanges = (e) => {
    if (e.target.id === 'content') {
      setFields({ ...fields, content: e.target.innerText });
    } else {
      setFields({ ...fields, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    console.log(content);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/blogs/',
        {
          user_id: user.id,
          title: title,
          content: content,
          category_id: category_id || 6,
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
      setNotification({ result: 'Success', message: 'Blog published.' });
    } catch (error) {
      console.log(error);
      setNotification({ result: 'Failed', message: 'Something went wrong.' });
    }
  };

  const blogSubmitHandler = (e) => {
    e.preventDefault();
    postBlog();
  };

  const saveDraftHandler = async () => {
    console.log(content);
    try {
      await axios.post(
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

      setNotification({
        result: 'Success',
        message: 'Draft saved.',
      });
      navigation('/home');
    } catch (error) {
      setNotification({ result: 'Failed', message: 'Something went wrong.' });
      console.log(error);
    }
  };

  return (
    <section className='write-section'>
      <section className='editor-section'>
        <div className='writeIn-header'>
          <h1>Write an article</h1>
        </div>
        <div className='blog-form'>
          <form>
            <div className='form-input'>
              <label htmlFor='title'>
                <strong>Title</strong>
              </label>
              <input
                type='text'
                name='title'
                id='title'
                placeholder='Provide a descriptive title'
                onChange={handleFieldChanges}
                value={title}
                required
              />
            </div>
            <div className='form-input'>
              <label htmlFor='content'>
                <strong>Content</strong>
              </label>
              <Editor
                fields={fields}
                handleFieldChanges={handleFieldChanges}
              />
            </div>
            <div className='form-input'>
              <label htmlFor='category_id'>
                <strong>Category</strong>
              </label>
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
              <button type='button' onClick={saveDraftHandler}>
                Save Draft
              </button>
              <button type='submit' onClick={blogSubmitHandler}>
                Post Blog
              </button>
            </div>
          </form>
        </div>
      </section>
      <Preview fields={fields} />
      {notification.message && <Notification />}
    </section>
  );
};

export default WriteBlog;
