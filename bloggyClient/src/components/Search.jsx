/* eslint react/prop-types: 0 */

import { useState, useContext } from 'react';
import { GlobalContext } from '../context/Context';
import { TfiWrite } from 'react-icons/tfi';

export default function Search() {
  const [searchText, setSearchText] = useState('');

  const { fetchBlogs, navigation } = useContext(GlobalContext);

  const changeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const submitSearchHandler = async (e) => {
    e.preventDefault();
    setSearchText('');
    try {
      fetchBlogs(`http://localhost:8000/api/blogs/?search=${searchText}`);
      navigation('/results');
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
          <button type='button' onClick={() => navigation('/writeIn')}>
            <TfiWrite />
            <span>Write a blog</span>
          </button>
        </div>
      </div>
    </form>
  );
}
