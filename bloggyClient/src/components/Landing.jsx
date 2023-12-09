import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/Context';

const Landing = () => {
  const { session, navigation } = useContext(GlobalContext);

  useEffect(() => {
    if (session) {
      return navigation('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className='landing-section'>
        <div className='landing-info'>
          <div className='landing-title'>
            <h1>Talk web.</h1>
          </div>
          <div className='landing-paragraph'>
            <p>
              <span>
                Discover the best ideas and approaches about web development.
              </span>
            </p>
          </div>
          <Link to='/sign-in'>
            <a href=''>Start talking</a>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Landing;
