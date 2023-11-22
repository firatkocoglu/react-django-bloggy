/* eslint react/prop-types: 0 */

import { useContext, useEffect } from 'react';
import { BlogCard } from './BlogCard';
import Loading from './Loading';
import { GlobalContext } from '../context/Context';
import InfiniteScroll from 'react-infinite-scroll-component';

const Results = () => {
  const { searchResults, fetchBlogs, hasMore, nextPage } =
    useContext(GlobalContext);

  useEffect(() => {
    console.log(nextPage);

    const searchQuery = window.localStorage.getItem('searchQuery');
    fetchBlogs(`http://localhost:8000/api/blogs/?search=${searchQuery}`);

    //FETCH BLOGS ONLY IF THERE ARE FOLLOWING PAGES
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='results-section'>
      <div className='results-header'>
        <h1>Search Results</h1>
      </div>
      <div className='results'>
        <InfiniteScroll
          dataLength={searchResults.length}
          next={() => fetchBlogs(nextPage)}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={
            <p
              style={{
                textAlign: 'center',
                fontSize: '1.1rem',
              }}
            >
              You&apos;ve seen all the results.
            </p>
          }
        >
          {searchResults.map((result) => {
            const { id, user, category, title, content, date } = result;
            return (
              <BlogCard
                key={id}
                id={id}
                title={title}
                content={content}
                user={user}
                category={category}
                date={date}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default Results;
