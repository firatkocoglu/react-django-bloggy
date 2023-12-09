import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';
import { BlogCard } from './BlogCard';

const AllSavedBlogs = () => {
  const { savedBlogs, fetchSavedBlogs } = useContext(GlobalContext);

  useEffect(() => {
    fetchSavedBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='all-saved-blogs-section'>
      <div className='saved-blogs-title'>
        <h1>All Saved Blogs</h1>
      </div>
      <div className='all-saved-blogs'>
        {savedBlogs.length === 0 ? (
          <div>You have no saved blogs yet.</div>
        ) : (
          savedBlogs.map((blog) => {
            return (
              <BlogCard
                key={blog.blog.id}
                id={blog.blog.id}
                title={blog.blog.title}
                content={blog.blog.content}
                date={blog.blog.date}
                user={blog.blog.user}
                category={blog.blog.category}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default AllSavedBlogs;
