// frontend/src/features/search/Search.jsx

// Search not functional yet 

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, clearSearchTerm } from './searchSlice';

const Search = () => {
  const searchTerm = useSelector(state => state.search);
  const dispatch = useDispatch();

  const onSearchTermChangeHandler = (event) => {
    const newSearchTerm = event.target.value;
    dispatch(setSearchTerm(newSearchTerm));
  };

  const clearSearchTermHandler = () => {
    dispatch(clearSearchTerm());
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={onSearchTermChangeHandler}
      />
      {searchTerm.length > 0 && (
        <button onClick={clearSearchTermHandler}>Clear</button>
      )}
    </div>
  );
};

export default Search;
