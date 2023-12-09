import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const Visits = () => {
  const visits_url = 'http://localhost:8000/api/visits';

  const { session, setNotification } = useContext(GlobalContext);

  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) fetchVisits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchVisits = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(visits_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      });
      setVisits(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clearHistory = async () => {
    try {
      const response = await axios.delete(visits_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      });
      if (response.status === 200) {
        setVisits([]);
        setNotification({
          result: 'Success',
          message: 'History cleared.',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='visits-section'>
      <div className='visits-header'>
        <h1 className='visits-title'>Recently Visited</h1>
      </div>
      <div className='visits'>
        {isLoading && <Loading />}
        <ul className='visits-list'>
          {' '}
          {visits.map((visit) => {
            return (
              <li key={visit.id} className='visit-item'>
                <Link to={`/blogs/${visit.blog.id}`}>{visit.blog.title}</Link>
              </li>
            );
          })}
        </ul>
        <div className='clear-history'>
          <button onClick={clearHistory}>Clear History</button>
        </div>
      </div>
    </section>
  );
};
export default Visits;
