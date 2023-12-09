import { Link } from 'react-router-dom';
import not_found from '../assets/not_found.jpeg';

const NotFound = () => {
  return (
    <div className='container'>
      <div className='not-found'>
        <div className='not-found-image'>
          <img src={not_found} alt='not found' />
        </div>
        <div>
          <h1>You seem to be lost.</h1>
          <h3>
            You can navigate <Link to='/home'>home</Link>.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
