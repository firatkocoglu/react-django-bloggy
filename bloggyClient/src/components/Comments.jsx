/* eslint react/prop-types: 0 */

import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';
import axios from 'axios';
import default_avatar from '../assets/default_avatar.png';

const Comments = ({ blog_id, navigationID }) => {
  const [comments, setComments] = useState([]);

  const { session, user } = useContext(GlobalContext);

  const comment_url = `http://localhost:8000/api/blogs/${blog_id}/comments`;

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

  const deleteComment = (comment_id) => {
    axios
      .delete(
        `http://localhost:8000/api/blogs/${blog_id}/comments/${comment_id}`,
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': session,
          },
        }
      )
      .then((response) => setComments(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setComments, navigationID]);

  if (comments.length === 0)
    return (
      <div
        style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}
      >
        Write the first comment on this blog!
      </div>
    );

  return comments.map((comment) => {
    const { id, user: author, comment: text, date } = comment;

    return (
      <div key={id} className='comment'>
        <div className='comment-info-container'>
          <div className='author-image'>
            <img src={default_avatar} alt='Web Talk Blog' className='avatar' />
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
  });
};

export default Comments;
