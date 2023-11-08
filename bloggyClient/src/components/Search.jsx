/* eslint react/prop-types: 0 */

import { useContext, useState, useEffect } from 'react';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';
import { GlobalContext } from '../context/Context';
import Category from './Category';
import axios from 'axios';

export default function Search() {
  const { session, categories, setCategories } = useContext(GlobalContext);

  const [categoryPage, setCategoryPage] = useState(1);
  const [isFinalCategoryPage, setIsFinalCategoryPage] = useState(false);

  const fetchCategories = (page) => {
    const categories_url = `http://localhost:8000/api/categories?page=${page}`;

    axios
      .get(categories_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        setCategories(response.data.results);
        if (!response.data.next) {
          setIsFinalCategoryPage(true);
        } else {
          setIsFinalCategoryPage(false);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchCategories(categoryPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryPage]);

  const handleCategoryPage = (e) => {
    if (e.currentTarget.name === 'increase') {
      setCategoryPage((curr) => curr + 1);
    }

    if (e.currentTarget.name === 'decrease') {
      setCategoryPage((curr) => curr - 1);
    }
  };

  return (
    <>
      <div className='search-categories'>
        <div className='search'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search &#128270;'
          />
        </div>
        <div className='categories'>
          <ul className='category-list'>
            <button
              type='button'
              name='decrease'
              className='category-arrow'
              disabled={categoryPage === 1}
              onClick={handleCategoryPage}
            >
              <ImArrowLeft2 />
            </button>
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <Category category={category.category} />
                </li>
              );
            })}
            <button
              type='button'
              name='increase'
              className='category-arrow'
              onClick={handleCategoryPage}
              disabled={isFinalCategoryPage}
            >
              <ImArrowRight2 />
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}
