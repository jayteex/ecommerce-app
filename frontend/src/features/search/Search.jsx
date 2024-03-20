// frontend/src/features/search/Search.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, clearSearchTerm } from './searchSlice';
import "./Search.css";

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
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={onSearchTermChangeHandler}
      />
      {searchTerm.length > 0 && (
        <button className="search-button" onClick={clearSearchTermHandler}>Clear</button>
      )}
    </div>
  );
};

export default Search;

