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
  SET_LOADING,
  SET_SAVED_BLOGS,
  SET_HAS_MORE,
  SET_NEXT_PAGE,
} from './actions';
import Cookie from 'universal-cookie';
import axios from 'axios';

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
  isLoading: false,
  savedBlogs: [],
  hasMore: true,
  nextPage: 'http://localhost:8000/api/blogs?page=1',
};

export const GlobalContext = createContext(defaultState);

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, defaultState);

  useEffect(() => {
    //SET USER GLOBALLY (ONLY IF A SESSION INITIALIZED)
    if (state.session) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.session]); //FETCH NEW USER STATE IF SESSION CHANGES

  const setSession = (session) => {
    dispatch({
      type: SET_SESSION,
      payload: { session },
    });
    console.log('Session set.');
  };

  const fetchUser = () => {
    axios
      .get('http://localhost:8000/api/getuser/', {
        withCredentials: true,
        headers: {
          'X-CSRFToken': state.session,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
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

  //SET CATEGORIES
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

  const setLoading = (data) => {
    dispatch({
      type: SET_LOADING,
      payload: data,
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

  const fetchSavedBlogs = () => {
    axios
      .get('http://localhost:8000/api/savedblogs', {
        withCredentials: true,
        headers: {
          'X-CSRFToken': state.session,
        },
      })
      .then((response) => setSavedBlogs(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <GlobalContext.Provider
      value={{
        session: state.session,
        setSession,
        changeInput,
        credentials_error: state.credentials_error,
        setCredentialsError,
        emptyCredentialsError,
        user: state.user,
        setUser,
        fetchUser,
        categories: state.categories,
        setCategories,
        blogs: state.blogs,
        setBlogs,
        isLoading: state.isLoading,
        setLoading,
        savedBlogs: state.savedBlogs,
        setSavedBlogs,
        fetchSavedBlogs,
        hasMore: state.hasMore,
        setHasMore,
        nextPage: state.nextPage,
        setNextPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
