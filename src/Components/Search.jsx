import React, { useState, useEffect } from 'react';

const Search = ({ query, onChange }) => {
  const [selectQuery, setSelectQuery] = useState(query);
  const [timer, setTimer] = useState();
  useEffect(() => {
    function cleanup() {
      clearTimeout(timer);
    }
    cleanup();
    setTimer(
      setTimeout(() => {
        onChange(selectQuery);
      }, 400)
    );
    return cleanup;
  }, [selectQuery]);

  return (
    <>
      <div className='search-bar'>
        <input
          onChange={(e) => {
            setSelectQuery(e.target.value);
          }}
          value={selectQuery}
        />
      </div>
    </>
  );
};

export default Search;
