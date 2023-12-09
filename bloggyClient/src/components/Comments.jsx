/* eslint react/prop-types: 0 */

import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';
import axios from 'axios';

const Comments = ({ blog_id, navigationID }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const { session, user } = useContext(GlobalContext);

  const comment_url = `http://localhost:8000/api/blogs/${blog_id}/comments`;

  const handleWriteComment = (e) => {
    setComment(e.target.value);
  };

  const fetchComments = () => {
    axios
      .get(comment_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.log(error));
  };

  const postComment = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/blogs/${blog_id}/comments/`,
        {
          comment: comment,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': session,
          },
        }
      );
      fetchComments();
    } catch (error) {
      console.log(error);
    }
    setComment('');
  };

  const deleteComment = async (comment_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/blogs/${blog_id}/comments/${comment_id}`,
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': session,
          },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    postComment();
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setComments, navigationID]);

  return (
    <>
      <form className='write-comment-form' onSubmit={commentSubmitHandler}>
        <div className='write-comment'>
          <label htmlFor='comment'>Write Comment</label>
          <textarea
            name='comment'
            id='comment'
            cols='75'
            rows='10'
            className='comment-tarea'
            value={comment}
            onChange={handleWriteComment}
          ></textarea>
          <div className='submit-form'>
            <button type='submit' className=''>
              Post Comment
            </button>
          </div>
        </div>
      </form>

      <div className='comments-title'>
        <h1>Comments</h1>
      </div>

      {comments.length === 0 && (
        <div
          style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}
        >
          Write the first comment on this blog!
        </div>
      )}

      {comments.map((comment) => {
        const { id, user: author, comment: text, date } = comment;
        return (
          <div key={id} className='comment'>
            <div className='comment-info-container'>
              <div className='author-image'>
                <img
                  src={`http://127.0.0.1:8000${author.avatar}`}
                  alt='Web Talk Blog'
                  className='avatar'
                />
              </div>
              <div className='comment-detail'>
                <div className='comment-author'>
                  {author.first_name} {author.last_name}
                </div>
                <div className='comment-date'>
                  <span>
                    {new Date(date).toLocaleString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className='comment-text'>
              <p>{text}</p>
            </div>
            {user.id === author.id && (
              <div className='delete-comment'>
                <button onClick={() => deleteComment(id)}>
                  Delete this comment
                </button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Comments;
