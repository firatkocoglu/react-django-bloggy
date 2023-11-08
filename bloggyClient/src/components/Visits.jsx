import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/Context';
import { Link } from 'react-router-dom';

const Visits = () => {
  const visits_url = 'http://localhost:8000/api/visits';

  const { session } = useContext(GlobalContext);

  const [visits, setVisits] = useState([]);

  useEffect(() => {
    if (session) fetchVisits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchVisits = () => {
    axios
      .get(visits_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        setVisits(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className='visits-section'>
      <div className='visits-header'>
        <h1 className='visits-title'>Recently Visited</h1>
      </div>
      <div className='visits'>
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
      </div>
    </section>
  );
};
export default Visits;
