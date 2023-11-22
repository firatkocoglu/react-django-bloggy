import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';
import axios from 'axios';

const YourBlogs = () => {
  const {
    session,
    drafts,
    published,
    fetchUser,
    navigation,
    setDrafts,
    setPublished,
  } = useContext(GlobalContext);

  useEffect(() => {
    fetchUser();
    fetchDrafts();
    fetchAllBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDrafts = async () => {
    const response = await axios.get('http://localhost:8000/api/drafts/', {
      withCredentials: true,
      headers: {
        'X-CSRFToken': session,
      },
    });

    setDrafts(response.data);
  };

  const fetchAllBlogs = async () => {
    const response = await axios.get(
      'http://localhost:8000/api/blogs/?by_user&no_page',
      {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      }
    );

    setPublished(response.data);
  };

  const draftClickHandler = (id) => {
    const draft = drafts.filter((draft) => draft.id === id);
    if (draft)
      navigation(`/writeIn/${draft[0].id}`, { state: { draft: draft } });
  };

  const deleteDraft = async (id) => {
    const response = await axios.delete(
      `http://localhost:8000/api/drafts/${id}/`,
      { withCredentials: true, headers: { 'X-CSRFToken': session } }
    );

    fetchDrafts();
  };

  return (
    <section className='your-blogs-section'>
      <div className='drafts'>
        <div className='drafts-header'>
          <h1>Drafts</h1>
        </div>
        <div className='drafts-list'>
          {drafts.length === 0 ? (
            <div>You have no drafts yet.</div>
          ) : (
            <ul>
              {drafts.map((draft) => {
                return (
                  <li key={draft.id}>
                    <div className='draft-item'>
                      <div
                        className='draft-title'
                        onClick={() => draftClickHandler(draft.id)}
                      >
                        <h3>{draft.title}</h3>
                      </div>
                      <div className='draft-delete'>
                        <button
                          type='button'
                          onClick={() => deleteDraft(draft.id)}
                        >
                          Delete Draft
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className='published'>
        <div className='published-header'>
          <h1>Published</h1>
        </div>
        <div className='published-list'>
          {published.length === 0 ? (
            <div>You have no published blog.</div>
          ) : (
            <ul>
              {published.map((blog) => {
                return (
                  <li
                    key={blog.id}
                    onClick={() => navigation(`/blogs/${blog.id}`)}
                  >
                    <h3>{blog.title}</h3>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

//PAGINATED BLOGS ARE ALREADY FETCHED IN CONTEXT API.

export default YourBlogs;
