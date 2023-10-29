// import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { GlobalContext } from '../context/Context';

const Landing = () => {
  // const { session } = useContext(GlobalContext);
  return (
    <>
      <section className='landing-section'>
        <div className='landing-info'>
          <div className='landing-title'>
            <h1>Talk web.</h1>
          </div>
          <div className='landing-paragraph'>
            <p>
              Discover web world. Discuss new ways to improve web. Talk web.
            </p>
          </div>
          <Link to='/sign-in'>
            <a href=''>Start talking</a>
          </Link>
        </div>
      </section>
      <section className='topics-section'>
        <div className='topics-header'>
          <h3>Talk about what you are interested in most.</h3>
        </div>
        <div className='topics'></div>
      </section>
    </>
  );
};

export default Landing;
