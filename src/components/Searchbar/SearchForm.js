import React, { useState, useCallback } from 'react';
import style from './Searchbar.module.css';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = useCallback(e => {
    setQuery(e.currentTarget.value);
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onSubmit(query);
      setQuery('');
    },
    [query, onSubmit],
  );

  return (
    <form className={style.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={style.button}>
        <span className={style.label}>Search</span>
      </button>
      <input
        className={style.input}
        type="text"
        placeholder="Search images and photos"
        onChange={handleChange}
      />
    </form>
  );
}
