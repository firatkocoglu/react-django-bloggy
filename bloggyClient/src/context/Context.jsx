import { createContext, useReducer } from 'react';
import { GlobalReducer } from './reducer';
import {
  SET_SESSION,
  SET_CREDENTIALS_ERROR,
  EMPTY_CREDENTIALS_ERROR,
  SET_USER,
} from './actions';
import Cookie from 'universal-cookie';

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
};

export const GlobalContext = createContext(defaultState);

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, defaultState);

  const setSession = (session) => {
    dispatch({
      type: SET_SESSION,
      payload: { session },
    });
    console.log('Session set.');
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
