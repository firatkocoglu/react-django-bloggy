import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';
import axios from 'axios';
import Modal from './Modal';
import Notification from './Notification';

const YourBlogs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSettings, setModalSettings] = useState({
    modalMessage: '',
    modalButtonAction: '',
  });

  const [modalAction, setModalAction] = useState(() => {});

  const {
    session,
    drafts,
    published,
    fetchUser,
    navigation,
    setDrafts,
    setPublished,
    notification,
    setNotification,
  } = useContext(GlobalContext);

  useEffect(() => {
    fetchUser();
    fetchDrafts();
    fetchAllBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [isModalOpen]);

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
    try {
      await axios.delete(`http://localhost:8000/api/drafts/${id}/`, {
        withCredentials: true,
        headers: { 'X-CSRFToken': session },
      });

      fetchDrafts();
      setModalAction(() => {});
      setIsModalOpen(false);
      setNotification({ result: 'Success', message: 'Draft deleted.' });
    } catch (error) {
      setNotification({ result: 'Failed', message: 'Something went wrong.' });
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/blogs/${id}/`, {
        withCredentials: true,
        headers: { 'X-CSRFToken': session },
      });

      fetchAllBlogs();
      setModalAction(() => {});
      setIsModalOpen(false);
      setNotification({ result: 'Success', message: 'Blog deleted.' });
    } catch (error) {
      setNotification({ result: 'Failed', message: 'Something went wrong.' });
      console.log(error);
    }
  };

  return (
    <section className='your-blogs-section'>
      {isModalOpen && (
        <Modal
          closeModal={setIsModalOpen}
          modalSettings={modalSettings}
          modalAction={modalAction}
        />
      )}
      <div className='container'>
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
                        <div className='draft-published-delete'>
                          <button
                            type='button'
                            onClick={() => {
                              setModalSettings({
                                modalMessage: `Draft named ${draft.title} will be deleted.`,
                                modalButtonAction: 'Delete',
                              });
                              setModalAction(() => () => {
                                deleteDraft(draft.id);
                              });
                              setIsModalOpen(true);
                            }}
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
                    <li key={blog.id}>
                      <div className='published-item'>
                        <div onClick={() => navigation(`/blogs/${blog.id}`)}>
                          <h3>{blog.title}</h3>
                        </div>
                        <div className='draft-published-delete'>
                          <button
                            type='button'
                            onClick={() => {
                              setModalSettings({
                                modalMessage: `Blog named ${blog.title} will be deleted.`,
                                modalButtonAction: 'Delete',
                              });
                              setModalAction(() => () => {
                                deleteBlog(blog.id);
                              });
                              setIsModalOpen(true);
                            }}
                          >
                            Delete Blog
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
      </div>
      {notification.message && <Notification />}
    </section>
  );
};

//PAGINATED BLOGS ARE ALREADY FETCHED IN CONTEXT API.

export default YourBlogs;
