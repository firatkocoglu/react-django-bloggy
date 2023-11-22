/* eslint react/prop-types: 0 */

import { useState, useContext } from 'react';
import { GlobalContext } from '../context/Context';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { GrDocumentText } from 'react-icons/gr';

export default function Search() {
  const [searchText, setSearchText] = useState('');

  const {
    searchResults,
    setSearchResults,
    hasMore,
    setHasMore,
    fetchBlogs,
    navigation,
  } = useContext(GlobalContext);

  const changeSearchText = (e) => {
    setSearchText(e.target.value);
    if (searchResults.length > 0) setSearchResults([]);
    if (!hasMore) setHasMore(true);
  };

  const submitSearchHandler = async (e) => {
    e.preventDefault();

    try {
      window.localStorage.setItem('searchQuery', searchText);
      fetchBlogs(`http://localhost:8000/api/blogs/?search=${searchText}`);
      navigation(`/search`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitSearchHandler}>
      <div className='search-categories'>
        <div className='search'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search &#128270;'
            value={searchText}
            onChange={changeSearchText}
          />
        </div>
        <div className='search-bar-buttons'>
          <button type='button' onClick={() => navigation('/your-blogs')}>
            <GrDocumentText />
            <span>Your blogs</span>
          </button>
          <button type='button' onClick={() => navigation('/writeIn')}>
            <HiMiniPencilSquare />
            <span>Write a blog</span>
          </button>
        </div>
      </div>
    </form>
  );
}
