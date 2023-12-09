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

  if (action.type === SET_CATEGORIES) {
    return {
      ...state,
      categories: [...action.payload],
    };
  }

  if (action.type === SET_BLOGS) {
    return {
      ...state,
      blogs: [...action.payload],
    };
  }

  if (action.type === SET_SAVED_BLOGS) {
    return {
      ...state,
      savedBlogs: [...action.payload],
    };
  }

  if (action.type === SET_HAS_MORE) {
    return {
      ...state,
      hasMore: action.payload,
    };
  }

  if (action.type === SET_NEXT_PAGE) {
    return {
      ...state,
      nextPage: action.payload,
    };
  }

  if (action.type === SET_SEARCH_RESULTS) {
    return {
      ...state,
      searchResults: [...action.payload],
    };
  }

  if (action.type === SET_DRAFTS) {
    return {
      ...state,
      drafts: [...action.payload],
    };
  }

  if (action.type === SET_PUBLISHED) {
    return {
      ...state,
      published: [...action.payload],
    };
  }

  if (action.type === SET_NOTIFICATION) {
    console.log(action.payload);
    return {
      ...state,
      notification: { ...action.payload },
    };
  }
};
