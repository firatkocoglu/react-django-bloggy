import {
  SET_SESSION,
  SET_CREDENTIALS_ERROR,
  EMPTY_CREDENTIALS_ERROR,
  SET_USER,
} from './actions';

export const GlobalReducer = (state, action) => {
  if (action.type === SET_SESSION) {
    return {
      ...state,
      session: action.payload.session,
    };
  }

  if (action.type === SET_CREDENTIALS_ERROR) {
    const { error } = action.payload;
    if (typeof error === 'string') {
      return {
        ...state,
        credentials_error: [...state.credentials_error, error],
      };
    }
    if (typeof error === 'object') {
      const error_keys = Object.keys(error).map((key) => {
        return key;
      });

      const error_list = error_keys.map((key) => {
        return error[key].map((err) => {
          return err;
        });
      });

      const error_state = {
        session: state.session,
        credentials_error: error_list[0],
      };

      return error_state;
    }
  }

  if (action.type === EMPTY_CREDENTIALS_ERROR) {
    return {
      ...state,
      credentials_error: [],
    };
  }

  if (action.type === SET_USER) {
    return {
      ...state,
      user: { ...action.payload.user },
    };
  }
};
