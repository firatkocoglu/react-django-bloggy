/* eslint-disable react/prop-types */

import { createContext, useEffect, useReducer } from 'react';
import { GlobalReducer } from './reducer';
import {
  SET_SESSION,
  SET_CREDENTIALS_ERROR,
  EMPTY_CREDENTIALS_ERROR,
  SET_USER,
  SET_CATEGORIES,
  SET_BLOGS,
  SET_SAVED_BLOGS,
  SET_HAS_MORE,
  SET_NEXT_PAGE,
  SET_SEARCH_RESULTS,
  SET_DRAFTS,
  SET_PUBLISHED,
  SET_NOTIFICATION,
} from './actions';
import Cookie from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

let csrf_cookie = new Cookie().get('csrftoken'); //ADDING COOKIE TO GLOBAL CONTEXT TO PERSIST CSRF TOKEN DATA

const defaultState = {
  session: csrf_cookie || '', //ADDING COOKIE TO GLOBAL CONTEXT TO PERSIST CSRF TOKEN DATA
  credentials_error: [],
  user: {
    id: '',
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    bio: '',
    location: '',
    avatar: '',
  },
  categories: [],
  blogs: [],
  savedBlogs: [],
  hasMore: true,
  nextPage: `http://localhost:8000/api/blogs?page=1`,
  searchResults: [],
  drafts: [],
  published: [],
  notification: {
    result: '',
    message: '',
  },
};

export const GlobalContext = createContext(defaultState);

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, defaultState);

  const navigation = useNavigate();

  useEffect(() => {
    //SET USER GLOBALLY (ONLY IF A SESSION INITIALIZED)
    if (state.session) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.session]); //FETCH NEW USER STATE IF SESSION CHANGES

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getuser/', {
        withCredentials: true,
        headers: {
          'X-CSRFToken': state.session,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogs = async (url) => {
    //BEFORE FETCHING BLOGS RESET NEXT PAGE
    //THIS MIGHT BE NECESSARY IN ORDER TO FETCH DIFFERENT TYPE OF REQUESTS
    //(DIFFERENT TYPE OF REQUESTS COULD BE ALL THE BLOGS OR ONLY FILTERED BLOGS)
    setNextPage('');
    await axios
      .get(url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': state.session,
        },
      })
      .then((response) => {
        if (url.includes('search')) {
          setSearchResults([...state.searchResults, ...response.data.results]);
        } else {
          setBlogs([...state.blogs, ...response.data.results]);
        }
        setNextPage(response.data.next);

        if (!response.data.next) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSavedBlogs = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/savedblogs/',
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': state.session,
          },
        }
      );
      setSavedBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveBlog = async (id) => {
    try {
      await axios.post(
        'http://localhost:8000/api/savedblogs/',
        {
          blog_id: id,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': state.session,
          },
        }
      );
      setNotification({ result: 'Success', message: 'Blog saved.' });
      fetchSavedBlogs();
    } catch (error) {
      console.log(error);
      setNotification({ result: 'Failed', message: 'Something went wrong.' });
    }
  };

  const deleteSavedBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/savedblogs/${id}/`, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': state.session,
        },
      });
      setNotification({
        result: 'Success',
        message: 'Blog removed from saved blogs.',
      });
      fetchSavedBlogs();
    } catch (error) {
      setNotification({ result: 'Failed', message: 'Something went wrong.' });
      console.log(error);
    }
  };

  //CHANGE INPUT STYLE WHEN CREDENTIALS ARE NOT PROVIDED
  const changeInput = (event, inputIndexArray) => {
    inputIndexArray.forEach((index) => {
      //CHANGE BACKGROUND COLOR OF BOTH INPUTS
      event.target[index].style.backgroundColor = '#FFDFDF';
      event.target[index].style.borderColor = '#CE5A67';

      //CHANGE PLACEHOLDER MESSAGE OF BOTH INPUTS
      event.target[
        index
      ].placeholder = `Provide your ${event.target[index].name}`;
    });
  };

  const setSession = (session) => {
    dispatch({
      type: SET_SESSION,
      payload: { session },
    });
    console.log('Session set.');
  };

  //RETURN USER CREDENTIAL ERRORS
  const setCredentialsError = (error) => {
    dispatch({
      type: SET_CREDENTIALS_ERROR,
      payload: { error },
    });
  };

  const emptyCredentialsError = () => {
    dispatch({
      type: EMPTY_CREDENTIALS_ERROR,
    });
  };
  //RETURN USER CREDENTIAL ERRORS

  //SET USER INFORMATION
  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: { user },
    });
  };

  const setCategories = (categories) => {
    dispatch({
      type: SET_CATEGORIES,
      payload: categories,
    });
  };

  const setBlogs = (blogs) => {
    dispatch({
      type: SET_BLOGS,
      payload: blogs,
    });
  };

  const setSavedBlogs = (data) => {
    dispatch({
      type: SET_SAVED_BLOGS,
      payload: data,
    });
  };

  const setHasMore = (hasMore) => {
    dispatch({
      type: SET_HAS_MORE,
      payload: hasMore,
    });
  };

  const setNextPage = (page) => {
    dispatch({
      type: SET_NEXT_PAGE,
      payload: page,
    });
  };

  const setDrafts = (drafts) => {
    dispatch({
      type: SET_DRAFTS,
      payload: drafts,
    });
  };

  const setSearchResults = (results) => {
    dispatch({
      type: SET_SEARCH_RESULTS,
      payload: results,
    });
  };

  const setPublished = (published) => {
    dispatch({
      type: SET_PUBLISHED,
      payload: published,
    });
  };

  const setNotification = (notification) => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: notification,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        session: state.session,
        setSession,
        navigation,
        changeInput,
        credentials_error: state.credentials_error,
        setCredentialsError,
        emptyCredentialsError,
        user: state.user,
        setUser,
        fetchUser,
        fetchBlogs,
        categories: state.categories,
        setCategories,
        blogs: state.blogs,
        setBlogs,
        savedBlogs: state.savedBlogs,
        setSavedBlogs,
        fetchSavedBlogs,
        saveBlog,
        deleteSavedBlog,
        hasMore: state.hasMore,
        setHasMore,
        nextPage: state.nextPage,
        setNextPage,
        searchResults: state.searchResults,
        setSearchResults,
        drafts: state.drafts,
        published: state.published,
        setDrafts,
        setPublished,
        notification: state.notification,
        setNotification,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
